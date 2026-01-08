import { useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
}

const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const TextScramble = ({ text, className = "", delay = 0 }: TextScrambleProps) => {
  const [displayText, setDisplayText] = useState(text.split("").map(() => chars[Math.floor(Math.random() * chars.length)]).join(""));
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scramble = useCallback(() => {
    let iteration = 0;
    const totalIterations = text.length * 2;
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 2) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration += 1;

      if (iteration >= totalIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timeout = setTimeout(() => {
        scramble();
        setHasAnimated(true);
      }, delay * 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [isInView, hasAnimated, delay, scramble]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3, delay }}
      className={className}
    >
      {displayText}
    </motion.span>
  );
};

export default TextScramble;
