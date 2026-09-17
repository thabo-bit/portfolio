import { useEffect, useRef } from 'react';
import './Services.css';

const WEBSITES = [
  {
    key: 'onepage',
    badge: 'Starter',
    title: 'One-Page Website',
    price: 'R900',
    tagline: 'Perfect for freelancers, professionals, and small businesses.',
    features: [
      'Professional one-page design',
      'About / services section',
      'Contact & WhatsApp button',
      'Mobile-friendly, responsive',
      'Modern layout',
      'Deployed & live',
    ],
    highlight: false,
  },
  {
    key: 'business',
    badge: 'Most popular',
    title: 'Business Website',
    price: 'R1,600',
    tagline: 'A complete multi-page site for growing businesses.',
    features: [
      'Multiple pages (Home, About, Services, Contact)',
      'Image / gallery sections',
      'WhatsApp & contact integration',
      'API integration',
      'Modern UI/UX',
      'Fully responsive',
      'SEO-ready',
      'Contact forms & lead capture',
      'Admin dashboard',
      'Content management',
      'Form submission management',
      'Basic analytics',
      'Deployed & live',
    ],
    highlight: true,
  },
];

const SERVICES = [
  {
    n: '01',
    title: 'Web App Development',
    desc: 'Custom web applications tailored to your business — from front-end interfaces to back-end logic and everything between.',
    tags: ['React', 'Node.js', 'REST APIs', 'Auth', 'Dashboards'],
    price: 'Custom quote',
  },
  {
    n: '02',
    title: 'Mobile App Development',
    desc: 'Cross-platform mobile apps built for Android and beyond — clean UI, real functionality.',
    tags: ['React Native', 'Expo', 'Firebase', 'APIs', 'Testing'],
    price: 'Custom quote',
  },
  {
    n: '03',
    title: 'Database Development',
    desc: 'Database design and integration for websites and applications — structured, scalable, reliable.',
    tags: ['MySQL', 'Schema Design', 'CRUD', 'Relationships'],
    price: 'Custom quote',
  },
  {
    n: '04',
    title: 'API Development',
    desc: 'REST APIs that connect your services, applications, and data — built and integrated cleanly.',
    tags: ['REST', 'Integration', 'Auth', 'Backend'],
    price: 'Custom quote',
  },
  {
    n: '05',
    title: 'UI/UX & Front-End',
    desc: 'Modern, responsive interfaces designed around real people and real usability.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Responsive'],
    price: 'Custom quote',
  },
  {
    n: '06',
    title: 'Maintenance & Updates',
    desc: 'Already have a site? I keep it fast, updated, and free of bugs — or add new features as you grow.',
    tags: ['Content', 'Redesign', 'Bug fixes', 'New features'],
    price: 'Quoted per job',
  },
  {
    n: '07',
    title: 'Business Digital Solutions',
    desc: 'Help your business move online properly — websites, digital forms, contact systems, and custom tools.',
    tags: ['Websites', 'Forms', 'Custom tools', 'Support'],
    price: 'Custom quote',
  },
];

export default function Services() {
  const sectionRef = useRef(null);

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
    return () => io.disconnect();
  }, []);

  return (
    <section id="services" className="services" ref={sectionRef}>
      <div className="services__bg-grid" aria-hidden="true" />
      <span className="services__bg-word" aria-hidden="true">SERVICES</span>
      <div className="services__glow" aria-hidden="true" />

      <div className="services__container">

        {/* ============ HEADER ============ */}
        <header className="services__header">
          <div className="services__header-top">
            <span className="services__index">
              <span className="services__index-num">04</span>
              <span className="services__index-line" />
              <span className="services__index-label">Services</span>
            </span>
            <span className="services__index-meta">
              Websites · Apps · APIs · Care
            </span>
          </div>

          <h2 className="services__headline">
            Digital solutions,
            <br />
            built <span className="services__headline-accent">properly</span>.
          </h2>

          <p className="services__lede">
            Websites, web apps, mobile apps, databases, and APIs —
            for businesses, freelancers, and organisations who want to
            look good and work smoothly online.
          </p>
        </header>

        {/* ============ WEBSITE PACKAGES ============ */}
        <div className="services__packages">
          <span className="services__section-label">Website Packages</span>

          <div className="services__packages-grid">
            {WEBSITES.map((p, i) => (
              <article
                key={p.key}
                className={`services__package ${p.highlight ? 'services__package--highlight' : ''}`}
                style={{ '--i': i }}
              >
                {p.highlight && (
                  <span className="services__package-ribbon">Most popular</span>
                )}

                <header className="services__package-head">
                  <span className="services__package-badge">{p.badge}</span>
                  <h3 className="services__package-title">{p.title}</h3>
                  <span className="services__package-tagline">{p.tagline}</span>
                </header>

                <div className="services__package-price">
                  <span className="services__package-price-value">{p.price}</span>
                  <span className="services__package-price-note">one-time</span>
                </div>

                <ul className="services__package-features">
                  {p.features.map((f, j) => (
                    <li key={f} style={{ '--j': j }}>
                      <span className="services__check" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a href="#contact" className="services__package-cta">
                  <span>Get started</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>

        {/* ============ OTHER SERVICES ============ */}
        <div className="services__other">
          <span className="services__section-label">More Services</span>

          <div className="services__other-grid">
            {SERVICES.map((s, i) => (
              <article
                key={s.n}
                className="services__item"
                style={{ '--i': i }}
              >
                <header className="services__item-head">
                  <span className="services__item-num">{s.n}</span>
                  <h3 className="services__item-title">{s.title}</h3>
                </header>

                <p className="services__item-desc">{s.desc}</p>

                <ul className="services__item-tags">
                  {s.tags.map((t, j) => (
                    <li key={t} style={{ '--j': j }}>{t}</li>
                  ))}
                </ul>

                <span className="services__item-price">{s.price}</span>

                <span className="services__item-line" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>

        {/* ============ CTA ============ */}
        <div className="services__cta">
          <div className="services__cta-content">
            <span className="services__cta-eyebrow">Let&rsquo;s talk</span>
            <h3 className="services__cta-title">
              Every project is different.
            </h3>
            <p className="services__cta-text">
              Send me your details and I&rsquo;ll recommend the best solution
              and give you a clear quote — no pressure, no jargon.
            </p>
          </div>

          <a href="#contact" className="services__cta-btn">
            <span>Get a quote</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
