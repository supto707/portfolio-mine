import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import GeometricShapes from "../GeometricShapes";
interface AboutSectionProps { }

const coreValues = [
  {
    title: "Craft Over Shortcuts",
    description: "Every line of code is intentional. I don't copy-paste solutions—I understand them.",
  },
  {
    title: "Clarity Over Complexity",
    description: "Simple solutions that work are better than clever ones that confuse.",
  },
  {
    title: "Performance Matters",
    description: "Fast, accessible, and smooth. These aren't nice-to-haves—they're requirements.",
  },
];

const stats = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Projects Built" },
  { value: 15, suffix: "+", label: "Technologies" },
];

const personalDetails = [
  { label: "Name", value: "Sadman Arefin Supto" },
  { label: "Date of Birth", value: "23 October 2006" },
  { label: "Nationality", value: "Bangladeshi" },
  { label: "Religion", value: "Islam" },
  { label: "Marital Status", value: "Unmarried" },
];

const languages = [
  { name: "Bengali", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "Hindi", level: "Conversational" },
  { name: "German", level: "Beginner" },
];

import profileImage from "@/IMG_9466.jpg";
import Counter from "../Counter";

const AboutSection = ({ }: AboutSectionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const headerOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [30, 0, 0, -30]);

  return (
    <section id="about" ref={containerRef} className="py-32 px-6 md:px-12 relative overflow-hidden">
      <GeometricShapes variant="about" />
      <div className="max-w-7xl mx-auto">
        <motion.span
          style={{ opacity: headerOpacity, y: headerY }}
          className="font-mono text-xs tracking-[0.3em] text-muted-foreground"
        >
          // ABOUT ME
        </motion.span>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Image with Reveal Animation */}
          <motion.div
            style={{ opacity: headerOpacity }}
            className="relative overflow-hidden aspect-[3/4] rounded-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.img
              src={profileImage}
              alt="Portrait"
              className="w-full h-full object-cover"
              initial={{ filter: "grayscale(100%)", scale: 1 }}
              animate={{
                filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-primary/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0 : 0.3 }}
              transition={{ duration: 0.4 }}
            />

            <div className="absolute inset-0 border border-foreground/10 rounded-lg pointer-events-none" />
          </motion.div>

          {/* Right Column - Content */}
          <div className="flex flex-col justify-center">
            <motion.h2
              style={{ opacity: headerOpacity, y: headerY }}
              className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-[-0.04em] leading-[0.9]"
            >
              <motion.span
                className="block"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                THE
              </motion.span>
              <motion.span
                className="block text-stroke hover:text-primary transition-colors duration-500"
                whileHover={{ x: -10 }}
                transition={{ duration: 0.3 }}
              >
                ARCHITECT
              </motion.span>
            </motion.h2>

            <motion.div
              style={{ opacity: headerOpacity, y: headerY }}
              className="mt-8 space-y-6 text-muted-foreground leading-relaxed"
            >
              <p>
                I'm a Full Stack Developer and Creative Technologist driven by a passion for both logic and design.
                With a strong academic foundation in Mathematics and Computer Science, I've honed my skills through
                rigorous training—from Harvard's CS50 to advanced algorithms at Princeton.
              </p>
              <p>
                My journey is defined by a relentless pursuit of excellence, evidenced by securing 1st positions
                in both the Creative Talent Exploration Competition and ICT Olympiad. I don't just write code;
                I engineer solutions that merge robust backend logic (Golang, Python) with stunning,
                interactive frontend experiences (React, Three.js).
              </p>
              <p className="font-mono text-sm text-primary">
                // Logic meets Creativity
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              {stats.map((stat, index) => {
                const cardRef = useRef<HTMLDivElement>(null);
                const { scrollYProgress: cardProgress } = useScroll({
                  target: cardRef,
                  offset: ["start end", "end start"],
                });
                const cardOpacity = useTransform(cardProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
                const cardScale = useTransform(cardProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

                return (
                  <motion.div
                    key={stat.label}
                    ref={cardRef}
                    style={{ opacity: cardOpacity, scale: cardScale }}
                    whileHover={{
                      borderColor: "hsl(var(--primary) / 0.5)",
                      boxShadow: "0 0 30px hsl(var(--primary) / 0.1)"
                    }}
                    className="text-center p-6 rounded-lg border border-foreground/10 bg-card transition-all duration-300 cursor-pointer"
                  >
                    <div className="text-3xl md:text-5xl font-black text-primary">
                      <Counter
                        from={0}
                        to={stat.value}
                        suffix={stat.suffix}
                        prefix={stat.value < 10 ? "0" : ""}
                        duration={2.5}
                      />
                    </div>
                    <p className="mt-2 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-32">
          <motion.p
            style={{ opacity: headerOpacity, y: headerY }}
            className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-8"
          >
            // MY PRINCIPLES
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreValues.map((value, index) => {
              const valueRef = useRef<HTMLDivElement>(null);
              const { scrollYProgress: valueProgress } = useScroll({
                target: valueRef,
                offset: ["start end", "end start"],
              });
              const valueOpacity = useTransform(valueProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
              const valueY = useTransform(valueProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);
              const valueRotate = useTransform(valueProgress, [0, 0.3, 0.7, 1], [5, 0, 0, -5]);

              return (
                <motion.div
                  key={value.title}
                  ref={valueRef}
                  style={{ opacity: valueOpacity, y: valueY, rotate: valueRotate }}
                  whileHover={{
                    y: -12,
                    boxShadow: "0 20px 40px -20px hsl(var(--primary) / 0.3)"
                  }}
                  className="p-8 rounded-lg border border-foreground/10 bg-card group hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Hover gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  <motion.span
                    className="relative font-mono text-6xl font-black text-primary/10 group-hover:text-primary/30 transition-colors"
                    whileHover={{ scale: 1.2, rotate: -5 }}
                  >
                    0{index + 1}
                  </motion.span>
                  <h3 className="relative mt-4 text-xl font-bold group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="relative mt-3 text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Personal Profile & Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-32">
            <div>
              <motion.p
                style={{ opacity: headerOpacity }}
                className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-8"
              >
                // PERSONAL PROFILE
              </motion.p>
              <div className="space-y-4">
                {personalDetails.map((detail, index) => (
                  <motion.div
                    key={detail.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between border-b border-foreground/10 pb-2"
                  >
                    <span className="text-muted-foreground font-mono text-sm">{detail.label}</span>
                    <span className="font-medium text-right">{detail.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <motion.p
                style={{ opacity: headerOpacity }}
                className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-8"
              >
                // LANGUAGES
              </motion.p>
              <div className="grid grid-cols-1 gap-4">
                {languages.map((lang, index) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-foreground/10 bg-card flex justify-between items-center"
                  >
                    <span className="font-bold">{lang.name}</span>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {lang.level}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12">
                <motion.p
                  style={{ opacity: headerOpacity }}
                  className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-8"
                >
                // COMPUTER LITERACY
                </motion.p>
                <p className="text-muted-foreground leading-relaxed">
                  Expert in Microsoft Office, Internet Browsing, Programming, Graphic Design, Web Development, Video Editing, Social Media Tools, Email and Communication Tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
