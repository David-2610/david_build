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
	metadataBase: new URL("https://your-domain.com"), // optional
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
				{children}
			</body>
		</html>
	);
}
