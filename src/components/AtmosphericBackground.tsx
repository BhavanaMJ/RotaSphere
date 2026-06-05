import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  amplitude: number;
  frequency: number;
  timeOffset: number;
  color: string;
  opacity: number;
}

interface CurrentLine {
  y: number;
  speed: number;
  amplitude: number;
  frequency: number;
  phase: number;
  width: number;
  color: string;
  glow: string;
}

export const AtmosphericBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse Movement Tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initialize Layer 4: Floating Particles
    const colors = [
      'rgba(34, 211, 238, ',  // Cyan
      'rgba(14, 165, 233, ',  // Ocean Blue
      'rgba(45, 212, 191, ',  // Teal
      'rgba(168, 85, 247, '   // Purple
    ];

    const particles: Particle[] = [];
    const particleCount = 75;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        speedY: -(Math.random() * 0.4 + 0.1),
        amplitude: Math.random() * 20 + 5,
        frequency: Math.random() * 0.005 + 0.002,
        timeOffset: Math.random() * 1000,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    // Initialize Layer 3: Impact Currents (thin blue energy streams)
    const currents: CurrentLine[] = [
      { y: height * 0.25, speed: 0.001, amplitude: 30, frequency: 0.002, phase: 0, width: 1.5, color: 'rgba(56, 189, 248, 0.08)', glow: 'rgba(14, 165, 233, 0.15)' },
      { y: height * 0.5, speed: 0.0015, amplitude: 40, frequency: 0.0015, phase: Math.PI / 2, width: 1.0, color: 'rgba(34, 211, 238, 0.06)', glow: 'rgba(34, 211, 238, 0.12)' },
      { y: height * 0.75, speed: 0.0008, amplitude: 25, frequency: 0.0025, phase: Math.PI, width: 1.2, color: 'rgba(45, 212, 191, 0.07)', glow: 'rgba(45, 212, 191, 0.15)' },
    ];

    let time = 0;

    // Core Loop
    const render = () => {
      time += 0.5;

      // Smooth mouse interpolation (ease-out)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // --- LAYER 1: Deep Ocean Background ---
      // Shift colors slowly over time
      const gradientShift = Math.sin(time * 0.001) * 15;
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height * 0.2 + gradientShift,
        10,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      // Premium colors strictly matching the prompt: #020617, #081326, #0B1326, #0F172A
      bgGrad.addColorStop(0, '#0f172a'); // Layer 1 top-light
      bgGrad.addColorStop(0.3, '#0b1326');
      bgGrad.addColorStop(0.7, '#081326');
      bgGrad.addColorStop(1, '#020617'); // Abyssal deep

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // --- LAYER 2: Ocean Light Caustics (Sunlight Rays) ---
      // Draw intersecting paths of light
      const rayCount = 4;
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let r = 0; r < rayCount; r++) {
        const rayTime = time * 0.0005 + r * 100;
        const startX = width * (0.2 + r * 0.2) + Math.sin(rayTime * 2) * 50;
        const widthTop = width * 0.08;
        const widthBottom = width * 0.25;

        // Animate opacity looping every 15-20 seconds
        const rayOpacity = (Math.sin(time * 0.004 + r) * 0.5 + 0.5) * 0.06;

        const rayGrad = ctx.createLinearGradient(startX, 0, startX + width * 0.15, height);
        rayGrad.addColorStop(0, `rgba(56, 189, 248, ${rayOpacity * 1.5})`);
        rayGrad.addColorStop(0.4, `rgba(34, 211, 238, ${rayOpacity})`);
        rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(startX - widthTop / 2, 0);
        ctx.lineTo(startX + widthTop / 2, 0);
        ctx.lineTo(startX + width * 0.2 + widthBottom / 2, height);
        ctx.lineTo(startX + width * 0.2 - widthBottom / 2, height);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // --- LAYER 3: Impact Currents (Thin glowing energy streams) ---
      ctx.save();
      currents.forEach((current) => {
        current.phase += current.speed;

        ctx.beginPath();
        ctx.strokeStyle = current.color;
        ctx.lineWidth = current.width;
        ctx.shadowColor = current.glow;
        ctx.shadowBlur = 15;

        for (let x = 0; x <= width; x += 10) {
          const y = current.y + Math.sin(x * current.frequency + current.phase) * current.amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Draw glowing energy nodes traversing along the currents
        const nodeProgress = (time * current.speed * 200) % width;
        const nodeY = current.y + Math.sin(nodeProgress * current.frequency + current.phase) * current.amplitude;

        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#0ea5e9';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(nodeProgress, nodeY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // --- LAYER 4: Floating Particles (with mouse repeller physics) ---
      particles.forEach((p) => {
        // Vertical movement
        p.y += p.speedY;

        // Horizontal sway using sine waves
        const sway = Math.sin((time + p.timeOffset) * p.frequency) * 0.3;
        p.x += sway;

        // Reset if goes off top or sides
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Mouse interaction (repel effect)
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const maxDist = 140;

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist; // 0 to 1
            const angle = Math.atan2(dy, dx);
            const pushX = Math.cos(angle) * force * 1.8;
            const pushY = Math.sin(angle) * force * 1.8;

            p.x += pushX;
            p.y += pushY;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Add small bubble glow
        if (p.radius > 1.8) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.arc(p.x, p.y, p.radius + 2, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
export default AtmosphericBackground;
