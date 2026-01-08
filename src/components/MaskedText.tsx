import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MaskedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const MaskedText = ({ children, className = "", delay = 0 }: MaskedTextProps) => {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default MaskedText;
