import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { useLang } from '../../hooks/useLang'
import styles from './Gallery.module.css'

const IMAGES = [
  { src: '/images/vet-rx.jpg',   altVi: 'Khu vực tiếp tân',    labelVi: 'Khu Vực Tiếp Tân',   labelEn: 'Reception Area'   },
  { src: '/images/dog.jpg',      altVi: 'Chú chó đáng yêu',    labelVi: 'Bé Cún Đáng Yêu',    labelEn: 'Happy Pup'        },
  { src: '/images/dog-2.jpg',    altVi: 'Chú chó vui vẻ',      labelVi: 'Bé Cún Vui Vẻ',      labelEn: 'Playful Pup'      },
  { src: '/images/dog-3.jpg',    altVi: 'Bé cún tinh nghịch',  labelVi: 'Bé Cún Tinh Nghịch', labelEn: 'Cheeky Pup'       },
  { src: '/images/meo.jpg',      altVi: 'Bé mèo đáng yêu',     labelVi: 'Bé Mèo Đáng Yêu',    labelEn: 'Cute Kitten'      },
  { src: '/images/meo-2.jpg',    altVi: 'Bé mèo tinh nghịch',  labelVi: 'Bé Mèo Tinh Nghịch', labelEn: 'Playful Kitten'   },
  { src: '/images/meo-3.jpg',    altVi: 'Bé mèo cute',         labelVi: 'Bé Mèo Xinh Xắn',    labelEn: 'Pretty Kitten'    },
  { src: '/images/meo-4.jpg',    altVi: 'Bé mèo vui vẻ',       labelVi: 'Bé Mèo Vui Vẻ',      labelEn: 'Happy Kitten'     },
  { src: '/images/soi-than.jpg', altVi: 'Chẩn đoán sỏi thận',  labelVi: 'Chẩn Đoán Hình Ảnh', labelEn: 'Imaging & Diagnosis' },
]

export default function Gallery() {
  const { t } = useLang()
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const sectionRef  = useRef(null)
  const headerRef   = useRef(null)
  const itemRefs    = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 30, opacity: 0, stagger: 0.15, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      gsap.from(itemRefs.current, {
        scale: 0.88, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const closeLightbox = useCallback(() => setLightboxSrc(null), [])

  useEffect(() => {
    const handleKey = e => { if (e.key === 'Escape') closeLightbox() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [closeLightbox])

  return (
    <section id="gallery" className={styles.gallery} ref={sectionRef}>
      <div className={styles.galleryHeader} ref={headerRef}>
        <div className="section-tag">{t('Hình Ảnh Phòng Khám', 'Clinic Gallery')}</div>
        <h2 className="section-title">
          {t('Không Gian ', 'A Peek Inside ')}
          <span style={{ color: 'var(--warm-orange)' }}>
            {t('Của Chúng Tôi 🏥', 'Our Clinic 🏥')}
          </span>
        </h2>
        <p className="section-sub" style={{ margin: '0 auto' }}>
          {t(
            'Một cái nhìn vào không gian ấm cúng — nơi thú cưng luôn được chào đón và chăm sóc tận tình.',
            'A look inside our cozy space — where every pet is welcomed and cared for with love.'
          )}
        </p>
      </div>

      <div className={styles.galleryGrid}>
        {IMAGES.map((img, i) => (
          <div
            key={img.src}
            className={styles.galleryItem}
            ref={el => (itemRefs.current[i] = el)}
            onClick={() => setLightboxSrc(img.src)}
          >
            <img src={img.src} alt={img.altVi} loading="lazy" />
            <div className={styles.galleryOverlay}>
              <span>{t(img.labelVi, img.labelEn)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <div
        className={`${styles.lightbox}${lightboxSrc ? ' ' + styles.open : ''}`}
        onClick={e => { if (e.target !== e.currentTarget.querySelector('img')) closeLightbox() }}
      >
        <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">✕</button>
        {lightboxSrc && (
          <img className={styles.lightboxImg} src={lightboxSrc} alt="" />
        )}
      </div>
    </section>
  )
}
