import Image from "next/image";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Image src="/wehabu.png"
          alt="logo"
          width={45}
          height={60}
          style={{ objectFit: "fill" }}
        />
        <span className="navbar__logo__text">Wehabu Timecard</span>
      </div>
      <div>
        <LogoutButton />
      </div>
    </div>
  )
}