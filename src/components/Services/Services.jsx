import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useLang } from '../../hooks/useLang'
import styles from './Services.module.css'

const SERVICES = [
  {
    icon: '🩺',
    vi: 'Khám Sức Khỏe Tổng Quát',
    en: 'General Checkups',
    descVi: 'Khám toàn diện từ đầu đến chân để giữ cho thú cưng của bạn luôn khỏe mạnh quanh năm.',
    descEn: 'Comprehensive wellness exams to keep your pet healthy year-round. We check everything from nose to tail.',
  },
  {
    icon: '💉',
    vi: 'Tiêm Phòng Vắc-xin',
    en: 'Vaccinations',
    descVi: 'Các loại vắc-xin phù hợp theo độ tuổi, giống loài và môi trường sống của thú cưng. Luôn được bảo vệ an toàn.',
    descEn: 'Core and lifestyle vaccines tailored to your pet\'s age, breed, and risk factors. Stay protected always.',
  },
  {
    icon: '🦷',
    vi: 'Chăm Sóc Răng Miệng',
    en: 'Dental Care',
    descVi: 'Vệ sinh răng chuyên nghiệp và theo dõi sức khỏe răng miệng. Răng sạch, miệng thơm, nụ cười rạng rỡ!',
    descEn: 'Professional cleaning and dental health monitoring. Healthy teeth, happy smiles, fresh breath!',
  },
  {
    icon: '🔬',
    vi: 'Xét Nghiệm & Chẩn Đoán',
    en: 'Lab & Diagnostics',
    descVi: 'Xét nghiệm máu, nước tiểu, siêu âm và các chẩn đoán nhanh để có kết quả chính xác kịp thời.',
    descEn: 'In-house blood panels, urinalysis, imaging and rapid diagnostics for fast, accurate answers.',
  },
  {
    icon: '🏥',
    vi: 'Phẫu Thuật',
    en: 'Surgery',
    descVi: 'Các ca phẫu thuật thông thường và chuyên biệt được thực hiện trong môi trường vô trùng đạt chuẩn.',
    descEn: 'Routine and specialized surgical procedures performed in a sterile, fully equipped environment.',
  },
]

export default function Services() {
  const { t } = useLang()
  const sectionRef  = useRef(null)
  const headerRef   = useRef(null)
  const cardRefs    = useRef([])
  const iconRefs    = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 30, opacity: 0, stagger: 0.15, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      gsap.from(cardRefs.current, {
        y: 50, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  function handleEnter(i) {
    gsap.to(iconRefs.current[i], { rotation: 15, scale: 1.2, duration: 0.2, ease: 'back.out(3)' })
  }
  function handleLeave(i) {
    gsap.to(iconRefs.current[i], { rotation: 0, scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' })
  }

  return (
    <section id="services" className={styles.services} ref={sectionRef}>
      <div className={styles.servicesHeader} ref={headerRef}>
        <div className="section-tag">{t('Dịch Vụ Của Chúng Tôi', 'What We Do')}</div>
        <h2 className="section-title">
          {t('Mọi Thứ Thú Cưng Của Bạn ', 'Everything Your Pet ')}
          <span style={{ color: 'var(--warm-orange)' }}>{t('Cần', 'Needs')}</span>
        </h2>
        <p className="section-sub" style={{ margin: '0 auto' }}>
          {t(
            'Từ khám sức khỏe định kỳ đến chăm sóc y tế chuyên sâu — chúng tôi bao trọn mọi nhu cầu của thú cưng bạn với tình yêu và chuyên môn.',
            "From routine wellness visits to complex medical care — we've got your furry friends covered with love and expertise."
          )}
        </p>
      </div>

      <div className={styles.servicesGrid}>
        {SERVICES.map((svc, i) => (
          <div
            key={svc.vi}
            className={styles.serviceCard}
            ref={el => (cardRefs.current[i] = el)}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
          >
            <span
              className={styles.serviceIcon}
              ref={el => (iconRefs.current[i] = el)}
            >
              {svc.icon}
            </span>
            <div className={styles.serviceTitle}>{t(svc.vi, svc.en)}</div>
            <p className={styles.serviceDesc}>{t(svc.descVi, svc.descEn)}</p>
            <a href="#contact" className={styles.serviceLink}>
              {t('Tìm hiểu thêm →', 'Learn more →')}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
