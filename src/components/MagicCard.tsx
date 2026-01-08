import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MagicCardProps {
    children: React.ReactNode;
    className?: string;
    gradientSize?: number;
    gradientColor?: string;
    gradientOpacity?: number;
}

const MagicCard = ({
    children,
    className = "",
    gradientSize = 250,
    gradientColor = "hsl(var(--primary))",
    gradientOpacity = 0.3,
}: MagicCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: -gradientSize, y: -gradientSize });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative h-full overflow-hidden rounded-xl bg-card/30 border border-white/10 ${className}`}
        >
            {/* Spotlight for Border/Glow */}
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(${gradientSize}px circle at ${position.x}px ${position.y}px, ${gradientColor}, transparent 100%)`,
                }}
            />

            {/* Content Container (Background needed to hide the full gradient fill, only showing through transparency or border) */}
            <div className="absolute inset-[1px] rounded-xl bg-card/90" />

            {/* Actual Content */}
            <div className="relative h-full z-10">
                {children}
            </div>
        </div>
    );
};

export default MagicCard;
