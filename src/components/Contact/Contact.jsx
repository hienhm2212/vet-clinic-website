import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useLang } from '../../hooks/useLang'
import styles from './Contact.module.css'

const PET_TYPES = [
  { vi: '🐶 Chó',   en: '🐶 Dog'   },
  { vi: '🐱 Mèo',   en: '🐱 Cat'   },
  { vi: '🐰 Khác',  en: '🐰 Other' },
]

const SERVICES = [
  { vi: 'Khám Tổng Quát',        en: 'General Checkup'       },
  { vi: 'Tiêm Phòng',            en: 'Vaccination'            },
  { vi: 'Chăm Sóc Răng Miệng',   en: 'Dental Care'            },
  { vi: 'Tư Vấn Phẫu Thuật',     en: 'Surgery Consultation'   },
  { vi: 'Cấp Cứu',               en: 'Emergency'              },
]

export default function Contact() {
  const { t } = useLang()
  const [form, setForm] = useState({
    name: '', phone: '', pet: '', petType: 0, service: 0, notes: ''
  })

  const sectionRef = useRef(null)
  const infoRef    = useRef(null)
  const formRef    = useRef(null)
  const itemRefs   = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(infoRef.current, {
        x: -50, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
      gsap.from(formRef.current, {
        x: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
      gsap.from(itemRefs.current, {
        x: -20, opacity: 0, stagger: 0.1, duration: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    alert(t('Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.', 'Thank you! We will contact you soon.'))
  }

  return (
    <section id="contact" className={styles.contact} ref={sectionRef}>
      {/* Left info column */}
      <div className={styles.contactInfo} ref={infoRef}>
        <div className="section-tag">{t('Liên Hệ Với Chúng Tôi', 'Get In Touch')}</div>
        <h2>
          {t('Đặt Lịch Khám ', 'Book Your Visit ')}
          <span style={{ color: 'var(--warm-orange)' }}>
            {t('Ngay Hôm Nay 🐾', 'Today 🐾')}
          </span>
        </h2>
        <p>
          {t(
            'Chúng tôi rất mong được gặp thú cưng của bạn! Điền form hoặc liên hệ qua các kênh bên dưới.',
            "We'd love to meet your furry friend! Fill out the form or reach us through any of the channels below."
          )}
        </p>

        <div className={styles.contactItems}>
          {[
            { icon: '📍', titleVi: 'Địa Chỉ', titleEn: 'Address', body: '138 Hà Duy Phiên, xã Bình Mỹ, Thành phố Hồ Chí Minh' },
            { icon: '📞', titleVi: 'Điện Thoại', titleEn: 'Phone', link: 'tel:0961291597', linkText: '0961 291 597' },
            { icon: '👩‍⚕️', titleVi: 'Bác Sĩ Phụ Trách', titleEn: 'Lead Doctor', bodyVi: 'BSTY Trần Thị Huỳnh Như', bodyEn: 'Dr. Tran Thi Huynh Nhu' },
            { icon: '🕐', titleVi: 'Giờ Mở Cửa', titleEn: 'Opening Hours', bodyVi: 'Thứ 2 – CN: 8:00 – 20:00', bodyEn: 'Mon – Sun: 8:00 AM – 8:00 PM' },
          ].map((item, i) => (
            <div key={item.icon} className={styles.contactItem} ref={el => (itemRefs.current[i] = el)}>
              <div className={styles.contactItemIcon}>{item.icon}</div>
              <div className={styles.contactItemText}>
                <h4>{t(item.titleVi, item.titleEn)}</h4>
                {item.link ? (
                  <p><a href={item.link}>{item.linkText}</a></p>
                ) : (
                  <p>{item.bodyVi ? t(item.bodyVi, item.bodyEn) : item.body}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.contactMap}>
          <iframe
            src="https://maps.google.com/maps?q=138+Ha+Duy+Phien,+Binh+My,+Ho+Chi+Minh,+Vietnam&output=embed&hl=vi"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Clinic location"
          />
        </div>
      </div>

      {/* Right form */}
      <div className={styles.contactForm} ref={formRef}>
        <h3>{t('Yêu Cầu Đặt Lịch 📅', 'Request an Appointment 📅')}</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>{t('Họ và Tên', 'Your Name')}</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t('VD: Nguyễn Văn A', 'e.g. John Doe')}
              />
            </div>
            <div className={styles.formGroup}>
              <label>{t('Số Điện Thoại', 'Phone Number')}</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="0961 291 597"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>{t('Tên Thú Cưng', "Pet's Name")}</label>
              <input
                type="text"
                name="pet"
                value={form.pet}
                onChange={handleChange}
                placeholder={t('VD: Mochi', 'e.g. Buddy')}
              />
            </div>
            <div className={styles.formGroup}>
              <label>{t('Loại Thú Cưng', 'Pet Type')}</label>
              <select name="petType" value={form.petType} onChange={handleChange}>
                {PET_TYPES.map((pt, i) => (
                  <option key={i} value={i}>{t(pt.vi, pt.en)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>{t('Dịch Vụ Cần', 'Service Needed')}</label>
            <select name="service" value={form.service} onChange={handleChange}>
              {SERVICES.map((svc, i) => (
                <option key={i} value={i}>{t(svc.vi, svc.en)}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>{t('Ghi Chú Thêm', 'Additional Notes')}</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder={t(
                'Triệu chứng hoặc vấn đề bạn muốn chúng tôi biết...',
                'Any symptoms or concerns we should know about?'
              )}
            />
          </div>

          <button className="btn-primary" type="submit" style={{ width: '100%', textAlign: 'center' }}>
            {t('🐾 Đặt Lịch Khám', '🐾 Book My Appointment')}
          </button>
        </form>
      </div>
    </section>
  )
}
