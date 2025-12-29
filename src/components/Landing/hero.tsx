import Image from "next/image";
import heroImage from "../../../public/icons/LOGOS/charcter.png";

export default function Hero() {
	return (
		<section
			className="
        relative w-full
        bg-[linear-gradient(135deg,#2B41B0_0%,#7E57C2_50%,#FF7C5C_100%)]
        flex items-center justify-center
      "
		>
			<div className="relative  max-w-[1440px] w-full  flex flex-col lg:flex-row  items-center justify-between">
				{/* TEXT */}
				<div
					className="text-white
           
          "
				>
					<h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-wide drop-shadow-lg">
						DAVID&apos;S FORGE
					</h1>
					<p className="mt-3 text-lg sm:text-xl tracking-widest opacity-90 drop-shadow-md">
						LIFESTYLE &amp; STRATEGY
					</p>
				</div>

				{/* IMAGE */}
				<div className="">
					<Image
						src={heroImage}
						alt="David's Forge Hero Illustration"
						priority
						className="w-full max-w-md sm:max-w-lg xl:max-w-xl h-auto"
					/>
				</div>
			</div>
		</section>
	);
}
