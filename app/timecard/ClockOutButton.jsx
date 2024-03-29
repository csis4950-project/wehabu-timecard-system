"use client"
import { clockOut } from "@/utils/actions";

export default function ClockOutButton({ currentWorker, handleCheckOut }) {

  return (
    <form action={async (formData) => {
      const workTime = await clockOut(formData);
      handleCheckOut(workTime);
    }}>
      <input type="hidden" name="workTimeId" value={currentWorker ? currentWorker.id : ""} />
      <button className={currentWorker ? "btn" : "btn btn--unclickable"} type="submit">CLOCK OUT</button>
    </form>
  )
}