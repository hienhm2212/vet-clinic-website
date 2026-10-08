import { useLang } from '../../hooks/useLang'
import styles from './ZaloFloat.module.css'

export default function ZaloFloat() {
  const { t } = useLang()

  return (
    <>
      <div className={styles.zaloPulse} />
      <a
        href="https://zalo.me/0961291597"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.zaloFloat}
        aria-label="Chat Zalo"
      >
        <span className={styles.zaloTooltip}>
          {t('Chat Zalo', 'Chat on Zalo')}
        </span>
        <img src="/images/zalo-icon.svg" alt="Zalo" />
      </a>
    </>
  )
}
