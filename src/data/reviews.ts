import type { T } from '../i18n'

/** Real Google reviews. `text.vi` is the original wording. */
export const reviews: { author: string; text: T; when: T }[] = [
  {
    author: 'Minh Long',
    text: {
      vi: 'Bác sĩ chẩn đoán đúng bệnh cho con nhà mình, mình đi những chỗ khác họ bày vẽ, chữa không hết, tốn tiền nhiều. Nay may mắn gặp BS Như, con mình đã khỏe hơn. Gặp BS hơi khó nên gọi hẹn đặt lịch trước nha mọi người.',
      en: 'Dr. Nhu diagnosed my pet correctly after other clinics failed and cost me a lot. My pet is much healthier now. She is busy, so call ahead to book!',
    },
    when: { vi: '2 năm trước', en: '2 years ago' },
  },
  {
    author: 'Nguyễn Châu',
    text: {
      vi: 'Chị bác sĩ rất nhiệt tình, vui vẻ, tay nghề tốt lắm luôn.',
      en: 'The doctor is very enthusiastic, cheerful and highly skilled!',
    },
    when: { vi: '2 năm trước', en: '2 years ago' },
  },
  {
    author: 'Ho Nguyen Thuy Dung',
    text: {
      vi: 'Bác sĩ chữa bệnh tốt, giá cả hợp lý.',
      en: 'Great treatment and very reasonable prices.',
    },
    when: { vi: '2 năm trước', en: '2 years ago' },
  },
  {
    author: 'Giao Trần Phương',
    text: {
      vi: 'Chị làm rất tận tâm và chuyên nghiệp.',
      en: 'Very dedicated and professional.',
    },
    when: { vi: '4 năm trước', en: '4 years ago' },
  },
]
