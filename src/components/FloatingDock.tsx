import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, Code, Clock, GraduationCap, Mail, Menu, X } from "lucide-react";

const dockItems = [
  { icon: Home, label: "HOME", href: "#hero" },
  { icon: User, label: "ABOUT", href: "#about" },
  { icon: Briefcase, label: "PROJECTS", href: "#work" },
  { icon: Code, label: "SKILLS", href: "#skills" },
  { icon: Clock, label: "EXPERIENCE", href: "#experience" },
  { icon: GraduationCap, label: "EDUCATION", href: "#education" },
  { icon: Mail, label: "CONTACT", href: "#contact" },
];

const FloatingDock = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show dock after scrolling past hero section
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mobile Toggle */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(!isOpen)}
            className="fixed bottom-6 right-6 z-50 md:hidden w-12 h-12 rounded-full glass flex items-center justify-center"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Dock - Centered */}
      <AnimatePresence>
        {isVisible && isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: 100, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 100, x: "-50%" }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
            className="fixed bottom-6 left-1/2 z-50"
          >
            <div className="glass rounded-full px-2 py-2 flex items-center gap-1">
              {dockItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleClick(item.href)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative p-3 rounded-full hover:bg-foreground/5 transition-colors"
                  whileHover={{ scale: 1.2, y: -8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <item.icon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                  
                  {/* Label */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-md glass font-mono text-[10px] tracking-wider whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingDock;
