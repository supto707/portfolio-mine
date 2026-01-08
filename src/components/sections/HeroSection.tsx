import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import LiquidButton from "../LiquidButton";
import GeometricShapes from "../GeometricShapes";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [cursorVariant, setCursorVariant] = useState("default");

  // Scroll-based fade out
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-300, 300], [8, -8]);
  const rotateY = useTransform(x, [-300, 300], [-8, 8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const titleVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 relative overflow-hidden"
    >
      {/* Geometric Illustrations */}
      <GeometricShapes variant="hero" />

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      {/* Animated grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.div
          className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.7 }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative z-10 text-center w-full max-w-[95vw]"
      >
        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8"
        >
          <motion.span
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 0 0 rgba(34, 197, 94, 0.4)",
                  "0 0 0 8px rgba(34, 197, 94, 0)",
                  "0 0 0 0 rgba(34, 197, 94, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground group-hover:text-foreground transition-colors">
              AVAILABLE FOR PROJECTS
            </span>
            <Sparkles className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.span>
        </motion.div>

        {/* Magnetic Title */}
        <motion.h1
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="perspective-1000"
          onMouseEnter={() => setCursorVariant("text")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          <div className="overflow-hidden">
            <motion.span
              custom={0}
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              className="block text-[15vw] md:text-[18vw] font-black uppercase tracking-[-0.06em] leading-[0.8] relative"
              whileHover={{ letterSpacing: "-0.03em" }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                className="inline-block"
                whileHover={{
                  color: "hsl(var(--primary))",
                  textShadow: "0 0 60px hsl(var(--primary) / 0.5)"
                }}
              >
                SADMAN
              </motion.span>
            </motion.span>
          </div>
          <div className="relative">
            <motion.h1
              custom={1}
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="text-[11vw] leading-[0.8] font-black tracking-[-0.06em] flex flex-col items-center justify-center p-0 m-0"
            >
              <span className="block text-stroke hover:text-foreground transition-colors duration-500">
                AREFIN
              </span>
              <span className="block text-foreground relative">
                <span className="relative z-10"></span>
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                  className="absolute bottom-[10%] left-0 h-[0.1em] bg-primary/30 z-[-1]"
                />
              </span>
            </motion.h1>
          </div>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground font-mono max-w-2xl mx-auto"
        >
          FULL STACK DEVELOPER // CREATIVE TECHNOLOGIST // PROBLEM SOLVER
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light"
        >
          Frontend developer specializing in{" "}
          <motion.span
            className="text-foreground font-medium"
            whileHover={{ color: "hsl(var(--primary))" }}
          >
            React
          </motion.span>
          ,{" "}
          <motion.span
            className="text-foreground font-medium"
            whileHover={{ color: "hsl(var(--primary))" }}
          >
            TypeScript
          </motion.span>
          , and{" "}
          <motion.span
            className="text-foreground font-medium"
            whileHover={{ color: "hsl(var(--primary))" }}
          >
            motion design
          </motion.span>
          .
          <br />
          I craft intentional, performant interfaces that users actually enjoy.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <LiquidButton onClick={() => scrollTo("#work")}>
              View Projects
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="w-4 h-4" />
              </motion.div>
            </LiquidButton>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <LiquidButton variant="outline" onClick={() => scrollTo("#contact")}>
              Start a Conversation
            </LiquidButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
            SCROLL
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
