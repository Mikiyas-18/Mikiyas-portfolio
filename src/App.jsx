import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import {
  RiGithubFill, RiLinkedinFill, RiTelegramLine, RiInstagramLine, RiSunLine, RiMoonLine,
  RiMenuLine, RiCloseLine, RiMailOpenFill, RiPhoneFill, RiMapPin2Fill, RiArrowRightLine, RiDownload2Line,
} from 'react-icons/ri'
import { profile, socials, about, services, skills, journey, projects } from './data.js'

const ICONS = { github: RiGithubFill, linkedin: RiLinkedinFill, telegram: RiTelegramLine, instagram: RiInstagramLine }
const EMAIL = {
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_8b9rh3b',
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_etgr6v1',
  key: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'k08k8s7_iGgBdERO0',
}
const NAV = [
  ['about', 'About'], ['services', 'Services'], ['skills', 'Skills'],
  ...(journey.length ? [['journey', 'Journey']] : []), ['work', 'Projects'], ['contact', 'Contact'],
]

function Socials({ className }) {
  return (
    <div className={className}>
      {socials.filter((s) => s.url).map((s) => {
        const Icon = ICONS[s.id]
        return <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}><Icon /></a>
      })}
    </div>
  )
}

function Header() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* private mode */ }
  }, [theme])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav container" aria-label="Main">
        <a href="#top" className="nav-logo">Mikiyas</a>
        <div className={`nav-menu ${open ? 'open' : ''}`}>
          <button className="icon-btn nav-close" onClick={() => setOpen(false)} aria-label="Close menu"><RiCloseLine /></button>
          <ul className="nav-list">
            {NAV.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="nav-btns">
          <button className="icon-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <RiSunLine /> : <RiMoonLine />}
          </button>
          <button className="icon-btn nav-toggle" onClick={() => setOpen(true)} aria-label="Open menu"><RiMenuLine /></button>
        </div>
      </nav>
    </header>
  )
}

function Hero() {
  const [first, ...rest] = profile.name.split(' ')
  return (
    <section className="hero section" id="top">
      <div className="container hero-grid">
        <div className="hero-data">
          <p className="hero-role">{profile.role} in {profile.location}</p>
          <h1 className="hero-title" aria-label={profile.name}>
            <span className="line" aria-hidden="true">{first}</span>
            <span className="line" aria-hidden="true">{rest.join(' ')}</span>
          </h1>
          <p className="hero-text">{profile.intro}</p>
          <div className="hero-actions">
            <a href="#work" className="button">See my projects</a>
            <a href="#contact" className="button ghost">Get in touch</a>
          </div>
          <Socials className="socials" />
        </div>
        <div className="portrait">
          <img src="/mikiyas.webp" alt={`Portrait of ${profile.name}`} width="900" height="900" fetchpriority="high" />
        </div>
      </div>
    </section>
  )
}

