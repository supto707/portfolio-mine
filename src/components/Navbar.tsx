import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "HOME", href: "#hero" },
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "CONTACT", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar after scrolling past hero section (approx 100vh)
      if (currentScrollY > window.innerHeight * 0.8) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 backdrop-blur-md border-b border-foreground/5"
          >
            <nav className="flex items-center justify-between max-w-7xl mx-auto">
              <a href="#hero" className="text-lg font-black uppercase tracking-tighter">
                SUPTO.DEV
              </a>

              {/* Menu Button (Visible on all screens) */}
              <button
                onClick={() => setIsOpen(true)}
                className="font-mono text-xs tracking-widest flex items-center gap-2 hover:text-primary transition-colors group"
              >
                <div className="flex flex-col gap-1 items-end">
                  <span className="w-6 h-[1px] bg-foreground group-hover:w-8 transition-all duration-300" />
                  <span className="w-4 h-[1px] bg-foreground group-hover:w-8 transition-all duration-300 delay-75" />
                </div>
                MENU
              </button>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Full Screen Staggered Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 md:top-12 md:right-12 font-mono text-sm tracking-widest flex items-center gap-2 hover:text-primary transition-colors"
            >
              CLOSE <X className="w-5 h-5" />
            </button>

            <nav className="flex flex-col items-start gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 50, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative group overflow-hidden"
                >
                  <button
                    onClick={() => handleClick(link.href)}
                    className="relative text-5xl md:text-8xl font-black uppercase tracking-tighter hover-stroke-text transition-all duration-300"
                  >
                    <span className="inline-block" data-text={link.label}>
                      {link.label}
                    </span>
                  </button>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="absolute -top-2 -right-6 md:-right-8 font-mono text-sm md:text-base text-primary/80"
                  >
                    0{index + 1}
                  </motion.span>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 flex gap-8"
            >
              <div className="flex flex-col gap-2 font-mono text-xs text-muted-foreground text-center">
                <span>GET IN TOUCH</span>
                <a href="mailto:main.supto@gmail.com" className="text-foreground hover:text-primary transition-colors">
                  main.supto@gmail.com
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
