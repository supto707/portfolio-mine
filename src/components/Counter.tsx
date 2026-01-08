import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface CounterProps {
    from?: number;
    to: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
    className?: string;
}

const Counter = ({
    from = 0,
    to,
    duration = 2,
    suffix = "",
    prefix = "",
    decimals = 0,
    className = ""
}: CounterProps) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(nodeRef, { once: true, margin: "-50px" });

    useEffect(() => {
        if (inView) {
            const node = nodeRef.current;
            const controls = animate(from, to, {
                duration,
                ease: "easeOut",
                onUpdate(value) {
                    if (node) {
                        node.textContent = prefix + value.toFixed(decimals) + suffix;
                    }
                },
            });
            return () => controls.stop();
        }
    }, [inView, from, to, duration, suffix, prefix, decimals]);

    // Initial render state
    return <span ref={nodeRef} className={className}>{prefix}{from.toFixed(decimals)}{suffix}</span>;
};

export default Counter;
