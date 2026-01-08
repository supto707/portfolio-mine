import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Trophy, Award } from "lucide-react";
import GeometricShapes from "../GeometricShapes";

const awards = [
    {
        title: "Creative Talent Exploration Competition 2024",
        category: "Mathematics and Computer",
        position: "1st (Rangpur Division)",
        icon: Trophy,
        color: "from-yellow-400 to-orange-500",
    },
    {
        title: "ICT Olympiad Bangladesh 2023",
        category: "Computer",
        position: "1st (Rangpur Division)",
        icon: Award,
        color: "from-blue-400 to-indigo-500",
    },
];

const AwardsSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const headerY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [30, 0, 0, -30]);

    return (
        <section ref={containerRef} id="awards" className="relative py-24 px-6 md:px-12 bg-background overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
            <GeometricShapes variant="skills" /> {/* Reuse skills shapes for variety */}

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.span
                    style={{ opacity: headerOpacity, y: headerY }}
                    className="font-mono text-xs tracking-[0.3em] text-muted-foreground"
                >
          // RECOGNITION
                </motion.span>

                <motion.h2
                    style={{ opacity: headerOpacity, y: headerY }}
                    className="mt-4 text-3xl md:text-4xl font-black uppercase tracking-tighter mb-16"
                >
                    AWARD RECIPIENT
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {awards.map((award, index) => {
                        const cardRef = useRef(null);
                        const { scrollYProgress: cardProgress } = useScroll({
                            target: cardRef,
                            offset: ["start end", "end start"]
                        });

                        const y = useTransform(cardProgress, [0, 1], [100, -50]);
                        const opacity = useTransform(cardProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

                        return (
                            <motion.div
                                key={index}
                                ref={cardRef}
                                style={{ y, opacity }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" />
                                <div className="relative p-8 rounded-2xl border border-foreground/10 bg-card hover:border-primary/30 transition-colors duration-300 h-full flex flex-col justify-between overflow-hidden">

                                    {/* Decorative gradient corner */}
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${award.color} opacity-10 blur-3xl rounded-full transform translate-x-10 -translate-y-10 group-hover:opacity-20 transition-opacity duration-500`} />

                                    <div>
                                        <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <award.icon className="w-6 h-6 text-foreground" />
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                                            {award.position}
                                        </h3>
                                        <p className="font-mono text-xs tracking-wider text-muted-foreground mb-4 uppercase">
                                            {award.category}
                                        </p>

                                        <div className="h-px w-12 bg-foreground/10 mb-4 group-hover:w-full group-hover:bg-primary/30 transition-all duration-500" />

                                        <p className="text-lg font-medium leading-relaxed">
                                            {award.title}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AwardsSection;
