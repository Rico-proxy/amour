import { useEffect, useRef } from 'react';

export function AmbientCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const particles = Array.from({ length: 45 }, () => ({ x: Math.random() * width, y: Math.random() * height, r: Math.random() * 2.2 + 0.8, alpha: Math.random() * 0.45 + 0.15, vy: -(Math.random() * 0.35 + 0.08) }));
    const resize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    let frame = 0;
    const animate = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.y += particle.vy;
        if (particle.y < -8) particle.y = height + 8;
        context.save();
        context.globalAlpha = particle.alpha;
        context.fillStyle = '#e89cae';
        context.beginPath();
        context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        context.fill();
        context.restore();
      });
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-50" />;
}
