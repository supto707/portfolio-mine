import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TextScramble from "../TextScramble";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Freelance & Open Source",
    period: "2023 — Present",
    description: "Building scalable web applications using Next.js, Golang, and Python. Contributing to open source and delivering custom solutions for clients.",
    impact: "Delivered 10+ robust projects with modern tech stacks",
  },
  {
    role: "Competitive Programmer",
    company: "Hackathons & Contests",
    period: "2022 — 2023",
    description: "Active participant in coding competitions, honing algorithmic problem-solving skills and logic optimization.",
    impact: "Secured 1st place in ICT Olympiad & Creative Talent Search",
  },
  {
    role: "Web Development Learner",
    company: "Self-Taught Journey",
    period: "2021 — 2022",
    description: "Intensive learning period mastering the MERN stack, completing bootcamps (Programming Hero), and building foundational projects.",
    impact: "Mastered React, Node.js, and MongoDB ecosystems",
  },
];

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [30, 0, 0, -30]);

  return (
    <section id="experience" ref={containerRef} className="py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.span
          style={{ opacity: headerOpacity, y: headerY }}
          className="font-mono text-xs tracking-[0.3em] text-muted-foreground"
        >
          // MY JOURNEY
        </motion.span>

        <motion.h2
          style={{ opacity: headerOpacity, y: headerY }}
          className="mt-4 text-5xl md:text-7xl font-black uppercase tracking-[-0.04em]"
        >
          <motion.span
            className="inline-block"
            whileHover={{ x: 10, color: "hsl(var(--primary))" }}
            transition={{ duration: 0.3 }}
          >
            CONSISTENTLY
          </motion.span>
          <br />
          <motion.span
            className="inline-block text-stroke hover:text-primary transition-colors duration-300"
            whileHover={{ x: -10 }}
            transition={{ duration: 0.3 }}
          >
            GROWING
          </motion.span>
        </motion.h2>

        <div className="mt-16 relative">
          {/* Timeline Line Background */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-foreground/10 transform md:-translate-x-px" />

          {/* Timeline Line Progress */}
          <motion.div
            className="absolute left-0 md:left-1/2 top-0 w-px bg-primary transform md:-translate-x-px origin-top"
            style={{ height: lineHeight }}
          />

          {experiences.map((exp, index) => {
            const expRef = useRef<HTMLDivElement>(null);
            const { scrollYProgress: expProgress } = useScroll({
              target: expRef,
              offset: ["start end", "end start"],
            });
            const expOpacity = useTransform(expProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
            const expY = useTransform(expProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

            return (
              <motion.div
                key={exp.role}
                ref={expRef}
                style={{ opacity: expOpacity, y: expY }}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 ${index % 2 === 0 ? "" : "md:text-right"
                  }`}
              >
                {/* Timeline Dot */}
                <motion.div
                  className="absolute left-0 md:left-1/2 top-2 w-4 h-4 rounded-full bg-background border-2 border-primary transform -translate-x-[6px] md:-translate-x-2 z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3, duration: 0.4, type: "spring" }}
                />

                {/* Content */}
                <div className={`pl-10 md:pl-0 ${index % 2 === 0 ? "md:pr-20" : "md:order-2 md:pl-20"}`}>
                  <p className="font-mono text-xs tracking-wider text-primary mb-2">
                    {exp.period}
                  </p>
                  <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                  <p className="text-muted-foreground font-medium mb-3">
                    <TextScramble text={exp.company} delay={index * 0.2} />
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {exp.description}
                  </p>
                  <p className="text-sm font-medium text-primary">
                    → {exp.impact}
                  </p>
                </div>

                {/* Spacer for alternating layout */}
                <div className={index % 2 === 0 ? "hidden md:block" : "hidden md:block md:order-1"} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
