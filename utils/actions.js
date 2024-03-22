"use server"

import { findUserByEmail, getUserSessionData } from "@/utils/db";
import { fetchHashPassword, toDate, formatTimeToHHMMAString, hasAdminPermission, fetchIsValid } from "@/utils/utils";
import { setSession } from "@/utils/session";
import { redirect } from "next/navigation";

export async function login(formData) {
  const user = await findUserByEmail(formData.get("email"));
  if (user === null) {
    throw new Error("User does not exist or the password provided is incorrect");
  }

  if (!await fetchIsValid(formData.get("password"), user.password)) {
    throw new Error("User does not exist or the password provided is incorrect");
  }

  const userSessionData = await getUserSessionData(user.email);
  await setSession(userSessionData);

  redirect("/timecard", "replace");
}