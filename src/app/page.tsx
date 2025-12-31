import type { Metadata } from "next";
import Hero from "../components/Landing/hero";
import WhatIWorkOn from "@/components/Landing/What_I_Work_On";
import FeaturedProjects from "@/components/Landing/FeaturedProjects";

export const metadata: Metadata = {
	metadataBase: new URL("https://davidsforge.com"),
	title: "David’s Forge | Lifestyle & Strategy",
	description:
		"David’s Forge – Lifestyle & Strategy. Building ideas, products, and systems for growth.",
	keywords: [
		"David's Forge",
		"Lifestyle",
		"Strategy",
		"Personal Brand",
		"Entrepreneurship",
	],
	openGraph: {
		title: "David’s Forge",
		description: "Lifestyle & Strategy",
		type: "website",
		images: [
			{
				url: "/icons/LOGOS/charcter.png",
				width: 1200,
				height: 630,
				alt: "David's Forge Hero",
			},
		],
	},
};

export default function Page() {
	return (
		<>
			<Hero />
      <WhatIWorkOn />
	  <FeaturedProjects />
      
		</>
	);
}
