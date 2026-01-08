import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const FloatingParticles = ({ count = 20 }: { count?: number }) => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Larger floating shapes */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute border border-primary/10 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 20}%`,
            width: 100 + i * 30,
            height: 100 + i * 30,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 25 + i * 5,
            delay: i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Glowing orbs */}
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
          left: "10%",
          top: "20%",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
          right: "15%",
          bottom: "30%",
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          delay: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default FloatingParticles;