// Text that fills with colour as it scrolls into view (from the original site)
function Fill({ children }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { el.style.setProperty('--p', '100%'); return }
    const update = () => {
      const r = el.getBoundingClientRect(), h = window.innerHeight
      const p = Math.min(1, Math.max(0, (h * 0.9 - r.top) / (h * 0.5)))
      el.style.setProperty('--p', `${p * 100}%`)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <span className="fill" ref={ref}>{children}</span>
}

function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div className="about-card">
          <p className="about-place">{profile.location}</p>
          <p className="about-avail">{profile.availability}</p>
        </div>
        <div>
          <h2 className="about-lead">
            I design and build <Fill>fast websites</Fill> and <Fill>web apps</Fill> that people can run themselves.
          </h2>
          {about.map((t) => <p className="about-text" key={t}>{t}</p>)}
          {profile.cvUrl && <a href={profile.cvUrl} download className="button"><RiDownload2Line /> Download CV</a>}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <h2 className="section-title">What I can build for you</h2>
        <div className="cards3">
          {services.map((s) => (
            <article className="card" key={s.title}><h3>{s.title}</h3><p>{s.text}</p></article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {skills.map((g) => (
            <div key={g.group}>
              <h3 className="skills-group">{g.group}</h3>
              <ul className="skills-list">
                {g.items.map((s) => (
                  <li key={s.name} className="skill">
                    <span className="blob">{s.logo ? <img src={`/skills/${s.logo}`} alt="" width="36" height="36" loading="lazy" /> : <b>{s.name[0]}</b>}</span>
                    <span className="skill-name">{s.name}</span>
                    <span className="skill-level">{s.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Journey() {
  if (!journey.length) return null
  return (
    <section className="section" id="journey">
      <div className="container">
        <h2 className="section-title">Journey</h2>
        <ol className="timeline">
          {journey.map((j) => (
            <li key={j.title + j.period}>
              <span className="tl-period">{j.period}</span>
              <h3>{j.title}</h3>
              <p className="tl-place">{j.place}</p>
              <p>{j.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Cover({ p }) {
  if (p.image) return <img className="cover" src={p.image} alt="" loading="lazy" />
  return (
    <div className="cover gen" style={{ '--h': p.hue }} aria-hidden="true">
      <div className="phone">
        <i /><i /><i /><b />
      </div>
    </div>
  )
}

function Work() {
  const cats = ['All', ...new Set(projects.map((p) => p.category))]
  const [cat, setCat] = useState('All')
  const [sel, setSel] = useState(null)
  const dlg = useRef(null)
  const shown = projects.filter((p) => cat === 'All' || p.category === cat)

  useEffect(() => {
    const d = dlg.current
    if (sel && !d.open) d.showModal()
    if (!sel && d.open) d.close()
  }, [sel])

  return (
    <section className="section" id="work">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        {projects.length > 3 && (
          <div className="filters" role="group" aria-label="Filter projects">
            {cats.map((c) => <button key={c} className={c === cat ? 'on' : ''} aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>)}
          </div>
        )}
        <div className="cards2">
          {shown.map((p) => (
            <article className="card project" key={p.title}>
              <Cover p={p} />
              <p className="tag">{p.category}{p.status ? ` · ${p.status}` : ''}</p>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
              <button className="link" onClick={() => setSel(p)}>View details <RiArrowRightLine /></button>
            </article>
          ))}
        </div>
      </div>
      <dialog ref={dlg} className="modal" onClose={() => setSel(null)} onClick={(e) => e.target === dlg.current && setSel(null)}>
        {sel && (
          <div className="modal-body">
            <button className="icon-btn modal-x" onClick={() => setSel(null)} aria-label="Close"><RiCloseLine /></button>
            <p className="tag">{sel.category}{sel.status ? ` · ${sel.status}` : ''}</p>
            <h3>{sel.title}</h3>
            <p>{sel.overview}</p>
            <h4>What it does</h4>
            <ul className="bullets">{sel.features.map((f) => <li key={f}>{f}</li>)}</ul>
            <h4>Built with</h4>
            <ul className="chips">{sel.stack.map((s) => <li key={s}>{s}</li>)}</ul>
            {sel.links.length > 0 && (
              <div className="hero-actions">
                {sel.links.map((l) => <a key={l.url} className="button" href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>)}
              </div>
            )}
          </div>
        )}
      </dialog>
    </section>
  )
}

function Contact() {
  const form = useRef(null)
  const [state, setState] = useState({ s: 'idle', msg: '' })

  const submit = async (e) => {
    e.preventDefault()
    const f = form.current
    if (f.website.value) return // honeypot
    if (!f.reportValidity()) return
    setState({ s: 'sending', msg: 'Sending...' })
    try {
      await emailjs.sendForm(EMAIL.service, EMAIL.template, f, { publicKey: EMAIL.key })
      f.reset()
      setState({ s: 'ok', msg: 'Message sent. I will reply soon.' })
    } catch {
      setState({ s: 'err', msg: `Could not send. Please email me at ${profile.email}.` })
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container contact-grid">
        <div>
          <h2 className="section-title left">Let's talk about your project</h2>
          <ul className="contact-list">
            <li><span className="ci"><RiMailOpenFill /></span><div><h3>Email</h3><a href={`mailto:${profile.email}`}>{profile.email}</a></div></li>
            <li><span className="ci"><RiPhoneFill /></span><div><h3>Phone</h3><a href={`tel:${profile.phoneHref}`}>{profile.phone}</a></div></li>
            <li><span className="ci"><RiMapPin2Fill /></span><div><h3>Location</h3><p>{profile.location}</p></div></li>
          </ul>
        </div>
        <form ref={form} className="form" onSubmit={submit} noValidate={false}>
          <label>Name<input name="name" required autoComplete="name" /></label>
          <label>Email<input name="email" type="email" required autoComplete="email" /></label>
          <label>Message<textarea name="message" required rows="5" /></label>
          <input name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" className="hp" />
          <button className="button" type="submit" disabled={state.s === 'sending'}>Send message</button>
          <p className={`status ${state.s}`} role="status" aria-live="polite">{state.msg}</p>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-in">
        <Socials className="socials" />
        <p>© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <Header />
      <main>
        <Hero /><About /><Services /><Skills /><Journey /><Work /><Contact />
      </main>
      <Footer />
    </>
  )
}
