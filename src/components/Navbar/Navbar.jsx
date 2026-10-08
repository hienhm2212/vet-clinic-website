import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../../hooks/useLang'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { href: '#services', vi: 'Dịch Vụ',       en: 'Services'   },
  { href: '#about',    vi: 'Về Chúng Tôi',   en: 'About Us'   },
  { href: '#testimonials', vi: 'Đánh Giá',   en: 'Reviews'    },
  { href: '#gallery',  vi: 'Hình Ảnh',       en: 'Gallery'    },
  { href: '#contact',  vi: 'Liên Hệ',        en: 'Contact'    },
]

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const navRef   = useRef(null)
  const linkRefs = useRef([])
  const switcherRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll shadow
      gsap.to(navRef.current, {
        boxShadow: '0 4px 30px rgba(255,112,67,0.12)',
        scrollTrigger: {
          trigger: 'body',
          start: '80px top',
          toggleActions: 'play none none reverse',
        },
      })

      // Nav link micro-hover (non-CTA links — first 5)
      linkRefs.current.slice(0, 5).forEach(link => {
        if (!link) return
        link.addEventListener('mouseenter', () => gsap.to(link, { y: -2, duration: 0.2 }))
        link.addEventListener('mouseleave', () => gsap.to(link, { y: 0, duration: 0.3, ease: 'elastic.out(1, 0.5)' }))
      })

      // Active nav highlight via ScrollTrigger
      const sections = ['hero', 'services', 'about', 'testimonials', 'gallery', 'contact']
      sections.forEach(id => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter:     () => highlightNav(id),
          onEnterBack: () => highlightNav(id),
        })
      })
    }, navRef)

    return () => ctx.revert()
  }, [])

  function highlightNav(activeId) {
    linkRefs.current.slice(0, 5).forEach((link, i) => {
      if (!link) return
      const href = NAV_LINKS[i].href
      link.style.color = href === `#${activeId}` ? 'var(--warm-orange)' : ''
    })
  }

  function handleLangSwitch(newLang) {
    setLang(newLang)
    gsap.fromTo(
      switcherRef.current,
      { scale: 0.92 },
      { scale: 1, duration: 0.3, ease: 'back.out(2)' }
    )
  }

  return (
    <nav ref={navRef} className={styles.nav} id="navbar">
      <a className={styles.logo} href="#">
        <div className={styles.logoPaw}>🐾</div>
        <span>{t('PKTY Huỳnh Như', 'Huynh Nhu Vet')}</span>
      </a>

      <div className={styles.navRight}>
        <ul className={styles.navLinks}>
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                ref={el => (linkRefs.current[i] = el)}
              >
                {t(link.vi, link.en)}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className={styles.navCta}
              ref={el => (linkRefs.current[5] = el)}
            >
              {t('📅 Đặt Lịch', '📅 Book Now')}
            </a>
          </li>
        </ul>

        <div className={styles.langSwitcher} ref={switcherRef}>
          {['vi', 'en'].map(l => (
            <button
              key={l}
              className={`${styles.langBtn}${lang === l ? ' ' + styles.active : ''}`}
              onClick={() => handleLangSwitch(l)}
            >
              {l === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
