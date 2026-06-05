import React, { useEffect, useState, useRef } from 'react';

interface MetricCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

export const MetricCounter: React.FC<MetricCounterProps> = ({ value, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number | null = null;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Ease-out expo function for bubble-up deceleration feel
      const easeOutExpo = (x: number): number => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      };

      const currentCount = Math.floor(easeOutExpo(percentage) * value);
      setCount(currentCount);

      if (progress < duration) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animateCount);
  }, [value, duration, hasAnimated]);

  return (
    <span ref={elementRef} className="font-mono text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-accent-cyan glow-text-cyan">
      {count.toLocaleString()}{suffix}
    </span>
  );
};
export default MetricCounter;
