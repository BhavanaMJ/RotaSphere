import React, { useRef, useState } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState('rotateX(0deg) rotateY(0deg) translateY(0px)');
  const [reflectionStyle, setReflectionStyle] = useState({ opacity: 0, x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (max 6 degrees)
    const rotateX = ((centerY - y) / centerY) * 6; // Tilt up/down
    const rotateY = ((x - centerX) / centerX) * 6; // Tilt left/right

    setTransformStyle(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`);

    // Reflection overlay follow mouse
    setReflectionStyle({
      opacity: 0.12,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('rotateX(0deg) rotateY(0deg) translateY(0px)');
    setReflectionStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: transformStyle,
        perspective: 1000,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s, border-color 0.4s'
      }}
      className={`submerged-glass relative overflow-hidden rounded-2xl p-6 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Glare/Reflection Layer */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: reflectionStyle.opacity,
          background: `radial-gradient(circle at ${reflectionStyle.x}% ${reflectionStyle.y}%, rgba(255, 255, 255, 0.35) 0%, transparent 60%)`,
        }}
      />
      
      {/* Submerged Inner Depth Shadow Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
      
      {/* Glow border ring */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Content wrapper with translateZ to push contents out for 3D effect */}
      <div style={{ transform: 'translateZ(20px)' }} className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
