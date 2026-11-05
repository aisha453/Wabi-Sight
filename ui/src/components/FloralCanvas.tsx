import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  type: 'petal' | 'leaf' | 'pollen' | 'spore';
  color: string;
  angle: number;
  angularSpeed: number;
  speedX: number;
  speedY: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
}

export const FloralCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track gentle mouse breeze
    let mouseX = width / 2;
    let mouseY = height / 2;
    let windForce = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouseX;
      windForce = Math.max(-1.5, Math.min(1.5, dx * 0.05));
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Natural floral palette: soft sakura pink, jasmine white, leaf emerald, marigold amber, honeysuckle
    const petalColors = ['#fbcfe8', '#f472b6', '#fda4af', '#fecdd3', '#fff1f2'];
    const leafColors = ['#86efac', '#4ade80', '#22c55e', '#34d399', '#6ee7b7'];
    const pollenColors = ['#fbbf24', '#f59e0b', '#fde047', '#fcd34d', '#38bdf8'];

    // Spawn 42 organic particles (drifting petals, swaying leaves, glowing pollen)
    const particles: Petal[] = Array.from({ length: 42 }).map(() => {
      const r = Math.random();
      const type: Petal['type'] = r < 0.45 ? 'petal' : r < 0.75 ? 'leaf' : 'pollen';
      const color =
        type === 'petal'
          ? petalColors[Math.floor(Math.random() * petalColors.length)]
          : type === 'leaf'
          ? leafColors[Math.floor(Math.random() * leafColors.length)]
          : pollenColors[Math.floor(Math.random() * pollenColors.length)];

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'pollen' ? 1.5 + Math.random() * 2 : 5 + Math.random() * 8,
        type,
        color,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.03,
        speedX: -0.4 + Math.random() * 0.8,
        speedY: type === 'pollen' ? -0.2 + Math.random() * 0.4 : 0.5 + Math.random() * 0.9,
        flip: Math.random() * Math.PI,
        flipSpeed: 0.02 + Math.random() * 0.03,
        opacity: 0.35 + Math.random() * 0.55
      };
    });

    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;
      windForce *= 0.96; // Decay mouse wind impulse

      particles.forEach((p) => {
        // Natural wind drift with gentle sinusoidal sway
        const naturalSway = Math.sin(time + p.y * 0.01) * 0.6;
        p.x += p.speedX + naturalSway + windForce;
        p.y += p.speedY;
        p.angle += p.angularSpeed;
        p.flip += p.flipSpeed;

        // Wrap around boundaries seamlessly
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.y < -20) {
          p.y = height + 20;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(Math.cos(p.flip), 1);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'pollen') {
          // Soft glowing golden pollen/dew orb
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.size * 5;
          ctx.fill();
        } else if (p.type === 'petal') {
          // Curved organic flower petal
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.3);
          ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.5, p.size * 0.7, p.size * 0.9, 0, p.size * 1.3);
          ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.9, -p.size * 0.9, -p.size * 0.5, 0, -p.size * 1.3);
          ctx.fillStyle = p.color;
          ctx.shadowColor = 'rgba(251, 113, 133, 0.4)';
          ctx.shadowBlur = 6;
          ctx.fill();
        } else {
          // Slender willow / fern leaf
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.4);
          ctx.quadraticCurveTo(p.size * 0.7, 0, 0, p.size * 1.4);
          ctx.quadraticCurveTo(-p.size * 0.7, 0, 0, -p.size * 1.4);
          ctx.fillStyle = p.color;
          ctx.shadowColor = 'rgba(74, 222, 128, 0.4)';
          ctx.shadowBlur = 6;
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
};
