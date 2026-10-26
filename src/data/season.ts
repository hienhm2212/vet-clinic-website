import type { T } from '../i18n'

/**
 * Seasonal theme windows, as MM-DD in the clinic's time zone (Asia/Ho_Chi_Minh).
 * Themes switch themselves on and off in the browser, so the site never needs a
 * redeploy to remove them. Preview any time with `?season=<name>`
 * (or hide them with `?season=off`).
 */
export type Season = {
  name: 'halloween' | 'christmas'
  /** MM-DD, inclusive, Asia/Ho_Chi_Minh. Windows must not overlap or wrap the year. */
  start: string
  end: string
  /** Bump the year so a banner dismissed last year shows again. */
  storageKey: string
}

export const halloween: Season = {
  name: 'halloween',
  start: '10-15',
  end: '11-01',
  storageKey: 'halloween-banner-2026',
}

export const christmas: Season = {
  name: 'christmas',
  start: '12-01',
  end: '12-31',
  storageKey: 'christmas-banner-2026',
}

export const seasons: Season[] = [halloween, christmas]

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

export const christmasTips: { icon: string; title: T; text: T }[] = [
  {
    icon: '🎀',
    title: { vi: 'Kim tuyến & ruy băng', en: 'Tinsel & ribbon' },
    text: {
      vi: 'Mèo rất thích nghịch kim tuyến, nhưng nuốt phải có thể gây tắc ruột cần phẫu thuật. Treo cao hoặc dùng đồ trang trí khác.',
      en: 'Cats love tinsel, but swallowing it can block the intestines and need surgery. Hang it high or skip it.',
    },
  },
  {
    icon: '💡',
    title: { vi: 'Dây đèn nhấp nháy', en: 'Fairy lights' },
    text: {
      vi: 'Chó con, mèo con hay cắn dây điện — dễ bị bỏng miệng hoặc điện giật. Rút điện khi vắng nhà và bọc dây gọn gàng.',
      en: 'Puppies and kittens chew cables and can get mouth burns or shocks. Unplug when you’re out and tidy the wires.',
    },
  },
  {
    icon: '🍗',
    title: { vi: 'Đồ ăn tiệc', en: 'Party food' },
    text: {
      vi: 'Xương gà nấu chín dễ gãy vụn đâm thủng ruột; nho, nho khô, socola, hành tỏi đều độc với chó mèo. Đừng cho bé ăn đồ thừa.',
      en: 'Cooked bones splinter and can pierce the gut; grapes, raisins, chocolate, onion and garlic are toxic. No table scraps.',
    },
  },
  {
    icon: '🌺',
    title: { vi: 'Hoa & cây trang trí', en: 'Festive plants' },
    text: {
      vi: 'Hoa ly cực độc với mèo — chỉ một chút phấn hoa cũng có thể gây suy thận. Tầm gửi, nhựa ruồi, trạng nguyên cũng nên để xa bé.',
      en: 'Lilies are extremely toxic to cats — even a little pollen can cause kidney failure. Keep mistletoe, holly and poinsettia away too.',
    },
  },
]
