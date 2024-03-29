"use server"

import { createWorkTimeWithNoEndTime, findUserByEmail, getUserSessionData, updateEndTimeOfWorkTime } from "@/utils/db";
import { hasAdminPermission, fetchIsValid } from "@/utils/utils";
import { deleteSession, setSession } from "@/utils/session";
import { redirect } from "next/navigation";
import { validateClockInButton, validateClockOutButton } from "@/utils/validation";
import { revalidatePath } from "next/cache";

export async function login(formData) {
  const user = await findUserByEmail(formData.get("email"));
  if (user === null) {
    throw new Error("User does not exist or the password provided is incorrect");
  }

  if (!await fetchIsValid(formData.get("password"), user.password)) {
    throw new Error("User does not exist or the password provided is incorrect");
  }

  const userSessionData = await getUserSessionData(user.email);
  if (!hasAdminPermission(userSessionData)) {
    throw new Error("Login failed: This user does not have admin permission");
  }

  await setSession(userSessionData);

  redirect("/timecard", "replace");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}

export async function clockIn(formData) {
  const data = {
    userId: formData.get("userId"),
    departmentId: formData.get("departmentId"),
    startTime: new Date()
  }
  validateClockInButton(data);
  const workTime = await createWorkTimeWithNoEndTime(data);
  revalidatePath("/timecard");
  return workTime;
}

export async function clockOut(formData) {
  const id = formData.get("workTimeId");
  validateClockOutButton(id);
  const workTime = await updateEndTimeOfWorkTime(id);
  revalidatePath("/timecard");
  return workTime;
}