import "@/app/globals.css";
import type { Metadata } from "next";
import Navbar from "../Components/Layout/Navbar";
import Footer from "../Components/Layout/Footer";


export const metadata: Metadata = {
  title: "Your Name — Developer",
  description: "Building modern web experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
