import "./globals.css"; // ✅ REQUIRED
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { lufga, urbanist } from "../lib/fonts"; // ✅ ADD THIS
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { AdminDataProvider } from "@/contexts/AdminDataContext";

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
		<html lang="en" className={`${urbanist.variable} ${lufga.variable}`}>
			<body className="flex flex-col font-urbanist antialiased">
				<Navbar />
				<AdminDataProvider>
					<AdminAuthProvider>{children}</AdminAuthProvider>
				</AdminDataProvider>
			</body>
		</html>
	);
}
