import AnimatedSection from "../Components/Animations/AnimatedSection";
import Link from "next/link";

export default function HomePage() {
	return (
		<section className="relative flex min-h-screen items-center justify-center px-6">
			<div className="mx-auto max-w-4xl text-center">
				<AnimatedSection>
					<p className="mb-4 text-sm uppercase tracking-widest text-white/60">
						Frontend Developer
					</p>

					<h1 className="text-4xl font-bold leading-tight md:text-6xl">
						I build clean, scalable <br />
						<span className="text-white/70">web experiences</span>
					</h1>

					<p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
						2 years of experience building modern web apps with
						performance, UX, and clarity in mind.
					</p>

					<div className="mt-10 flex justify-center gap-4">
						<Link
							href="/projects"
							className="rounded-lg bg-white px-6 py-3 text-black hover:bg-white/90"
						>
							View Projects
						</Link>
						<Link
							href="/contact"
							className="rounded-lg border border-white/20 px-6 py-3 text-white hover:bg-white/10"
						>
							Contact Me
						</Link>
					</div>
				</AnimatedSection>
				<AnimatedSection>
					<section className="mx-auto max-w-5xl px-6 py-24">
						<h2 className="mb-6 text-3xl font-semibold">
							About Me
						</h2>
						<p className="max-w-2xl text-white/70">
							I’m a frontend developer focused on building
							accessible, performant interfaces. I enjoy refining
							UX details, learning in public, and turning complex
							problems into simple solutions.
						</p>

						<Link
							href="/about"
							className="mt-6 inline-block text-sm text-white underline underline-offset-4"
						>
							More about me →
						</Link>
					</section>
				</AnimatedSection>
				<AnimatedSection>
					<section className="mx-auto max-w-6xl px-6 py-24">
						<h2 className="mb-10 text-3xl font-semibold">
							Featured Projects
						</h2>

						<div className="grid gap-6 md:grid-cols-3">
							{[1, 2, 3].map((_, i) => (
								<div
									key={i}
									className="rounded-xl border border-white/10 p-6 hover:border-white/30"
								>
									<h3 className="mb-2 font-medium">
										Project Title
									</h3>
									<p className="text-sm text-white/60">
										Short description of the problem and
										solution.
									</p>
								</div>
							))}
						</div>

						<Link
							href="/projects"
							className="mt-8 inline-block text-sm text-white underline underline-offset-4"
						>
							View all projects →
						</Link>
					</section>
				</AnimatedSection>
				<AnimatedSection>
					<section className="mx-auto max-w-5xl px-6 py-24">
						<h2 className="mb-6 text-3xl font-semibold">
							My Journey
						</h2>
						<p className="max-w-2xl text-white/70">
							From learning the basics to building real-world
							applications, documenting mistakes, and improving
							how I think as a developer.
						</p>

						<Link
							href="/journey"
							className="mt-6 inline-block text-sm text-white underline underline-offset-4"
						>
							Read my journey →
						</Link>
					</section>
				</AnimatedSection>
				<AnimatedSection>
					<section className="mx-auto max-w-4xl px-6 py-24 text-center">
						<h2 className="mb-4 text-3xl font-semibold">
							Let’s build something meaningful
						</h2>
						<p className="mb-8 text-white/70">
							Open to frontend roles, collaborations, and learning
							opportunities.
						</p>

						<Link
							href="/contact"
							className="rounded-lg bg-white px-6 py-3 text-black hover:bg-white/90"
						>
							Get in touch
						</Link>
					</section>
				</AnimatedSection>
			</div>
		</section>
	);
}
