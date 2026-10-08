import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useLang } from '../../hooks/useLang'
import styles from './About.module.css'

const FEATURES = [
  { icon: '👩‍⚕️', vi: 'Đội Ngũ Chuyên Nghiệp',  en: 'Expert Team',      descVi: 'Bác sĩ thú y được đào tạo bài bản và giàu kinh nghiệm',    descEn: 'Trained vets with years of hands-on experience' },
  { icon: '🏠',   vi: 'Không Gian Thân Thiện',   en: 'Stress-Free Space', descVi: 'Môi trường yên tĩnh, thoải mái, giảm căng thẳng cho thú cưng', descEn: 'Calm, welcoming spaces designed for anxious pets' },
  { icon: '⏰',   vi: 'Giờ Làm Việc Linh Hoạt',  en: 'Flexible Hours',   descVi: 'Mở cửa 7 ngày một tuần theo nhu cầu của bạn',               descEn: 'Open 7 days a week to fit your schedule' },
  { icon: '💬',   vi: 'Luôn Hỗ Trợ Bạn',         en: 'Always Reachable', descVi: 'Có thể liên hệ nhanh qua điện thoại hoặc nhắn tin',           descEn: 'Reachable by call or message for urgent concerns' },
]

export default function About() {
  const { t } = useLang()
  const sectionRef  = useRef(null)
  const visualRef   = useRef(null)
  const contentRef  = useRef(null)
  const badgeRef    = useRef(null)
  const doctorRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(visualRef.current, {
        x: -60, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })

      gsap.from(contentRef.current.children, {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })

      gsap.from(doctorRef.current, {
        scale: 0.8, opacity: 0, duration: 0.6, ease: 'back.out(2)',
        scrollTrigger: { trigger: doctorRef.current, start: 'top 85%' },
      })

      // Infinite badge pulse
      gsap.to(badgeRef.current, {
        scale: 1.05, duration: 1.5, ease: 'power1.inOut', yoyo: true, repeat: -1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className={styles.aboutVisual} ref={visualRef}>
        <svg className={styles.aboutDots} width="70" height="70" viewBox="0 0 70 70">
          {[10, 30, 50].flatMap(cx =>
            [10, 30, 50].map(cy => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="var(--blush)" opacity="0.9" />
            ))
          )}
        </svg>

        <div className={styles.aboutImgWrap}>
          <span className={styles.pawEmoji}>🐾</span>
        </div>

        <div className={styles.aboutBadge} ref={badgeRef}>
          <span>5+</span>
          <span>{t('Năm Kinh Nghiệm', 'Years of Care')}</span>
        </div>
      </div>

      <div className={styles.aboutContent} ref={contentRef}>
        <div className="section-tag">{t('Câu Chuyện Của Chúng Tôi', 'Our Story')}</div>

        <h2 className="section-title">
          {t('Phòng Khám Được Xây Dựng ', 'A Clinic Built ')}
          <span style={{ color: 'var(--warm-orange)' }}>
            {t('Bằng Tình Yêu', 'With Love')}
          </span>
        </h2>

        <p className="section-sub" style={{ maxWidth: '100%' }}>
          {t(
            'PKTY Huỳnh Như được thành lập với một niềm tin đơn giản: mỗi thú cưng đều xứng đáng được đối xử như người thân trong gia đình. Đội ngũ bác sĩ và nhân viên của chúng tôi mang đến sự ân cần, kỹ năng và tình yêu thực sự trong từng lần thăm khám.',
            'Huynh Nhu Vet Clinic was built on one simple belief: every pet deserves to be treated like family. Our team of passionate veterinarians and staff bring warmth, skill, and genuine love to every visit.'
          )}
        </p>

        <div className={styles.doctorCard} ref={doctorRef}>
          <div className={styles.doctorAvatar}>👩‍⚕️</div>
          <div>
            <div className={styles.doctorName}>
              {t('BSTY Trần Thị Huỳnh Như', 'Dr. Tran Thi Huynh Nhu')}
            </div>
            <div className={styles.doctorTitle}>
              {t('Bác Sĩ Thú Y Phụ Trách', 'Lead Veterinarian')}
            </div>
          </div>
        </div>

        <div className={styles.aboutFeatures}>
          {FEATURES.map(f => (
            <div key={f.vi} className={styles.aboutFeature}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <div className={styles.featureText}>
                <h4>{t(f.vi, f.en)}</h4>
                <p>{t(f.descVi, f.descEn)}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '32px' }}>
          <a href="#contact" className="btn-primary">
            {t('Gặp Bác Sĩ Của Chúng Tôi 🐾', 'Meet Our Team 🐾')}
          </a>
        </div>
      </div>
    </section>
  )
}
