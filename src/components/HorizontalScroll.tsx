import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

const HorizontalScroll = ({ children, className = "" }: HorizontalScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (containerRef.current) {
      const scrollContainer = containerRef.current.querySelector(".scroll-content");
      if (scrollContainer) {
        setContainerWidth(window.innerWidth);
        setScrollWidth(scrollContainer.scrollWidth);
      }
    }
  }, [children]);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(scrollWidth - containerWidth)]
  );

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: `${scrollWidth}px` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="scroll-content flex gap-8 pl-6 md:pl-12">
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
