"use client"
import { logout } from "@/utils/actions";

export default function LogoutButton() {
  return (
    <form action={async () => {
      await logout();
    }}>
      <button className="btn" type="submit">Logout</button>
    </form>
  )
}