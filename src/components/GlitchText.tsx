import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/";

interface GlitchTextProps {
    text: string;
    className?: string;
    hover?: boolean;
    once?: boolean;
}

const GlitchText = ({ text, className = "", hover = true, once = false }: GlitchTextProps) => {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [hasAnimated, setHasAnimated] = useState(false);

    const scramble = () => {
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText((prev) =>
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 3;
        }, 30);
    };

    useEffect(() => {
        if (isInView && !hasAnimated && !hover) {
            scramble();
            if (once) setHasAnimated(true);
        }
    }, [isInView, hasAnimated, hover, once]);

    const handleMouseEnter = () => {
        if (hover) scramble();
    };

    return (
        <motion.span
            ref={ref}
            className={`inline-block whitespace-nowrap ${className}`}
            onMouseEnter={handleMouseEnter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {displayText}
        </motion.span>
    );
};

export default GlitchText;
