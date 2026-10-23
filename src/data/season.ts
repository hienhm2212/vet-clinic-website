import type { T } from '../i18n'

/**
 * Seasonal theme window, as MM-DD in the clinic's time zone (Asia/Ho_Chi_Minh).
 * The theme switches itself on and off in the browser, so the site never needs
 * a redeploy to remove it. Preview any time with `?season=halloween`
 * (or hide it with `?season=off`).
 */
export const halloween = {
  start: '10-15',
  end: '11-01',
  /** Bump the year so a banner dismissed last year shows again. */
  storageKey: 'halloween-banner-2026',
}

export const halloweenTips: { icon: string; title: T; text: T }[] = [
  {
    icon: '🍫',
    title: { vi: 'Socola là chất độc', en: 'Chocolate is toxic' },
    text: {
      vi: 'Socola, nhất là socola đen, có thể gây nôn, co giật, rối loạn nhịp tim ở chó mèo. Cất kẹo ngoài tầm với của bé.',
      en: 'Chocolate — especially dark chocolate — can cause vomiting, seizures and heart problems in pets. Keep treats out of reach.',
    },
  },
  {
    icon: '🍬',
    title: { vi: 'Cẩn thận kẹo không đường', en: 'Watch out for sugar-free sweets' },
    text: {
      vi: 'Chất tạo ngọt xylitol trong kẹo, kẹo cao su không đường gây hạ đường huyết, suy gan ở chó — dù chỉ một lượng nhỏ.',
      en: 'Xylitol in sugar-free candy and gum can cause low blood sugar and liver failure in dogs, even in small amounts.',
    },
  },
  {
    icon: '🎃',
    title: { vi: 'Nến & đồ trang trí', en: 'Candles & decorations' },
    text: {
      vi: 'Đèn bí ngô có nến, dây điện, đồ trang trí nhỏ dễ gây bỏng hoặc hóc. Đặt chúng ở nơi bé không với tới.',
      en: 'Candle-lit pumpkins, cables and small decorations can burn or choke. Keep them where pets can’t reach.',
    },
  },
  {
    icon: '👻',
    title: { vi: 'Giữ bé bình tĩnh', en: 'Keep your pet calm' },
    text: {
      vi: 'Tiếng ồn, người lạ và trang phục hóa trang làm bé sợ. Cho bé một góc yên tĩnh và chỉ mặc đồ thoải mái, không che mắt mũi.',
      en: 'Noise, strangers and costumes can scare pets. Give them a quiet spot, and only use comfy costumes that don’t cover eyes or nose.',
    },
  },
]
