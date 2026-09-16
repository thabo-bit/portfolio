import { useEffect, useRef } from 'react';
import './Starfield.css';

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width  = window.innerWidth;
    let height = window.innerHeight;
    let stars  = [];
    let rafId;

    const mouse = { x: width / 2, y: height / 2, active: false };

    const PALETTE = [
      'rgba(255,255,255,',
      'rgba(255,255,255,',
      'rgba(255,255,255,',
      'rgba(253,186,116,',
      'rgba(147,197,253,',
    ];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width  = window.innerWidth;
      height = window.innerHeight;
      canvas.width  = width  * dpr;
      canvas.height = height * dpr;
      canvas.style.width  = width  + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    }

    function buildStars() {
      const count = Math.min(Math.floor((width * height) / 9000), 220);
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 0.9 + 0.1,
          r: Math.random() * 1.4 + 0.4,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        });
      }
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }
    function onLeave() {
      mouse.active = false;
    }

    function draw() {
      ctx.fillStyle = 'rgba(14, 14, 16, 0.35)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        if (mouse.active) {
          const dx = s.x - mouse.x;
          const dy = s.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const radius = 220;
          const radiusSq = radius * radius;

          if (distSq < radiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / radius) * s.z * 1.2;
            s.x += (dx / dist) * force;
            s.y += (dy / dist) * force;
          }
        }

        s.x += (s.z - 0.5) * 0.06;
        s.y += (s.z - 0.5) * 0.06;

        if (s.x < -10) s.x = width  + 10;
        if (s.x > width  + 10) s.x = -10;
        if (s.y < -10) s.y = height + 10;
        if (s.y > height + 10) s.y = -10;

        s.twinkle += s.twinkleSpeed;
        const twinkleAlpha = 0.5 + Math.sin(s.twinkle) * 0.4;
        const alpha = twinkleAlpha * s.z;

        ctx.beginPath();
        ctx.fillStyle = s.color + alpha.toFixed(3) + ')';
        ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}