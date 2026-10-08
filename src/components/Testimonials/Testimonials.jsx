import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useLang } from '../../hooks/useLang'
import styles from './Testimonials.module.css'

const REVIEWS = [
  {
    vi: 'Chị làm rất tận tâm và chuyên nghiệp',
    en: 'The doctor is very dedicated and professional.',
    authorVi: 'Giao Trần Phương', authorEn: 'Giao Tran Phuong',
    petVi: '⭐ Google Review · 4 năm trước', petEn: '⭐ Google Review · 4 years ago',
    avatarBg: '#E8F0FE', avatarColor: '#4285F4', initial: 'G',
  },
  {
    vi: 'Bs chữa bệnh tốt giá cả hợp lý',
    en: 'The vet treats pets well and the prices are very reasonable.',
    authorVi: 'Ho Nguyen Thuy Dung', authorEn: 'Ho Nguyen Thuy Dung',
    petVi: '⭐ Google Review · 2 năm trước', petEn: '⭐ Google Review · 2 years ago',
    avatarBg: '#FCE4EC', avatarColor: '#E91E63', initial: 'H',
  },
  {
    vi: 'Chị bác sĩ rất nhiệt tình, vui vẻ, tay nghề tốt lắm luôn',
    en: 'The doctor is very enthusiastic, cheerful, and highly skilled!',
    authorVi: 'Nguyễn Châu', authorEn: 'Nguyen Chau',
    petVi: '⭐ Google Review · 2 năm trước', petEn: '⭐ Google Review · 2 years ago',
    avatarBg: '#E8F5E9', avatarColor: '#43A047', initial: 'N',
  },
  {
    vi: 'Bác sĩ chẩn đoán đúng bệnh cho con nhà mình, mình đi những chỗ # họ bày vẽ, chữa k hết, tốn tiền nhiều nay may mắn gặp bs Như con mình đã khỏe hơn. Gặp Bs hơi khó nên gọi hẹn đặt lịch trước nha mn',
    en: "Dr. Nhu diagnosed my pet correctly after other clinics failed. My pet is much healthier now. She can be hard to reach so I recommend booking an appointment in advance!",
    authorVi: 'Minh Long', authorEn: 'Minh Long',
    petVi: '⭐ Google Review · 2 năm trước', petEn: '⭐ Google Review · 2 years ago',
    avatarBg: '#EDE7F6', avatarColor: '#7E57C2', initial: 'M',
  },
]

// Duplicate for seamless infinite loop
const CARDS = [...REVIEWS, ...REVIEWS]

export default function Testimonials() {
  const { lang, t } = useLang()
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const trackRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 30, opacity: 0, stagger: 0.15, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      gsap.from(trackRef.current, {
        y: 40, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: trackRef.current, start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="testimonials" className={styles.testimonials} ref={sectionRef}>
      <div className={styles.testimonialsHeader} ref={headerRef}>
        <div className="section-tag">{t('Gia Đình Hài Lòng', 'Happy Families')}</div>
        <h2 className="section-title">
          {t('Khách Hàng Nói Gì Về ', 'What Pet Parents ')}
          <span style={{ color: 'var(--warm-orange)' }}>
            {t('Chúng Tôi', 'Are Saying')}
          </span>
        </h2>
        <p className="section-sub" style={{ margin: '0 auto' }}>
          {t(
            'Những câu chuyện thật từ những gia đình đã tin tưởng chúng tôi chăm sóc những người bạn thân thương nhất của họ.',
            'Real stories from real pet families who trust us with their most beloved companions.'
          )}
        </p>
      </div>

      <div className={styles.testimonialsTrack} ref={trackRef}>
        <div className={styles.testimonialsSlider}>
          {CARDS.map((r, i) => (
            <div key={i} className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>{lang === 'vi' ? r.vi : r.en}</p>
              <div className={styles.testimonialAuthor}>
                <div
                  className={styles.authorAvatar}
                  style={{ background: r.avatarBg, color: r.avatarColor, fontSize: '1rem' }}
                >
                  {r.initial}
                </div>
                <div>
                  <div className={styles.authorName}>{lang === 'vi' ? r.authorVi : r.authorEn}</div>
                  <div className={styles.authorPet}>{lang === 'vi' ? r.petVi : r.petEn}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
