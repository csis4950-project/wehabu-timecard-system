import Image from "next/image";
import LoginFrom from "./LoginForm";

export default async function Login() {
  return (
    <div className="login-page">
      <div className="login-img">
        <Image src="/login_img.png"
          alt="login image"
          width={100}
          height={100}
          sizes="100vw"
          style={{
            width: '100%',
            height: '100%',
            objectFit: "cover"
          }}>
        </Image>
      </div>
      <section>
        <div className="login-form">
          <div className="logo-frame">
            <div className="logo">
              <Image src="/wehabu.png"
                alt="logo"
                width={45}
                height={60}
                style={{ objectFit: "fill" }}
              />
              <span>Wehabu Timecard</span>
            </div>
            <div className="message">
              <span >Login into your account</span>
            </div>
          </div>
          <LoginFrom />
        </div>
      </section>
    </div>
  )
}

