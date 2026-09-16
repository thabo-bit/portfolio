import { useEffect, useRef, useState } from 'react';
import heroImg from '../assets/hero.png';
import './Hero.css';

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      setMouse({ x, y });
    };
    const onLeave = () => setMouse({ x: 0, y: 0 });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section id="home" className="hero" ref={sectionRef}>
      <div
        className="hero__glow hero__glow--orange"
        aria-hidden="true"
        style={{ transform: `translate3d(${mouse.x * 40}px, ${mouse.y * 40}px, 0)` }}
      />
      <div
        className="hero__glow hero__glow--blue"
        aria-hidden="true"
        style={{ transform: `translate3d(${mouse.x * -40}px, ${mouse.y * -40}px, 0)` }}
      />

      <div className="container hero__inner">
        <div className="hero__text">
          <h1 className="hero__title">
            <span className="hero__line hero__line--1">Hi, I&rsquo;m</span>
            <span className="hero__line hero__line--2">
              <span className="hero__name">Richard</span>
            </span>
            <span className="hero__line hero__line--3">
              I build <span className="hero__accent">digital experiences</span>.
            </span>
          </h1>

          <p className="hero__subtitle">
            Developer focused on crafting clean, performant web apps
            and capturing moments that matter.
            Based in South Africa — working worldwide.
          </p>

          <div className="hero__actions">
            <a href="#projects" className="hero__btn hero__btn--primary">
              <span>View my work</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14m0 0-5-5m5 5-5 5"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contact" className="hero__btn hero__btn--ghost">
              Get in touch
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <div
            className="hero__portrait"
            style={{ transform: `translate3d(${mouse.x * -18}px, ${mouse.y * -18}px, 0)` }}
          >
            <div className="hero__portrait-ring" aria-hidden="true" />
            <img
              src={heroImg}
              alt="Portrait of Richard"
              className="hero__portrait-img"
              loading="eager"
            />
          </div>
        </div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll down">
        <span className="hero__scroll-text">Scroll</span>
        <span className="hero__scroll-line" />
      </a>
    </section>
  );
}