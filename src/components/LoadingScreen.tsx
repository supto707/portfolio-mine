import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
    onComplete?: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsComplete(true);
            onComplete?.();
        }, 3000); // 3 seconds total animation

        return () => clearTimeout(timer);
    }, [onComplete]);

    const containerVariants = {
        hidden: { opacity: 1 },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: "easeInOut" as const,
            },
        },
    };

    const textVariants = {
        hidden: {
            y: 100,
            opacity: 0,
            scale: 0.8,
        },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                delay: i * 0.15,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as const,
            },
        }),
    };

    const glitchVariants = {
        initial: { x: 0 },
        animate: {
            x: [0, -5, 5, -3, 3, 0],
            transition: {
                duration: 0.5,
                repeat: 2,
                delay: 1.5,
            },
        },
    };

    const progressVariants = {
        initial: { scaleX: 0 },
        animate: {
            scaleX: 1,
            transition: {
                duration: 2.5,
                ease: "easeInOut" as const,
            },
        },
    };

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    exit="exit"
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
                >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

                    {/* Animated grid lines */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <motion.div
                            className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.5, delay: 0.3 }}
                        />
                        <motion.div
                            className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                        />
                    </div>

                    {/* Main text */}
                    <div className="relative z-10 text-center overflow-hidden">
                        <motion.div
                            variants={glitchVariants}
                            initial="initial"
                            animate="animate"
                        >
                            <div className="overflow-hidden">
                                <motion.span
                                    custom={0}
                                    initial="hidden"
                                    animate="visible"
                                    variants={textVariants}
                                    className="block text-[20vw] md:text-[15vw] font-black uppercase tracking-[-0.06em] leading-[0.8] relative"
                                >
                                    <motion.span
                                        className="inline-block"
                                        animate={{
                                            color: [
                                                "hsl(var(--foreground))",
                                                "hsl(var(--primary))",
                                                "hsl(var(--foreground))",
                                            ],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        SUPTO
                                    </motion.span>
                                </motion.span>
                            </div>
                            <div className="overflow-hidden">
                                <motion.span
                                    custom={1}
                                    initial="hidden"
                                    animate="visible"
                                    variants={textVariants}
                                    className="block text-[20vw] md:text-[15vw] font-black uppercase tracking-[-0.06em] leading-[0.8] text-stroke-thick"
                                    style={{
                                        WebkitTextStroke: "3px hsl(var(--foreground))",
                                        color: "transparent",
                                    }}
                                >
                                    .DEV
                                </motion.span>
                            </div>
                        </motion.div>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                            className="mt-8 font-mono text-xs md:text-sm tracking-[0.3em] text-muted-foreground"
                        >
                            <motion.span
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                //
                            </motion.span>{" "}
                            To the FUTURE
                        </motion.p>
                    </div>

                    {/* Progress bar */}
                    <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-foreground/5">
                        <motion.div
                            variants={progressVariants}
                            initial="initial"
                            animate="animate"
                            className="h-full bg-primary origin-left"
                        />
                    </motion.div>

                    {/* Corner accents */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-primary/30"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-primary/30"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-primary/30"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-primary/30"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
