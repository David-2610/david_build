type LinkItem = {
	label: string;
	href: string;
	external?: boolean;
	icon: string;
};

const links: LinkItem[] = [
	{
		label: "Email Me",
		href: "mailto:davidtembhare1005@gmail.com",
		icon: "✉️",
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/david-tembhare-74960b29a",
		external: true,
		icon: "💼",
	},
	{
		label: "GitHub",
		href: "https://github.com/David-2610",
		external: true,
		icon: "🧑‍💻",
	},
	{
		label: "View Projects",
		href: "/projects",
		icon: "🚀",
	},
	{
		label: "Read Blog",
		href: "/blog",
		icon: "✍️",
	},
];

export default function LinksPage() {
	return (
		<main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-6">
			<div className="w-full max-w-xl">
				{/* Card */}
				<div className="rounded-3xl border border-gray-200 bg-white/80 backdrop-blur p-10 shadow-sm">
					{/* Header */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900">
							Let’s Connect
						</h1>
						<p className="mt-4 text-gray-600 text-lg">
							Reach out, explore my work, or connect with me online.
						</p>
					</div>

					{/* Links */}
					<div className="flex flex-col gap-4">
						{links.map((link, index) => (
							<a
								key={index}
								href={link.href}
								target={link.external ? "_blank" : undefined}
								rel={link.external ? "noopener noreferrer" : undefined}
								className="group flex items-center justify-between rounded-2xl border border-gray-200 px-6 py-4 text-lg font-medium text-gray-800 transition hover:border-gray-900 hover:bg-gray-50"
							>
								<div className="flex items-center gap-4">
									<span className="text-xl">{link.icon}</span>
									<span>{link.label}</span>
								</div>
								<span className="text-gray-400 transition group-hover:text-gray-900">
									↗
								</span>
							</a>
						))}
					</div>
				</div>

				{/* Footer */}
				<p className="mt-8 text-center text-sm text-gray-500">
					© {new Date().getFullYear()} • Built with Next.js & Tailwind
				</p>
			</div>
		</main>
	);
}
