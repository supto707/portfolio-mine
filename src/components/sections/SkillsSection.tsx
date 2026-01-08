import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MagicCard from "../MagicCard";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiGreensock, SiThreedotjs, SiFigma, SiNodedotjs, SiPostgresql,
  SiSupabase, SiGraphql, SiGit, SiDocker, SiPython, SiGo
} from "react-icons/si";

const SkillsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [30, 0, 0, -30]);

  return (
    <section ref={containerRef} id="skills" className="relative py-32 px-6 md:px-12 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div style={{ opacity: headerOpacity, y: headerY }} className="mb-12">
          <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
            // CAPABILITIES
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-black uppercase tracking-tighter">
            Digital Arsenal
          </h2>
        </motion.div>

        {/* Magic Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 gap-4 h-auto md:h-[600px]">
          {/* Card 1: Frontend (Large, Top Left) */}
          <motion.div
            className="md:col-span-2 md:row-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <MagicCard className="p-8 flex flex-col justify-between group">
              <div>
                <h3 className="text-xl text-muted-foreground font-medium mb-1">Frontend Engineering</h3>
                <h4 className="text-2xl md:text-3xl font-bold text-foreground">Pixel Perfect &<br />Interactive</h4>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <SiReact className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                <SiNextdotjs className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                <SiTypescript className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                <SiTailwindcss className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                <SiFramer className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                <SiGreensock className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                <SiThreedotjs className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </MagicCard>
          </motion.div>

          {/* Card 2: Backend (Medium, Top Right) */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <MagicCard className="p-8 flex flex-col justify-center group">
              <h3 className="text-xl text-muted-foreground font-medium mb-1">Backend Architecture</h3>
              <h4 className="text-2xl font-bold text-foreground mb-4">Scalable Systems</h4>
              <div className="flex gap-4">
                <SiGo className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity text-cyan-400" />
                <SiPython className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity text-yellow-500" />
                <SiNodedotjs className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity text-green-500" />
                <SiPostgresql className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity text-blue-400" />
                <SiGraphql className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity text-pink-500" />
              </div>
            </MagicCard>
          </motion.div>

          {/* Card 3: Design (Vertical, Right Middle) - Adjusted to fit grid */}
          <motion.div
            className="md:col-span-1 md:row-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <MagicCard className="p-6 flex flex-col justify-end group">
              <div className="mb-auto">
                <SiFigma className="w-10 h-10 mb-4 opacity-50 group-hover:opacity-100 transition-opacity text-purple-500" />
              </div>
              <h3 className="text-lg text-muted-foreground font-medium">Design</h3>
              <h4 className="text-xl font-bold text-foreground">UI/UX &<br />Motion</h4>
            </MagicCard>
          </motion.div>

          {/* Card 4: Tools (Bottom Left) */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <MagicCard className="p-6 flex flex-col justify-center group">
              <h3 className="text-sm text-muted-foreground font-medium mb-2">DevOps</h3>
              <div className="flex gap-3">
                <SiDocker className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity text-blue-500" />
                <SiGit className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity text-orange-500" />
                <SiSupabase className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity text-emerald-500" />
              </div>
            </MagicCard>
          </motion.div>

          {/* Card 5: Philosophy (Bottom Middle) */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <MagicCard className="p-6 flex items-center justify-between group">
              <div>
                <h3 className="text-lg text-muted-foreground font-medium">Philosophy</h3>
                <p className="text-sm text-foreground/80 mt-1 max-w-xs">Clean Code. User Centric. Performance First.</p>
              </div>
              <div className="font-mono text-xs p-2 rounded bg-primary/10 text-primary border border-primary/20">
                System.Optimized()
              </div>
            </MagicCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
