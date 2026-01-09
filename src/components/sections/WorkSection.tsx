import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

export const projects = [
  {
    id: "medi-manage",
    title: "MEDI-MANAGE",
    problem: "Complex inventory tracking for modern pharmacies",
    description: "A comprehensive pharmacy management system streamlining inventory, sales, and customer tracking with real-time updates.",
    stack: ["React", "Node.js", "MongoDB", "Tailwind"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    category: "MANAGEMENT SYSTEM",
    link: "https://pharmacy-client-supto.vercel.app/",
    githubClient: "https://github.com/supto707/pharmacy-client",
    githubServer: "https://github.com/supto707/pharmacy-server",
  },
  {
    id: "microtask",
    title: "MICROTASK",
    problem: "Connecting businesses with micro-workforce",
    description: "A robust earning platform allowing users to complete small tasks for rewards, featuring wallet management and admin controls.",
    stack: ["React", "Firebase", "Stripe", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2574&auto=format&fit=crop",
    category: "SAAS PLATFORM",
    link: "https://ph-a13-b12-client.vercel.app/",
    githubClient: "https://github.com/supto707/ph-a13-b12-client",
    githubServer: "https://github.com/supto707/ph-a13-b12-server",
  },
  {
    id: "supto-dev",
    title: "SUPTO.DEV",
    problem: "Showcasing high-performance web solutions",
    description: "Premium agency portfolio demonstrating future-proof web apps, featuring advanced animations and service listings.",
    stack: ["Next.js", "TypeScript", "GSAP", "Three.js"],
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
    category: "AGENCY PORTFOLIO",
    link: "https://supto-dot-dev-client.vercel.app/",
    githubClient: "https://github.com/supto707/supto-dot-dev-client",
    githubServer: "https://github.com/supto707/supto-dot-dev-server",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative w-[85vw] md:w-[60vw] h-[70vh] flex-shrink-0 rounded-lg overflow-hidden border border-foreground/10 bg-card group cursor-pointer"
    >
      <Link to={`/project/${project.id}`} className="block w-full h-full">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{
              filter: isHovered ? "grayscale(0%)" : "grayscale(100%)"
            }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </motion.div>

        {/* Project Number */}
        <div className="absolute top-8 right-8">
          <span className="font-mono text-[20vw] md:text-[15vw] font-black text-foreground/5 leading-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <p className="font-mono text-xs tracking-[0.2em] text-primary mb-3">
            {project.category}
          </p>
          <motion.h3
            className={`text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.03em] ${isHovered ? "glitch-hover" : ""}`}
          >
            {project.title}
          </motion.h3>
          <p className="mt-4 text-muted-foreground max-w-md">
            {project.description}
          </p>

          {/* Stack */}
          <div className="flex flex-wrap gap-2 mt-6">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full font-mono text-[10px] bg-foreground/5 border border-foreground/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Magnetic Cursor Follower */}
        {isHovered && (
          <motion.div
            className="absolute pointer-events-none z-20 w-20 h-20 rounded-full bg-primary flex items-center justify-center"
            animate={{
              x: mousePosition.x - 40,
              y: mousePosition.y - 40,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            <ArrowUpRight className="w-6 h-6 text-primary-foreground" />
          </motion.div>
        )}
      </Link>
    </motion.div>
  );
};

const StackedProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const targetScale = 1 - (projects.length - index) * 0.05;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale,
        opacity,
        top: `calc(10vh + ${index * 25}px)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="sticky w-full h-[75vh] rounded-lg overflow-hidden border border-foreground/10 bg-card group"
    >
      <div className="relative w-full h-full">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{
              filter: isHovered ? "grayscale(0%)" : "grayscale(100%)"
            }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </motion.div>

        {/* Project Number */}
        <div className="absolute top-8 right-8">
          <span className="font-mono text-[20vw] md:text-[15vw] font-black text-foreground/5 leading-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <p className="font-mono text-xs tracking-[0.2em] text-primary mb-3">
            {project.category}
          </p>
          <motion.h3
            className={`text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.03em] ${isHovered ? "glitch-hover" : ""}`}
            initial={{ opacity: 1 }}
          >
            {project.title}
          </motion.h3>
          <p className="mt-4 text-muted-foreground max-w-md">
            {project.description}
          </p>


          {/* Stack */}
          <div className="flex flex-wrap gap-2 mt-6 mb-8">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full font-mono text-[10px] bg-foreground/5 border border-foreground/10"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 z-30 relative">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full font-mono text-[10px] md:text-xs font-bold hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300 uppercase tracking-wider shadow-lg hover:shadow-primary/25"
            >
              <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
              Live Preview
            </a>
            <a
              href={project.githubClient}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full font-mono text-[10px] md:text-xs font-bold hover:bg-secondary/80 hover:scale-105 active:scale-95 transition-all duration-300 uppercase tracking-wider border border-border shadow-lg"
            >
              <Github className="w-3 h-3 md:w-4 md:h-4" />
              Client Repo
            </a>
            <a
              href={project.githubServer}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full font-mono text-[10px] md:text-xs font-bold hover:bg-secondary/80 hover:scale-105 active:scale-95 transition-all duration-300 uppercase tracking-wider border border-border shadow-lg"
            >
              <Github className="w-3 h-3 md:w-4 md:h-4" />
              Server Repo
            </a>
          </div>
        </div>

        {/* Magnetic Cursor Follower - Only visible on non-touch devices and when not hovering buttons */}
        {isHovered && (
          <motion.div
            className="absolute pointer-events-none z-20 w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/50"
            animate={{
              x: mousePosition.x - 40,
              y: mousePosition.y - 40,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            <ArrowUpRight className="w-6 h-6 text-primary" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const WorkSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [30, 0, 0, -30]);

  return (
    <section id="work" ref={containerRef} className="relative py-20">
      <div className="px-6 md:px-12 mb-12">
        <motion.span
          style={{ opacity: headerOpacity, y: headerY }}
          className="font-mono text-xs tracking-[0.3em] text-muted-foreground"
        >
          // SELECTED WORK
        </motion.span>
        <motion.h2
          style={{ opacity: headerOpacity, y: headerY }}
          className="mt-4 text-5xl md:text-7xl font-black uppercase tracking-[-0.04em]"
        >
          <motion.span
            className="inline-block"
            whileHover={{ color: "hsl(var(--primary))" }}
          >
            PROJECTS
          </motion.span>{" "}
          <motion.span
            className="inline-block text-stroke hover:text-primary transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
          >
            THAT
          </motion.span>{" "}
          <motion.span
            className="inline-block"
            whileHover={{ color: "hsl(var(--primary))" }}
          >
            SOLVE
          </motion.span>
        </motion.h2>
      </div>

      <div className="px-6 md:px-12 space-y-8">
        {projects.map((project, index) => (
          <StackedProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
