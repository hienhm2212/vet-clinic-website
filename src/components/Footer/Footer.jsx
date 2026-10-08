import { useLang } from '../../hooks/useLang'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLogo}>
        <div className={styles.logoPaw}>🐾</div>
        <span>{t('PKTY Huỳnh Như', 'Huynh Nhu Vet')}</span>
      </div>

      <p className={styles.footerText}>
        {t(
          '© 2025 PKTY Huỳnh Như · Làm bằng ❤️ cho thú cưng',
          '© 2025 Huynh Nhu Vet Clinic · Made with ❤️ for pets'
        )}
      </p>

      <div className={styles.footerLinks}>
        <a href="tel:0961291597">📞 0961 291 597</a>
        <a href="#">Facebook</a>
        <a
          href="https://zalo.me/0961291597"
          target="_blank"
          rel="noopener noreferrer"
        >
          Zalo
        </a>
      </div>
    </footer>
  )
}
