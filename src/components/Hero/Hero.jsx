import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useLang } from '../../hooks/useLang'
import DogSvg from './DogSvg'
import styles from './Hero.module.css'

const STATS = [
  { count: 500, suffix: '+', vi: 'Thú Cưng Hạnh Phúc',  en: 'Happy Pets'       },
  { count: 5,   suffix: '+', vi: 'Năm Kinh Nghiệm',      en: 'Years Experience' },
  { count: 98,  suffix: '%+', vi: '% Hài Lòng',          en: '% Satisfaction'   },
]

function getNextMonthLabel() {
  const d = new Date()
  d.setMonth(d.getMonth() + 1)
  const month = d.getMonth() + 1
  const year  = d.getFullYear()
  return {
    vi: `Tháng ${month}, ${year}`,
    en: d.toLocaleString('en-US', { month: 'long', year: 'numeric' }),
  }
}

const NEXT_MONTH = getNextMonthLabel()

export default function Hero() {
  const { t } = useLang()

  const sectionRef     = useRef(null)
  const badgeRef       = useRef(null)
  const h1Ref          = useRef(null)
  const descRef        = useRef(null)
  const actionsRef     = useRef(null)
  const statRefs       = useRef([])
  const cardRef        = useRef(null)
  const pillRefs       = useRef([])
  const blob1Ref       = useRef(null)
  const blob2Ref       = useRef(null)
  const statNumRefs    = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'back.out(1.4)' } })
      tl
        .from(badgeRef.current,    { y: 30, opacity: 0, duration: 0.6 })
        .from(h1Ref.current,       { y: 40, opacity: 0, duration: 0.7 }, '-=0.3')
        .from(descRef.current,     { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
        .from(actionsRef.current,  { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
        .from(statRefs.current,    { y: 20, opacity: 0, stagger: 0.12, duration: 0.5 }, '-=0.2')
        .from(cardRef.current,     { x: 80, opacity: 0, scale: 0.9, duration: 0.8, ease: 'back.out(1.6)' }, '-=0.7')
        .from(pillRefs.current,    { y: 20, opacity: 0, stagger: 0.15, duration: 0.5, ease: 'back.out(2)' }, '-=0.4')

      // Counters
      STATS.forEach(({ count, suffix }, i) => {
        const el = statNumRefs.current[i]
        if (!el) return
        gsap.to({ val: 0 }, {
          val: count,
          duration: 2,
          delay: 1.5,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = Math.floor(this.targets()[0].val) + suffix
          },
        })
      })

      // Parallax blobs on scroll
      gsap.to(blob1Ref.current, {
        y: -80, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
      })
      gsap.to(blob2Ref.current, {
        y: -50, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" className={styles.hero} ref={sectionRef}>
      <div className={`${styles.blob} ${styles.blob1}`} ref={blob1Ref} />
      <div className={`${styles.blob} ${styles.blob2}`} ref={blob2Ref} />
      <div className={`${styles.blob} ${styles.blob3}`} />
      <span className={styles.pawprint} style={{ top: '15%', left: '6%' }}>🐾</span>
      <span className={styles.pawprint} style={{ top: '68%', left: '44%' }}>🐾</span>
      <span className={styles.pawprint} style={{ top: '28%', right: '8%' }}>🐾</span>

      {/* Left content */}
      <div className={styles.heroContent}>
        <div className={styles.heroBadge} ref={badgeRef}>
          <div className={styles.dot} />
          <span>{t('Đang nhận bệnh nhân mới', 'Now accepting new patients')}</span>
        </div>

        <h1 className={styles.heroH1} ref={h1Ref}>
          {t(
            <>Nơi Mỗi <span>Thú Cưng</span> Được Yêu Thương 🐶🐱</>,
            <>Where Every <span>Paw</span> Gets the Love It Deserves 🐶🐱</>
          )}
        </h1>

        <p className={styles.heroDesc} ref={descRef}>
          {t(
            'Phòng khám thú y tận tâm dành cho chó và mèo. Từ khám định kỳ đến điều trị chuyên sâu — chúng tôi chăm sóc gia đình lông xù của bạn như người thân.',
            'Compassionate veterinary care for your dogs and cats. From routine checkups to specialized treatments — we treat your fur family like our own.'
          )}
        </p>

        <div className={styles.heroActions} ref={actionsRef}>
          <a href="#contact" className="btn-primary">
            {t('📅 Đặt Lịch Khám', '📅 Book Appointment')}
          </a>
          <a href="#services" className="btn-secondary">
            {t('Xem Dịch Vụ →', 'Our Services →')}
          </a>
        </div>

        <div className={styles.heroStats}>
          {STATS.map((stat, i) => (
            <div
              key={stat.vi}
              className={styles.statItem}
              ref={el => (statRefs.current[i] = el)}
            >
              <div
                className={styles.statNum}
                ref={el => (statNumRefs.current[i] = el)}
              >
                0{stat.suffix}
              </div>
              <div className={styles.statLabel}>{t(stat.vi, stat.en)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right illustration */}
      <div className={styles.heroIllustration}>
        <div className={styles.heroCard} ref={cardRef}>
          <div
            className={`${styles.floatingPill} ${styles.pill1}`}
            ref={el => (pillRefs.current[0] = el)}
          >
            ✅ <span>{t('Bác Sĩ Có Chứng Chỉ', 'Certified Vets')}</span>
          </div>
          <div
            className={`${styles.floatingPill} ${styles.pill2}`}
            ref={el => (pillRefs.current[1] = el)}
          >
            ❤️ <span>{t('Chăm Sóc Tận Tâm', 'Trusted Care')}</span>
          </div>
          <div
            className={`${styles.floatingPill} ${styles.pill3}`}
            ref={el => (pillRefs.current[2] = el)}
          >
            🏥 <span>{t('Thiết Bị Hiện Đại', 'Modern Equipment')}</span>
          </div>

          <div className={styles.animalIllustration}>
            <DogSvg />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: '1.1rem', color: 'var(--text)', marginBottom: '8px' }}>
              {t('Buddy đang khỏe mạnh! 🎉', 'Buddy is feeling great! 🎉')}
            </div>
            <div className={styles.cardStatus}>
              <span style={{ fontSize: '1.4rem' }}>💉</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '0.82rem' }}>
                  {t('Lịch Tiêm Tiếp Theo', 'Next Vaccine Due')}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--teal)', fontWeight: 700 }}>
                  {t(NEXT_MONTH.vi, NEXT_MONTH.en)}
                </div>
              </div>
              <div className={styles.cardStatusBadge}>
                {t('Đúng lịch ✓', 'On Track ✓')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
