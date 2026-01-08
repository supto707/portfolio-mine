import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import GrainOverlay from "@/components/GrainOverlay";
import Navbar from "@/components/Navbar";
import useLenis from "@/hooks/useLenis";

const projectsData: Record<string, {
  title: string;
  category: string;
  image: string;
  overview: string;
  problem: string;
  constraints: string[];
  solution: string;
  implementation: string[];
  outcome: string;
  stack: string[];
  liveUrl?: string;
}> = {
  nebula: {
    title: "NEBULA",
    category: "E-COMMERCE",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop",
    overview: "A modern e-commerce platform built for a fashion startup looking to compete with established brands through superior user experience.",
    problem: "The client's existing platform had a 68% cart abandonment rate. Users complained about slow loading, confusing navigation, and a checkout process that felt like filing taxes.",
    constraints: [
      "6-week deadline for initial launch",
      "Must integrate with existing inventory system",
      "Mobile-first design requirement (70% mobile traffic)",
      "Budget constraints on third-party services",
    ],
    solution: "I proposed a complete redesign focusing on three pillars: speed, simplicity, and delight. Every interaction was mapped and optimized. The checkout was reduced from 5 steps to 2. Micro-interactions were added to make the experience feel premium.",
    implementation: [
      "Built with Next.js for optimal performance and SEO",
      "Implemented optimistic UI updates for instant feedback",
      "Created a custom image optimization pipeline",
      "Designed a component library for consistent UX",
      "Added subtle animations that didn't impact performance",
    ],
    outcome: "Cart abandonment dropped to 34%. Average session duration increased by 2.4x. The client reported a 156% increase in conversion rate within the first month.",
    stack: ["Next.js", "Stripe", "Tailwind CSS", "Framer Motion", "Sanity CMS"],
    liveUrl: "https://example.com",
  },
  aurora: {
    title: "AURORA",
    category: "BRAND IDENTITY",
    image: "https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=1200&h=800&fit=crop",
    overview: "Complete digital brand system for a design studio transitioning from print to digital services.",
    problem: "The studio had 15 years of print expertise but zero digital presence. Their existing brand didn't translate to screens, and they lacked the foundation to build consistent digital experiences.",
    constraints: [
      "Brand must work across print and digital",
      "Team has limited technical knowledge",
      "Multiple stakeholders with different visions",
      "Needed documentation for future use",
    ],
    solution: "Created a bridge between their print heritage and digital future. The new system honors their typographic expertise while introducing motion and interactivity as new brand elements.",
    implementation: [
      "Developed comprehensive design tokens in Figma",
      "Built a React component library with Storybook",
      "Created animation guidelines using GSAP",
      "Wrote extensive documentation for non-technical team",
      "Designed website templates for different use cases",
    ],
    outcome: "The studio successfully launched their digital services, landing 3 major clients in the first quarter. The design system is now used across 12 projects.",
    stack: ["React", "GSAP", "Storybook", "Figma", "Notion"],
  },
  vertex: {
    title: "VERTEX",
    category: "WEB APPLICATION",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&h=800&fit=crop",
    overview: "Real-time analytics dashboard for a fintech startup processing millions of transactions daily.",
    problem: "The existing dashboard was a nightmare. Data was delayed, charts were confusing, and the system crashed during high-traffic periods. Decision-makers couldn't trust the numbers.",
    constraints: [
      "Must handle 10,000+ concurrent users",
      "Real-time data with <500ms latency",
      "Complex data relationships to visualize",
      "Strict security and compliance requirements",
    ],
    solution: "Architected a system built for scale. Implemented WebSocket connections for real-time updates, optimized queries for complex aggregations, and designed visualizations that told stories, not just showed numbers.",
    implementation: [
      "Built efficient data fetching with React Query",
      "Created custom D3.js visualizations",
      "Implemented WebSocket with automatic reconnection",
      "Designed role-based access control",
      "Added export functionality for compliance",
    ],
    outcome: "Zero downtime in 8 months. Data latency reduced to 120ms average. User satisfaction scores increased from 3.2 to 4.7 out of 5.",
    stack: ["React", "D3.js", "WebSocket", "PostgreSQL", "Node.js"],
  },
  prism: {
    title: "PRISM",
    category: "CREATIVE DIRECTION",
    image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&h=800&fit=crop",
    overview: "Award-winning portfolio website for an architectural visualization studio.",
    problem: "The studio's work was stunning, but their website looked like every other agency site. They needed a digital experience as memorable as their 3D renders.",
    constraints: [
      "Heavy media assets (4K images, videos)",
      "Must work on older devices too",
      "Client wanted 'wow factor' without being gimmicky",
      "Needed CMS for easy updates",
    ],
    solution: "Created an immersive experience that feels like walking through their work. Progressive loading ensures performance. Every transition is intentional, guiding visitors through their story.",
    implementation: [
      "Built with Next.js and Three.js for 3D elements",
      "Implemented progressive image loading strategy",
      "Created custom scroll-triggered animations",
      "Integrated Sanity for headless content management",
      "Optimized for Core Web Vitals despite heavy assets",
    ],
    outcome: "Featured on Awwwards and CSS Design Awards. Inquiries increased by 340%. Average time on site: 4 minutes 23 seconds (industry average: 45 seconds).",
    stack: ["Next.js", "Three.js", "GSAP", "Sanity", "Vercel"],
    liveUrl: "https://example.com",
  },
};

const ProjectDetail = () => {
  useLenis();
  const { id } = useParams<{ id: string }>();
  const project = id ? projectsData[id] : null;

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <GrainOverlay />
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-12"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO PROJECTS
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <span className="font-mono text-xs tracking-[0.3em] text-primary">
              // {project.category}
            </span>
            <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter">
              {project.title}
            </h1>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-12 rounded-xl overflow-hidden border border-foreground/10"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-video object-cover"
            />
          </motion.div>

          {/* Overview */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <h2 className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">
              // OVERVIEW
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed">{project.overview}</p>
          </motion.section>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 flex flex-wrap gap-3"
          >
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full font-mono text-sm bg-card border border-foreground/10"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Problem */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 p-8 rounded-xl bg-card border border-foreground/10"
          >
            <h2 className="font-mono text-xs tracking-[0.3em] text-primary mb-4">
              // THE PROBLEM
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{project.problem}</p>
          </motion.section>

          {/* Constraints */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <h2 className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6">
              // CONSTRAINTS
            </h2>
            <ul className="space-y-3">
              {project.constraints.map((constraint, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-muted-foreground">{constraint}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Solution */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <h2 className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">
              // THE SOLUTION
            </h2>
            <p className="text-lg leading-relaxed">{project.solution}</p>
          </motion.section>

          {/* Implementation */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <h2 className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6">
              // KEY IMPLEMENTATION DETAILS
            </h2>
            <ul className="space-y-4">
              {project.implementation.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="font-mono text-primary text-sm">0{index + 1}</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Outcome */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 p-8 rounded-xl bg-primary/10 border border-primary/20"
          >
            <h2 className="font-mono text-xs tracking-[0.3em] text-primary mb-4">
              // THE OUTCOME
            </h2>
            <p className="text-lg leading-relaxed">{project.outcome}</p>
          </motion.section>

          {/* Live Link */}
          {project.liveUrl && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12"
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-primary transition-colors duration-300"
              >
                View Live Project
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          )}

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 pt-12 border-t border-foreground/10"
          >
            <Link
              to="/#work"
              className="group flex items-center justify-between py-6 hover:text-primary transition-colors"
            >
              <span className="font-mono text-xs tracking-wider text-muted-foreground">
                // MORE PROJECTS
              </span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
