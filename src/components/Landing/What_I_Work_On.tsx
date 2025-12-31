"use client";

import { motion } from "framer-motion";

import { Code2, Brain, Gamepad2 } from "lucide-react";

const areas = [
	{
		title: "Web Development",
		desc: "Building scalable, responsive web applications with clean UI and solid architecture.",
		gradient: "from-[#2B41B0] to-[#7E57C2]",
		icon: Code2,
	},
	{
		title: "AI / Machine Learning",
		desc: "Learning and applying machine learning concepts to solve practical, real-world problems.",
		gradient: "from-[#7E57C2] to-[#FF7C5C]",
		icon: Brain,
	},
	{
		title: "Game Development",
		desc: "Exploring game mechanics, interactive systems, and creative problem-solving through games.",
		gradient: "from-[#FF7C5C] to-[#2B41B0]",
		icon: Gamepad2,
	},
];

export default function WhatIWorkOn() {
	return (
		<section className="relative py-28 overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f6f7ff_100%)]">
			{/* subtle background glow */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#7E57C2]/20 blur-3xl" />
				<div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#FF7C5C]/20 blur-3xl" />
			</div>

			<div className="relative max-w-6xl mx-auto px-6">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center"
				>
					<h2 className="text-3xl sm:text-4xl font-bold text-[#2B41B0]">
						What I Work On
					</h2>
					<p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg opacity-80">
						I focus on building real things while continuously
						learning and experimenting across different domains.
					</p>
				</motion.div>

				{/* Cards */}
				<div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{areas.map((item, i) => (
						<motion.div
							key={item.title}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.15, duration: 0.6 }}
							whileHover={{ y: -6, scale: 1.02 }}
							className="relative group"
						>
							{/* GLOW */}
							<div
								className={`absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 blur-2xl bg-gradient-to-r ${item.gradient}`}
							/>

							{/* CARD */}
							<div className="relative z-10 rounded-2xl border border-white/60 bg-white p-8 backdrop-blur-xl shadow-lg">
								{/* ICON */}
								<div
									className={`mb-5 inline-flex rounded-xl p-3 bg-gradient-to-r ${item.gradient}
                            transition-all duration-300
                            group-hover:-translate-y-1
                            group-hover:rotate-6
                            group-hover:scale-110`}
								>
									<item.icon className="h-6 w-6 text-white" />
								</div>

								{/* TOP ACCENT */}
								<div
									className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r ${item.gradient}`}
								/>

								<h3 className="text-xl font-semibold text-[#2B41B0]">
									{item.title}
								</h3>

								<p className="mt-4 text-sm sm:text-base opacity-80 leading-relaxed">
									{item.desc}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
