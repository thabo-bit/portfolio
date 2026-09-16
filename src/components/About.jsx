import { useEffect, useRef, useState } from 'react';
import './About.css';

const SERVICES = [
  { n: '01', title: 'Web Development',        desc: 'Responsive, accessible sites built to last.' },
  { n: '02', title: 'Full-Stack Development', desc: 'Front to back — from UI to API to database.' },
  { n: '03', title: 'API Development',        desc: 'REST endpoints, integrations & third-party services.' },
  { n: '04', title: 'Database Development',   desc: 'Schema design, queries, and data modelling.' },
];

const TIMELINE = [
  { year: '2022', title: 'Started learning to code', text: 'First lines of HTML, CSS, and JavaScript.' },
  { year: '2023', title: 'Built my first projects',  text: 'Small apps, landing pages, and a lot of debugging.' },
  { year: '2024', title: 'Went full-stack',          text: 'Added Node, Express, and database work.' },
  { year: '2025', title: 'Studying ICT & shipping',  text: 'Balancing coursework with real-world builds.' },
];

const TOOLS = [
  'React', 'JavaScript', 'Node.js', 'Express', 'MongoDB',
  'MySQL', 'Tailwind', 'Git', 'REST APIs', 'Vite',
];

const FOCUS = ['Full-stack development', 'React', 'Backend systems', 'UI/UX'];

/* rotating roles that type under the headline */
const TYPE_WORDS = [
  'a Software Developer',
  'a Full-Stack Developer',
  'a Problem Solver',
  'a Builder',
];

/* ---------------- typing hook ---------------- */
function useTyping(words, { typeSpeed = 75, deleteSpeed = 40, pause = 1500 } = {}) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        const next = isDeleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1);
        setText(next);
      }, isDeleting ? deleteSpeed : typeSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

export default function About() {
  const sectionRef = useRef(null);
  const typed = useTyping(TYPE_WORDS);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1,
        (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight
      ));
      el.style.setProperty('--parallax', `${progress * 40}px`);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about__grid-bg" aria-hidden="true" />
      <span className="about__bg-word" aria-hidden="true">ABOUT</span>
      <div className="about__glow" aria-hidden="true" />

      <span className="about__corner about__corner--tl" aria-hidden="true" />
      <span className="about__corner about__corner--br" aria-hidden="true" />

      <div className="about__container">

        {/* ---------- section index ---------- */}
        <header className="about__index">
          <span className="about__index-num">01</span>
          <span className="about__index-line" />
          <span className="about__index-label">About</span>
        </header>

        {/* ---------- main grid ---------- */}
        <div className="about__main">

          {/* LEFT COLUMN */}
          <div className="about__left">

            {/* big title + typing subtitle */}
            <div className="about__intro-block">
              <h2 className="about__greeting">
                <span className="about__greeting-hi">Hi, I&rsquo;m</span>{' '}
                <span className="about__greeting-name">Richard</span>
                <span className="about__greeting-dot">.</span>
              </h2>

              <p className="about__typing-line">
                <span className="about__typing-prefix">I&rsquo;m</span>
                <span className="about__typed">{typed}</span>
                <span className="about__caret" aria-hidden="true" />
              </p>
            </div>

            <p className="about__lede">
              I build modern web applications and digital experiences —
              turning ideas into practical, user-friendly products. I care
              about clean code, thoughtful design, and software that actually
              works for the people using it.
            </p>

            <div className="about__focus">
              <span className="about__focus-label">Currently focused on</span>
              <ul className="about__focus-list">
                {FOCUS.map((f) => (
                  <li key={f}>
                    <span className="about__focus-dot" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="about__right">

            <div className="about__section">
              <span className="about__side-label">What I do</span>
              <ul className="about__services">
                {SERVICES.map((s, i) => (
                  <li key={s.n} className="about__service" style={{ '--i': i }}>
                    <span className="about__service-num">{s.n}</span>
                    <div className="about__service-body">
                      <h3 className="about__service-title">{s.title}</h3>
                      <p className="about__service-desc">{s.desc}</p>
                    </div>
                    <span className="about__service-line" aria-hidden="true" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="about__section">
              <span className="about__side-label">The journey</span>
              <ol className="about__timeline">
                {TIMELINE.map((t) => (
                  <li key={t.year} className="about__timeline-item">
                    <span className="about__timeline-year">{t.year}</span>
                    <span className="about__timeline-marker" aria-hidden="true" />
                    <div className="about__timeline-body">
                      <h4 className="about__timeline-title">{t.title}</h4>
                      <p className="about__timeline-text">{t.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <blockquote className="about__quote">
              <span className="about__quote-mark" aria-hidden="true">&ldquo;</span>
              <p>Build it. Test it. Improve it.</p>
              <footer className="about__quote-foot">
                My approach to every project — good software should be
                intuitive, responsive, and designed around the people who use it.
              </footer>
            </blockquote>

          </div>
        </div>

        {/* ---------- tool marquee ---------- */}
        <div className="about__marquee" aria-hidden="true">
          <div className="about__marquee-track">
            {[...TOOLS, ...TOOLS].map((tool, i) => (
              <span key={i} className="about__marquee-item">
                {tool}
                <span className="about__marquee-dot" />
              </span>
            ))}
          </div>
        </div>

        {/* ---------- footer facts + map ---------- */}
        <div className="about__facts-row">
          <div className="about__location">
            <div className="about__map">
              <svg viewBox="0 0 120 140" className="about__map-svg" aria-hidden="true">
                <path
                  d="M42 8 L70 6 L92 18 L100 40 L112 58 L104 78 L96 100 L84 122
                     L62 132 L44 128 L28 116 L20 96 L12 74 L18 52 L24 32 L34 18 Z"
                  fill="rgba(249, 115, 22, 0.06)"
                  stroke="rgba(249, 115, 22, 0.45)"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
                <g className="about__map-pin-group">
                  <circle cx="62" cy="72" r="4" fill="none"
                    stroke="rgba(249, 115, 22, 0.6)" strokeWidth="1"
                    className="about__map-pulse about__map-pulse--1" />
                  <circle cx="62" cy="72" r="4" fill="none"
                    stroke="rgba(249, 115, 22, 0.4)" strokeWidth="1"
                    className="about__map-pulse about__map-pulse--2" />
                  <circle cx="62" cy="72" r="3.2" fill="#f97316"
                    className="about__map-dot" />
                  <circle cx="62" cy="72" r="1.2" fill="#0e0e10" />
                </g>
                <text x="62" y="96" textAnchor="middle"
                  fontSize="7" fill="#fdba74"
                  fontFamily="Space Grotesk, sans-serif"
                  letterSpacing="0.5">
                  Kimberley
                </text>
              </svg>
            </div>

            <div className="about__location-meta">
              <span className="about__facts-label">Based in</span>
              <span className="about__facts-value">Kimberley, South Africa</span>
              <span className="about__facts-sub">Northern Cape · SAST (UTC+2)</span>
            </div>
          </div>

          <div className="about__facts-item">
            <span className="about__facts-label">Currently</span>
            <span className="about__facts-value">ICT Student</span>
          </div>
        </div>

      </div>
    </section>
  );
}