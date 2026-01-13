type ProjectLink = {
	name: string;
	url: string;
	type?: "github" | "live" | "docs";
};

type Experience = {
	role: string;
	company: string;
	type: string;
	duration: string;
	description: string;
	highlights: string[];
	projects?: ProjectLink[];
};

const experienceData: Experience[] = [
	{
		role: "Web Development Intern",
		company: "Online Dimensions",
		type: "Internship",
		duration: "Sep 2025 – Dec 2025",
		description:
			"Completed a professional internship working on a production meal-prep e-commerce platform, contributing to both frontend and backend development.",
		highlights: [
			"Built responsive UI using React",
			"Worked on frontend and backend features",
			"Debugged issues and improved application performance",
			"Collaborated with design and QA teams in an Agile environment",
		],
	},
	{
		role: "Full-Stack Developer (Independent Projects)",
		company: "Personal & Academic Projects",
		type: "Independent Projects",
		duration: "2023 – 2025",
		description:
			"Worked on multiple independent full-stack projects to strengthen practical development skills, covering authentication, databases, APIs, and responsive user interfaces.",
		highlights: [
			"Built a Soil Report Generation System using React, TypeScript, and Supabase for secure authentication and report management",
			"Developed Bytewear, a full-stack ecommerce platform with user authentication, payments, admin dashboard, and cloud-based image handling",
			"Implemented REST APIs using Node.js, Express, and MongoDB",
			"Integrated JWT-based authentication and role-based access control",
			"Designed responsive user interfaces using Tailwind CSS",
			"Focused on clean architecture, reusable components, and real-world workflows",
		],
		projects: [
			{
				name: "Soil Report Generation System",
				url: "https://david-2610.github.io/agrihealth/",
				type: "live",
			},
			{
				name: "Bytewear – Ecommerce Platform",
				url: "https://bytewearfront.vercel.app/",
				type: "live",
			},
		],
	},
];

export default function ExperiencePage() {
	return (
		<main className="max-w-6xl mx-auto px-6 py-24">
			{/* Header */}
			<div className="mb-20">
				<h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
					Experience
				</h1>
				<p className="mt-4 text-gray-600 max-w-2xl text-lg">
					My journey through independent projects, internships, and
					hands-on development experience.
				</p>
			</div>

			{/* Timeline */}
			<div className="relative pl-10 space-y-20">
				{/* Vertical Line */}
				<span className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-gray-200 via-gray-300 to-transparent"></span>

				{experienceData.map((exp, index) => (
					<div key={index} className="relative">
						{/* Timeline Dot */}
						<span className="absolute left-[6px] top-6 h-3.5 w-3.5 rounded-full bg-gray-900 ring-4 ring-gray-100"></span>

						{/* Card */}
						<div className="group bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
							{/* Header */}
							<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
								<div>
									<h2 className="text-xl font-semibold text-gray-900">
										{exp.role}
									</h2>
									<p className="mt-1 text-sm text-gray-500">
										{exp.company}
										<span className="mx-2">•</span>
										{exp.type}
									</p>
								</div>

								<span className="text-sm text-gray-500 md:text-right whitespace-nowrap">
									{exp.duration}
								</span>
							</div>

							{/* Description */}
							<p className="mt-5 text-gray-700 leading-relaxed">
								{exp.description}
							</p>

							{/* Highlights */}
							<ul className="mt-6 space-y-3">
								{exp.highlights.map((point, i) => (
									<li
										key={i}
										className="flex items-start gap-3 text-gray-700"
									>
										<span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-900"></span>
										<span>{point}</span>
									</li>
								))}
							</ul>
							{/* Project Links */}
							{exp.projects && exp.projects.length > 0 && (
								<div className="mt-8">
									<p className="text-sm font-medium text-gray-900 mb-3">
										Project Links
									</p>

									<div className="flex flex-wrap gap-3">
										{exp.projects.map((project, i) => (
											<a
												key={i}
												href={project.url}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-1.5 text-sm text-gray-700 hover:border-gray-900 hover:text-gray-900 transition"
											>
												<span>{project.name}</span>
												<span className="text-xs text-gray-400">
													↗
												</span>
											</a>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
