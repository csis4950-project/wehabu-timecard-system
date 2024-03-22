import "./styles/styles.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wehabu | Timecard",
  description: "Timecard System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="wrapper">
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
