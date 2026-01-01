"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Menu, X, Download } from "lucide-react";

import logo from "../../public/icons/LOGOS/bgremoved_png.png";
import downloadsvg from "../../public/icons/LOGOS/download-minimalistic-svgrepo-com.svg";
const navLinks = [
	{ name: "Home", href: "/" },
	{ name: "Blog", href: "/blog" },
	{ name: "Projects", href: "/projects" },
	{ name: "Experience", href: "/experience" },
	{ name: "Links", href: "/links" },
];

const Navbar = () => {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	/* ✅ Click outside to close */
	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(e.target as Node)
			) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	return (
		<nav className="sticky top-0 z-50 border-b border-white/20 bg-white backdrop-blur-lg">
			<div className="mx-auto max-w-[1440px] px-8  ">
				{/* Top bar */}
				<div className="flex h-14 items-center justify-between">
					{/* Logo */}
					<Link href="/" className="flex items-center">
						<Image
							src={logo}
							alt="David's Forge"
							priority
							className="h-6 w-auto sm:h-7 lg:h-10 transition-all duration-300"
						/>
					</Link>

					{/* Desktop Nav */}
					<div className="hidden md:flex items-center gap-8">
						{navLinks.map((link) => {
							const isActive = pathname === link.href;

							return (
								<Link
									key={link.name}
									href={link.href}
									className={clsx(
										"relative px-4 py-1.5 text-sm font-medium rounded-full",
										"transition-all duration-300 ease-out",
										"hover:scale-[1.06]",
										"hover:bg-white/70 hover:shadow-[0_0_15px_rgba(59,130,246,0.35)]",
										isActive
											? "bg-white text-black shadow-sm"
											: "text-gray-700 hover:text-blue-600"
									)}
								>
									{link.name}
								</Link>
							);
						})}
					</div>

					{/* Right actions */}
					<div className="flex items-center gap-2">
						{/* CV Button */}
						<Link
							href="/email-cv"
							className="relative overflow-hidden flex items-center gap-2 rounded-md font-semibold text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.97]"
						>
							<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />

							{/* Mobile icon */}
							<Download
								size={16}
								className="sm:hidden relative z-10"
							/>

							{/* Desktop text + icon */}
							<span className="hidden sm:inline-flex items-center gap-1 relative z-10 whitespace-nowrap">
								Download CV
								<Download size={16} />
							</span>
						</Link>

						{/* Mobile Menu Button */}
						<button
							onClick={() => setOpen(!open)}
							className="md:hidden p-2 text-gray-700"
							aria-label="Toggle Menu"
						>
							{open ? <X size={22} /> : <Menu size={22} />}
						</button>
					</div>
				</div>

				{/* Mobile Dropdown */}
				<div
					ref={menuRef}
					className={clsx(
						"md:hidden overflow-hidden transition-all duration-300 ease-out my-2",
						open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
					)}
				>
					<div className="mt-2 rounded-xl bg-white/70 backdrop-blur-xl shadow-lg border border-white/30 p-4">
						<div className="flex flex-col gap-3">
							{navLinks.map((link) => (
								<Link
									key={link.name}
									href={link.href}
									onClick={() => setOpen(false)}
									className={clsx(
										"text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200",
										"active:scale-[0.97]",
										pathname === link.href
											? "bg-white text-black shadow-sm"
											: "text-gray-700 hover:bg-white/80"
									)}
								>
									{link.name}
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
