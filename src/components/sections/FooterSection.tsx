import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Twitter, Dribbble } from "lucide-react";
import { useState, useEffect } from "react";
import MagneticWrapper from "../MagneticWrapper";

const FooterSection = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
    { icon: Github, label: "GitHub", href: "https://github.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: Dribbble, label: "Dribbble", href: "https://dribbble.com" },
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <footer className="py-12 px-6 md:px-12 border-t border-foreground/10 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left - Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-xl font-black uppercase tracking-tighter">SUPTO.DEV</p>
            <p className="font-mono text-xs text-muted-foreground mt-1">
              Building thoughtful digital experiences
            </p>
          </motion.div>

          {/* Center - Time & Location */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <p className="font-mono text-lg text-primary">{formatTime(currentTime)}</p>
            <p className="font-mono text-xs text-muted-foreground mt-1 tracking-wider">
              LOCAL TIME — RANGPUR, BD
            </p>
          </motion.div>

          {/* Right - Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-end gap-4"
          >
            <MagneticWrapper strength={0.4}>
              <a href="https://github.com/codewithsupto" target="_blank" rel="noopener noreferrer" className="group p-3 rounded-full border border-foreground/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                <Github className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </a>
            </MagneticWrapper>
            <MagneticWrapper strength={0.4}>
              <a href="https://www.linkedin.com/in/codewithsupto/" target="_blank" rel="noopener noreferrer" className="group p-3 rounded-full border border-foreground/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </a>
            </MagneticWrapper>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="font-mono text-xs tracking-widest text-muted-foreground">
            DESIGNED & CODED BY SADMAN AREFIN SUPTO © 2026
          </p>

          <MagneticWrapper strength={0.3}>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors group"
            >
              BACK TO TOP
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </MagneticWrapper>
        </motion.div>

        {/* Technical Credit */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center font-mono text-[10px] text-muted-foreground/40 mt-8"
        >
          // I care about details until the end
        </motion.p>
      </div>
    </footer>
  );
};

export default FooterSection;
