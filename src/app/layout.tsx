import "./globals.css"; // ✅ REQUIRED
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "David Tembhare | Portfolio",
		template: "%s | David Tembhare",
	},
	description:
		"Portfolio of David Tembhare – Developer, Projects, Blogs, Experience",
	keywords: ["David Tembhare", "Portfolio", "Next.js", "Developer"],
	authors: [{ name: "David Tembhare" }],
	metadataBase: new URL("https://your-domain.com"),
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className="
      min-h-screen
      text-[#333333]
      bg-gradient-to-r
      from-[#2B3A8F]
      via-[#6B3FA0]
      to-[#F27A4B]
    "
			>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
