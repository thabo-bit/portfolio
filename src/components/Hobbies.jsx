import { useEffect, useRef } from 'react';
import './Hobbies.css';

const tradingImg =
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2000&q=80';

const chessImg =
  'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&w=2000&q=80';

const HOBBIES = [
  {
    key: 'trading',
    number: '01',
    title: 'Trading',
    tagline: 'Reading markets · managing risk',
    image: tradingImg,
    description:
      'I follow financial markets closely — analysing price action, back-testing ideas, and building a disciplined approach to risk. It taught me patience, pattern recognition, and how to stay calm when things move fast.',
    tags: ['Price Action', 'Risk Management', 'Technical Analysis', 'Discipline'],
    stat: { value: '3+', label: 'Years following markets' },
    align: 'left',
  },
  {
    key: 'chess',
    number: '02',
    title: 'Chess',
    tagline: 'Calculating · planning · executing',
    image: chessImg,
    description:
      'Chess is my daily puzzle. Every game is a lesson in strategy, foresight, and staying three moves ahead. It sharpens the same thinking I use when writing code — plan, test, adapt.',
    tags: ['Strategy', 'Pattern Recognition', 'Patience', 'Foresight'],
    stat: { value: '1200', label: 'Chess.com rating' },
    align: 'right',
  },
];

export default function Hobbies() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    /* reveal */
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          io.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    io.observe(el);

    /* per-block reveal + parallax */
    const blocks = el.querySelectorAll('.hobbies__block');
    const blockIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('is-visible');
        });
      },
      { threshold: 0.15 }
    );
    blocks.forEach((b) => blockIO.observe(b));

    const onScroll = () => {
      blocks.forEach((b) => {
        const r = b.getBoundingClientRect();
        const p = Math.max(-1, Math.min(1,
          (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight
        ));
        b.style.setProperty('--parallax', `${p * 50}px`);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      io.disconnect();
      blockIO.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section id="hobbies" className="hobbies" ref={sectionRef}>
      <div className="hobbies__bg-grid" aria-hidden="true" />
      <div className="hobbies__glow" aria-hidden="true" />

      <div className="hobbies__container">

        {/* ============ HEADER ============ */}
        <header className="hobbies__header">
          <span className="hobbies__index">
            <span className="hobbies__index-num">03</span>
            <span className="hobbies__index-line" />
            <span className="hobbies__index-label">Hobbies</span>
          </span>

          <h2 className="hobbies__headline">
            Off the <span className="hobbies__headline-accent">clock</span>.
          </h2>

          <p className="hobbies__lede">
            Two things that keep me sharp outside of code —
            one trains patience, the other trains foresight.
          </p>
        </header>

        {/* ============ BLOCKS ============ */}
        <div className="hobbies__blocks">
          {HOBBIES.map((h, i) => (
            <article
              key={h.key}
              className={`hobbies__block hobbies__block--${h.key} hobbies__block--${h.align}`}
              style={{ '--i': i }}
            >
              {/* ---------- background image ---------- */}
              <div className="hobbies__bg" aria-hidden="true">
                <img
                  src={h.image}
                  alt=""
                  className="hobbies__bg-img"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="hobbies__bg-tint" />
                <span className="hobbies__bg-grain" />
              </div>

              {/* ---------- giant outlined number behind title ---------- */}
              <span className="hobbies__giant-num" aria-hidden="true">
                {h.number}
              </span>

              {/* ---------- content ---------- */}
              <div className="hobbies__content">
                <span className="hobbies__meta">
                  <span className="hobbies__meta-dot" />
                  Hobby · {h.number}
                </span>

                <h3 className="hobbies__title">{h.title}</h3>
                <p className="hobbies__tagline">{h.tagline}</p>

                <p className="hobbies__desc">{h.description}</p>

                <div className="hobbies__bottom">
                  <div className="hobbies__stat">
                    <span className="hobbies__stat-value">{h.stat.value}</span>
                    <span className="hobbies__stat-label">{h.stat.label}</span>
                  </div>

                  <ul className="hobbies__tags">
                    {h.tags.map((t, j) => (
                      <li
                        key={t}
                        className="hobbies__tag"
                        style={{ '--j': j }}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ---------- corner accents ---------- */}
              <span className="hobbies__corner hobbies__corner--tl" aria-hidden="true" />
              <span className="hobbies__corner hobbies__corner--br" aria-hidden="true" />
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}