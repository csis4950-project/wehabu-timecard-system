"use client"

import { clockIn } from "@/utils/actions";

export default function ClockInButton({ selectedDepartment, worker, handleClockIn }) {

  return (
    <form action={async (formData) => {
      const workTime = await clockIn(formData);
      handleClockIn(workTime);
    }}>
      <input type="hidden" name="departmentId" value={selectedDepartment.id} />
      <input type="hidden" name="userId" value={worker ? worker.id : ""} />
      <button className={worker ? "btn" : "btn btn--unclickable"} type="submit">CLOCK IN</button>
    </form>
  )
}