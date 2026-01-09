import { motion } from "framer-motion";
import MagneticWrapper from "./MagneticWrapper";

interface LiquidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline";
  className?: string;
}

const LiquidButton = ({ children, onClick, variant = "primary", className = "" }: LiquidButtonProps) => {
  return (
    <MagneticWrapper strength={0.2}>
      <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.95 }}
        className={`
          relative overflow-hidden group
          px-8 py-4 rounded-full font-medium
          transition-colors duration-500
          ${variant === "primary"
            ? "bg-foreground text-background hover:text-background"
            : "border border-foreground/20 text-foreground hover:border-foreground/50"
          }
          ${className}
        `}
      >
        {/* Liquid Fill Effect */}
        {variant === "primary" && (
          <motion.span
            className="absolute inset-0 bg-primary"
            initial={{ y: "100%" }}
            whileHover={{ y: "0%" }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          />
        )}

        {/* Ripple on Click */}
        <motion.span
          className="absolute inset-0 pointer-events-none"
          whileTap={{
            background: [
              "radial-gradient(circle at center, hsl(var(--primary) / 0.3) 0%, transparent 0%)",
              "radial-gradient(circle at center, hsl(var(--primary) / 0) 0%, transparent 100%)",
            ],
          }}
          transition={{ duration: 0.5 }}
        />

        <span className="relative z-10 flex items-center gap-3">
          {children}
        </span>
      </motion.button>
    </MagneticWrapper>
  );
};

export default LiquidButton;
