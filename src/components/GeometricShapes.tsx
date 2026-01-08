import { motion } from "framer-motion";

interface GeometricShapesProps {
  variant?: "hero" | "about" | "work" | "contact" | "skills" | "awards";
}

const GeometricShapes = ({ variant = "hero" }: GeometricShapesProps) => {
  const shapes = {
    hero: [
      { type: "circle", size: 400, x: "80%", y: "20%", opacity: 0.03 },
      { type: "square", size: 200, x: "10%", y: "60%", opacity: 0.02, rotate: 45 },
      { type: "triangle", size: 150, x: "85%", y: "70%", opacity: 0.03 },
      { type: "ring", size: 300, x: "5%", y: "10%", opacity: 0.02 },
    ],
    about: [
      { type: "circle", size: 500, x: "90%", y: "50%", opacity: 0.02 },
      { type: "cross", size: 100, x: "5%", y: "30%", opacity: 0.03 },
    ],
    work: [
      { type: "square", size: 300, x: "95%", y: "10%", opacity: 0.02, rotate: 15 },
      { type: "ring", size: 200, x: "0%", y: "80%", opacity: 0.02 },
    ],
    contact: [
      { type: "circle", size: 600, x: "50%", y: "50%", opacity: 0.02 },
      { type: "triangle", size: 200, x: "10%", y: "20%", opacity: 0.03 },
    ],
    skills: [
      { type: "circle", size: 400, x: "20%", y: "20%", opacity: 0.03 },
      { type: "square", size: 200, x: "80%", y: "60%", opacity: 0.02, rotate: 45 },
    ],
    awards: [
      { type: "circle", size: 400, x: "80%", y: "20%", opacity: 0.03 },
      { type: "square", size: 200, x: "10%", y: "60%", opacity: 0.02, rotate: 45 },
    ],
  };

  const renderShape = (shape: typeof shapes.hero[0], index: number) => {
    const baseProps = {
      className: "absolute pointer-events-none",
      style: { left: shape.x, top: shape.y, opacity: shape.opacity },
      initial: { scale: 0, rotate: 0 },
      animate: {
        scale: 1,
        rotate: shape.rotate || 0,
      },
      transition: {
        duration: 2,
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    };

    switch (shape.type) {
      case "circle":
        return (
          <motion.div
            key={index}
            {...baseProps}
            style={{ ...baseProps.style, width: shape.size, height: shape.size }}
          >
            <motion.div
              className="w-full h-full rounded-full border border-foreground"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        );

      case "square":
        return (
          <motion.div
            key={index}
            {...baseProps}
            style={{ ...baseProps.style, width: shape.size, height: shape.size }}
          >
            <motion.div
              className="w-full h-full border border-foreground"
              animate={{ rotate: [shape.rotate || 0, (shape.rotate || 0) + 360] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        );

      case "triangle":
        return (
          <motion.div
            key={index}
            {...baseProps}
            style={{
              ...baseProps.style,
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid hsl(var(--foreground) / 0.1)`,
            }}
          />
        );

      case "ring":
        return (
          <motion.div
            key={index}
            {...baseProps}
            style={{ ...baseProps.style, width: shape.size, height: shape.size }}
          >
            <motion.div
              className="w-full h-full rounded-full border-2 border-foreground border-dashed"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        );

      case "cross":
        return (
          <motion.div
            key={index}
            {...baseProps}
            style={{ ...baseProps.style, width: shape.size, height: shape.size }}
            className="absolute pointer-events-none"
          >
            <div className="absolute top-1/2 left-0 w-full h-px bg-foreground -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-foreground -translate-x-1/2" />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes[variant].map((shape, index) => renderShape(shape, index))}
    </div>
  );
};

export default GeometricShapes;
