import { useEffect, useState } from 'react';
import './Navbar.css';

const LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Hobbies',  href: '#hobbies' },
  { label: 'Contact',  href: '#contact' },
];

const FIRST = 'Richard';
const LAST  = 'Dev';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#home" className="brand" onClick={close} aria-label="Home">
          <span className="brand__first">
            {FIRST.split('').map((c, i) => (
              <span key={i} className="brand__letter" style={{ '--i': i }}>
                {c}
              </span>
            ))}
          </span>

          <span className="brand__last">
            {LAST.split('').map((c, i) => (
              <span
                key={i}
                className="brand__letter brand__letter--alt"
                style={{ '--i': i + FIRST.length }}
              >
                {c}
              </span>
            ))}
          </span>

          <span className="brand__underline" aria-hidden="true" />
          <span className="brand__dot" aria-hidden="true" />
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="nav__link"
              style={{ '--i': i }}
            >
              <span>{l.label}</span>
            </a>
          ))}
        </nav>

        <button
          className={`nav__burger ${open ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`nav__drawer ${open ? 'is-open' : ''}`}>
        {LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            className="nav__drawer-link"
            style={{ '--i': i }}
            onClick={close}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          className="nav__drawer-link nav__drawer-link--cta"
          onClick={close}
        >
          Let&rsquo;s talk →
        </a>
      </div>
    </header>
  );
}