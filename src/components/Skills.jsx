import { useEffect, useRef, useState } from 'react';
import './Skills.css';

const CATEGORIES = [
  {
    key: 'frontend',
    label: 'Frontend',
    tag: 'Client-side',
    items: [
      'HTML5', 'CSS3', 'JavaScript', 'TypeScript',
      'React.js', 'React Native', 'Expo',
      'Responsive Web Design', 'Tailwind CSS',
    ],
  },
  {
    key: 'backend',
    label: 'Backend',
    tag: 'Server-side',
    items: ['Java', 'Spring Boot', 'REST APIs', 'Node.js', 'MySQL', 'Firebase'],
  },
  {
    key: 'data',
    label: 'Programming & Data',
    tag: 'Analysis',
    items: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Data Analysis', 'Data Visualization'],
  },
  {
    key: 'tools',
    label: 'Tools & Workflow',
    tag: 'Day-to-day',
    items: ['Git', 'GitHub', 'VS Code', 'Android Studio', 'Postman', 'Vite', 'Axios'],
  },
];

const STATS = [
  { value: 28, suffix: '+', label: 'Technologies',  hint: 'across the stack' },
  { value: 4,  suffix: '',  label: 'Categories',    hint: 'frontend → tools' },
  { value: 12, suffix: '+', label: 'Projects built',hint: 'and counting' },
  { value: 4,  suffix: '',  label: 'In learning',   hint: 'active tracks' },
];

const LEARNING = [
  { name: 'Advanced React',        progress: 62 },
  { name: 'Full-Stack Development', progress: 55 },
  { name: 'Mobile App Development', progress: 48 },
  { name: 'AI Integration',         progress: 35 },
];

function Counter({ to, suffix = '', duration = 1500, start }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, start]);
  return <>{val}{suffix}</>;
}

export default function Skills() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          el.classList.add('is-visible');
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="skills__bg-grid" aria-hidden="true" />
      <span className="skills__bg-word" aria-hidden="true">SKILLS</span>
      <div className="skills__glow" aria-hidden="true" />

      <div className="skills__container">

        {/* ============ HEADER ============ */}
        <header className="skills__header">
          <div className="skills__header-top">
            <span className="skills__index">
              <span className="skills__index-num">02</span>
              <span className="skills__index-line" />
              <span className="skills__index-label">Skills</span>
            </span>
            <span className="skills__index-meta">
              {STATS[0].value}+ technologies · {STATS[1].value} categories
            </span>
          </div>

          <h2 className="skills__headline">
            A stack I use
            <br />
            to <span className="skills__headline-accent">build things</span>.
          </h2>

          <p className="skills__lede">
            An overview of the technologies I work with — grouped by where
            they sit in the stack, from pixel to database.
          </p>
        </header>

        {/* ============ KPI STRIP ============ */}
        <div className="skills__kpis">
          {STATS.map((s, i) => (
            <div key={s.label} className="skills__kpi" style={{ '--i': i }}>
              <div className="skills__kpi-top">
                <span className="skills__kpi-value">
                  <Counter to={s.value} suffix={s.suffix} start={visible} />
                </span>
                <span className="skills__kpi-index">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <span className="skills__kpi-label">{s.label}</span>
              <span className="skills__kpi-hint">{s.hint}</span>
              <span className="skills__kpi-bar" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* ============ CATEGORY GRID ============ */}
        <div className="skills__grid">
          {CATEGORIES.map((cat, i) => (
            <article
              key={cat.key}
              className={`skills__panel skills__panel--${cat.key}`}
              style={{ '--i': i, '--count': cat.items.length }}
            >
              <header className="skills__panel-head">
                <div className="skills__panel-title-group">
                  <span className="skills__panel-tag">{cat.tag}</span>
                  <h3 className="skills__panel-title">{cat.label}</h3>
                </div>
                <span className="skills__panel-count">
                  {String(cat.items.length).padStart(2, '0')}
                </span>
              </header>

              <ul className="skills__chips">
                {cat.items.map((item, j) => (
                  <li
                    key={item}
                    className="skills__chip"
                    style={{ '--j': j }}
                  >
                    <span className="skills__chip-bullet" aria-hidden="true" />
                    <span className="skills__chip-text">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* ============ CURRENTLY LEARNING ============ */}
        <div className="skills__learning">
          <header className="skills__learning-head">
            <span className="skills__learning-label">Currently learning</span>
            <span className="skills__learning-meta">
              {LEARNING.length} active tracks
            </span>
          </header>

          <ul className="skills__learning-list">
            {LEARNING.map((item, i) => (
              <li
                key={item.name}
                className="skills__learning-item"
                style={{ '--i': i, '--p': `${item.progress}%` }}
              >
                <span className="skills__learning-index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="skills__learning-name">{item.name}</span>
                <span className="skills__learning-pct">{item.progress}%</span>
                <span className="skills__learning-bar">
                  <span className="skills__learning-bar-fill" />
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}