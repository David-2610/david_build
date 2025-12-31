"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import heroImage from "../../../public/icons/LOGOS/charcter.png";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(135deg,#2B41B0_0%,#7E57C2_50%,#FF7C5C_100%)]">
      
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative mx-auto max-w-[1440px] px-6 py-2 flex flex-col-reverse lg:flex-row items-center justify-between gap-16">

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-white text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight">
            Hi, I&apos;m David 👋
          </h1>

          <p className="mt-5 text-xl sm:text-2xl font-medium">
            I solve real-world problems using
            <span className="block mt-1">
              Web, AI/ML & Game Development
            </span>
          </p>

          <p className="mt-4 text-base sm:text-lg opacity-90 leading-relaxed">
            I enjoy building scalable web applications, experimenting with
            intelligent systems, and creating interactive experiences that
            make ideas feel real.
          </p>

          {/* TAGS */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
            {["Web Developer", "AI / ML Learner", "Game Dev Explorer"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="/projects"
              className="rounded-xl bg-white text-[#2B41B0] px-6 py-3 font-semibold shadow-lg hover:scale-[1.05] transition"
            >
              View My Projects
            </a>

            <a
              href="/experience"
              className="rounded-xl border border-white/70 px-6 py-3 font-semibold hover:bg-white/10 transition"
            >
              See What I&apos;m Learning
            </a>
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <Image
            src={heroImage}
            alt="Illustration of David"
            priority
            className="w-[460px]  drop-shadow-2xl"
          />
        </motion.div>

      </div>
    </section>
  );
}
