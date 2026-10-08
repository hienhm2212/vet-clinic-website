import type { T } from '../i18n'
import type { IconName } from '../components/Icon.astro'
import type { PhotoKey } from './photos'

export type Faq = { q: T; a: T }

export type Service = {
  slug: T
  icon: IconName
  photo?: PhotoKey
  title: T
  /** One sentence for cards. */
  short: T
  metaTitle: T
  metaDescription: T
  intro: T
  /** "When should you bring your pet in?" */
  signs: T[]
  /** What happens at the visit, in order. */
  steps: { title: T; text: T }[]
  faqs: Faq[]
  /** Value for the booking form's service <select>. */
  formValue: string
}

export const services: Service[] = [
  {
    slug: { vi: 'kham-tong-quat', en: 'wellness-exams' },
    icon: 'stethoscope',
    photo: 'meo',
    formValue: 'kham-tong-quat',
    title: { vi: 'Khám sức khỏe tổng quát', en: 'Wellness exams' },
    short: {
      vi: 'Khám toàn diện từ đầu đến đuôi, phát hiện sớm bệnh để bé luôn khỏe mạnh.',
      en: 'Nose-to-tail check-ups that catch problems early and keep your pet healthy.',
    },
    metaTitle: {
      vi: 'Khám sức khỏe tổng quát chó mèo – Bình Mỹ, Củ Chi',
      en: 'Dog & Cat Wellness Exams in Binh My, Cu Chi',
    },
    metaDescription: {
      vi: 'Khám sức khỏe định kỳ cho chó mèo tại Phòng Khám Thú Y Huỳnh Như, 138 Hà Duy Phiên, Bình Mỹ. Kiểm tra toàn diện, tư vấn dinh dưỡng, tẩy giun. Gọi 0961 291 597.',
      en: 'Routine wellness exams for dogs and cats at Huynh Nhu Vet, 138 Ha Duy Phien, Binh My. Full physical check, nutrition and deworming advice. Call 0961 291 597.',
    },
    intro: {
      vi: 'Chó mèo thường che giấu cơn đau và dấu hiệu bệnh rất giỏi. Một lần khám tổng quát giúp bác sĩ phát hiện sớm những vấn đề về tim, răng miệng, da lông, tiêu hóa hay cân nặng — khi việc điều trị còn đơn giản và ít tốn kém. Chúng tôi khuyến khích khám định kỳ ít nhất mỗi năm một lần, và 6 tháng một lần với bé lớn tuổi.',
      en: 'Dogs and cats are very good at hiding pain and early signs of illness. A wellness exam lets the vet spot heart, dental, skin, digestive or weight problems early — while treatment is still simple and affordable. We recommend a check-up at least once a year, and every six months for senior pets.',
    },
    signs: [
      { vi: 'Bé mới về nhà, cần kiểm tra sức khỏe ban đầu', en: 'A new pet that needs a first health check' },
      { vi: 'Bỏ ăn, ăn ít hoặc sụt cân không rõ lý do', en: 'Poor appetite or unexplained weight loss' },
      { vi: 'Lười vận động, ngủ nhiều hơn bình thường', en: 'Less active or sleeping more than usual' },
      { vi: 'Rụng lông, ngứa, gãi nhiều, da có mẩn đỏ', en: 'Hair loss, itching or red patches on the skin' },
      { vi: 'Bé đã lớn tuổi (chó mèo từ 7 tuổi trở lên)', en: 'Senior pets (7 years and older)' },
    ],
    steps: [
      { title: { vi: 'Hỏi bệnh sử', en: 'History' }, text: { vi: 'Bác sĩ hỏi về chế độ ăn, thói quen và những thay đổi gần đây của bé.', en: 'We ask about diet, habits and any recent changes.' } },
      { title: { vi: 'Khám lâm sàng', en: 'Physical exam' }, text: { vi: 'Kiểm tra mắt, tai, răng, tim phổi, da lông, bụng, khớp và cân nặng.', en: 'Eyes, ears, teeth, heart and lungs, skin, abdomen, joints and weight.' } },
      { title: { vi: 'Chẩn đoán thêm nếu cần', en: 'Further tests if needed' }, text: { vi: 'Xét nghiệm máu hoặc siêu âm ngay tại phòng khám khi có dấu hiệu bất thường.', en: 'Blood work or ultrasound on site if anything looks unusual.' } },
      { title: { vi: 'Tư vấn chăm sóc', en: 'Care plan' }, text: { vi: 'Hướng dẫn dinh dưỡng, tẩy giun, phòng ve rận và lịch tiêm phòng phù hợp.', en: 'Advice on nutrition, deworming, flea and tick prevention and vaccines.' } },
    ],
    faqs: [
      {
        q: { vi: 'Bao lâu nên khám sức khỏe cho chó mèo một lần?', en: 'How often should my pet have a check-up?' },
        a: { vi: 'Với chó mèo trưởng thành khỏe mạnh, nên khám ít nhất 1 lần mỗi năm. Chó mèo con và bé từ 7 tuổi trở lên nên khám 6 tháng một lần.', en: 'Healthy adult pets should be seen at least once a year. Puppies, kittens and pets over 7 should be seen every six months.' },
      },
      {
        q: { vi: 'Có cần cho bé nhịn ăn trước khi khám không?', en: 'Should my pet fast before the exam?' },
        a: { vi: 'Khám tổng quát thông thường không cần nhịn ăn. Nếu bé có thể cần xét nghiệm máu, bác sĩ sẽ dặn nhịn ăn khoảng 8 tiếng khi bạn gọi đặt lịch.', en: 'A normal exam does not require fasting. If blood work may be needed, we will tell you to fast your pet for about 8 hours when you book.' },
      },
    ],
  },
  {
    slug: { vi: 'tiem-phong', en: 'vaccinations' },
    icon: 'syringe',
    photo: 'dog2',
    formValue: 'tiem-phong',
    title: { vi: 'Tiêm phòng vắc-xin', en: 'Vaccinations' },
    short: {
      vi: 'Lịch tiêm phòng chuẩn cho chó mèo con và nhắc lại hằng năm, bảo vệ bé khỏi bệnh nguy hiểm.',
      en: 'Puppy and kitten vaccine schedules plus yearly boosters against dangerous diseases.',
    },
    metaTitle: {
      vi: 'Tiêm phòng cho chó mèo – Bình Mỹ, Củ Chi',
      en: 'Dog & Cat Vaccinations in Binh My, Cu Chi',
    },
    metaDescription: {
      vi: 'Tiêm phòng vắc-xin cho chó mèo: bệnh dại, Care, Parvo, giảm bạch cầu ở mèo… Lịch tiêm cho chó mèo con và nhắc lại hằng năm tại PKTY Huỳnh Như, Bình Mỹ. Gọi 0961 291 597.',
      en: 'Vaccinations for dogs and cats — rabies, distemper, parvovirus, feline panleukopenia and more. Puppy, kitten and yearly booster schedules at Huynh Nhu Vet, Binh My.',
    },
    intro: {
      vi: 'Tiêm phòng là cách đơn giản và hiệu quả nhất để bảo vệ chó mèo khỏi các bệnh truyền nhiễm nguy hiểm như dại, Care (Distemper), Parvo ở chó hay giảm bạch cầu (Panleukopenia) ở mèo. Bác sĩ sẽ khám tổng quát trước khi tiêm và xây dựng lịch tiêm phù hợp với độ tuổi, sức khỏe và môi trường sống của từng bé.',
      en: 'Vaccination is the simplest and most effective way to protect your pet from dangerous infectious diseases such as rabies, canine distemper, parvovirus and feline panleukopenia. The vet examines your pet before every vaccine and builds a schedule that fits their age, health and lifestyle.',
    },
    signs: [
      { vi: 'Chó mèo con từ 6–8 tuần tuổi, bắt đầu mũi đầu tiên', en: 'Puppies and kittens from 6–8 weeks old, for their first shots' },
      { vi: 'Đến hạn tiêm nhắc lại hằng năm', en: 'Time for the yearly booster' },
      { vi: 'Bé mới nhận nuôi, chưa rõ lịch sử tiêm phòng', en: 'A newly adopted pet with unknown vaccine history' },
      { vi: 'Chuẩn bị gửi trông, đi xa hoặc tiếp xúc nhiều thú khác', en: 'Before boarding, travel or meeting many other animals' },
    ],
    steps: [
      { title: { vi: 'Khám trước tiêm', en: 'Pre-vaccine check' }, text: { vi: 'Đo nhiệt độ, kiểm tra sức khỏe — chỉ tiêm khi bé khỏe mạnh.', en: 'Temperature and health check — we only vaccinate healthy pets.' } },
      { title: { vi: 'Tiêm vắc-xin', en: 'Vaccination' }, text: { vi: 'Sử dụng vắc-xin được bảo quản lạnh đúng quy chuẩn.', en: 'Vaccines stored in a properly maintained cold chain.' } },
      { title: { vi: 'Theo dõi sau tiêm', en: 'Observation' }, text: { vi: 'Theo dõi phản ứng sau tiêm và hướng dẫn chăm sóc tại nhà.', en: 'We watch for reactions and explain aftercare at home.' } },
      { title: { vi: 'Sổ tiêm & nhắc lịch', en: 'Record & reminder' }, text: { vi: 'Ghi sổ tiêm phòng và hẹn ngày tiêm mũi tiếp theo.', en: 'We update the vaccine book and schedule the next dose.' } },
    ],
    faqs: [
      {
        q: { vi: 'Chó mèo con nên tiêm phòng khi nào?', en: 'When should puppies and kittens be vaccinated?' },
        a: { vi: 'Thông thường bắt đầu từ 6–8 tuần tuổi, tiêm nhắc mỗi 3–4 tuần cho đến khoảng 16 tuần tuổi, sau đó nhắc lại hằng năm. Vắc-xin dại thường tiêm từ 3 tháng tuổi. Bác sĩ sẽ tư vấn lịch cụ thể cho từng bé.', en: 'Usually starting at 6–8 weeks, with boosters every 3–4 weeks until about 16 weeks old, then yearly. Rabies is usually given from 3 months. The vet will set the exact schedule for your pet.' },
      },
      {
        q: { vi: 'Sau khi tiêm, bé bị mệt có sao không?', en: 'Is it normal for my pet to be tired after a vaccine?' },
        a: { vi: 'Bé có thể hơi mệt, ăn ít hoặc sưng nhẹ chỗ tiêm trong 1–2 ngày — đây là phản ứng bình thường. Nếu bé nôn, khó thở, sưng mặt hoặc mệt kéo dài, hãy gọi ngay cho phòng khám.', en: 'Mild tiredness, less appetite or slight swelling at the injection site for 1–2 days is normal. If your pet vomits, struggles to breathe, has facial swelling or stays lethargic, call us right away.' },
      },
      {
        q: { vi: 'Có cần tắm cho bé trước khi tiêm không?', en: 'Should I bathe my pet before the vaccine?' },
        a: { vi: 'Không bắt buộc. Tuy nhiên nên tránh tắm trong khoảng 3–5 ngày sau khi tiêm.', en: 'It is not necessary, but please avoid bathing for 3–5 days after vaccination.' },
      },
    ],
  },
  {
    slug: { vi: 'xet-nghiem-sieu-am', en: 'diagnostics-ultrasound' },
    icon: 'microscope',
    photo: 'soiThan',
    formValue: 'xet-nghiem-sieu-am',
    title: { vi: 'Xét nghiệm & siêu âm', en: 'Lab tests & ultrasound' },
    short: {
      vi: 'Siêu âm, xét nghiệm máu, nước tiểu ngay tại phòng khám — chẩn đoán nhanh và chính xác.',
      en: 'On-site ultrasound, blood and urine tests for fast, accurate answers.',
    },
    metaTitle: {
      vi: 'Siêu âm & xét nghiệm chó mèo – Bình Mỹ, Củ Chi',
      en: 'Pet Ultrasound & Lab Tests in Binh My, Cu Chi',
    },
    metaDescription: {
      vi: 'Siêu âm bụng, xét nghiệm máu, nước tiểu cho chó mèo ngay tại PKTY Huỳnh Như. Phát hiện sỏi thận, sỏi bàng quang, bệnh gan thận sớm. 138 Hà Duy Phiên, Bình Mỹ.',
      en: 'Abdominal ultrasound, blood and urine tests for dogs and cats at Huynh Nhu Vet. Early detection of kidney and bladder stones, liver and kidney disease.',
    },
    intro: {
      vi: 'Chẩn đoán đúng là bước quan trọng nhất để điều trị hiệu quả. Phòng khám trang bị máy siêu âm và các xét nghiệm cơ bản ngay tại chỗ, giúp bác sĩ nhìn rõ những gì đang xảy ra bên trong cơ thể bé — từ sỏi thận, sỏi bàng quang, bệnh gan thận đến theo dõi thai — mà không phải chuyển bé đi nơi khác.',
      en: 'The right diagnosis is the most important step toward effective treatment. Our clinic has an ultrasound machine and basic lab tests on site, so the vet can see what is happening inside your pet — from kidney and bladder stones and liver or kidney disease to pregnancy checks — without sending you elsewhere.',
    },
    signs: [
      { vi: 'Đi tiểu khó, tiểu ra máu, tiểu nhiều lần', en: 'Straining to urinate, blood in urine or frequent urination' },
      { vi: 'Nôn, tiêu chảy kéo dài, bụng chướng', en: 'Persistent vomiting, diarrhoea or a swollen belly' },
      { vi: 'Uống nước và đi tiểu nhiều bất thường', en: 'Drinking and urinating much more than usual' },
      { vi: 'Kiểm tra trước phẫu thuật hoặc gây mê', en: 'Pre-surgery or pre-anaesthesia screening' },
      { vi: 'Theo dõi thai kỳ ở chó mèo cái', en: 'Pregnancy monitoring' },
    ],
    steps: [
      { title: { vi: 'Khám & chỉ định', en: 'Exam & plan' }, text: { vi: 'Bác sĩ khám lâm sàng và chỉ chọn những xét nghiệm thật sự cần thiết.', en: 'The vet examines your pet and only orders the tests that are really needed.' } },
      { title: { vi: 'Lấy mẫu / siêu âm', en: 'Samples / ultrasound' }, text: { vi: 'Thực hiện nhẹ nhàng, có người giữ và trấn an bé suốt quá trình.', en: 'Done gently, with someone holding and calming your pet throughout.' } },
      { title: { vi: 'Đọc kết quả', en: 'Results' }, text: { vi: 'Giải thích kết quả rõ ràng, cho bạn xem hình ảnh siêu âm.', en: 'We explain the results clearly and show you the ultrasound images.' } },
      { title: { vi: 'Phác đồ điều trị', en: 'Treatment plan' }, text: { vi: 'Đưa ra hướng điều trị và chi phí dự kiến trước khi thực hiện.', en: 'We propose treatment and expected costs before going ahead.' } },
    ],
    faqs: [
      {
        q: { vi: 'Siêu âm có làm đau bé không?', en: 'Does ultrasound hurt my pet?' },
        a: { vi: 'Không. Siêu âm hoàn toàn không đau và không xâm lấn. Bé có thể cần cạo một ít lông vùng bụng để đầu dò tiếp xúc tốt hơn.', en: 'No. Ultrasound is painless and non-invasive. A small patch of belly fur may be clipped so the probe makes good contact.' },
      },
      {
        q: { vi: 'Có cần nhịn ăn trước khi siêu âm, xét nghiệm máu?', en: 'Does my pet need to fast before ultrasound or blood tests?' },
        a: { vi: 'Nên cho bé nhịn ăn khoảng 8 tiếng (vẫn cho uống nước) để kết quả chính xác hơn. Với siêu âm bàng quang, không nên cho bé đi tiểu ngay trước khi đến.', en: 'Fasting for about 8 hours (water is fine) gives more accurate results. For a bladder scan, try not to let your pet urinate right before the visit.' },
      },
    ],
  },
  {
    slug: { vi: 'dieu-tri-cap-cuu', en: 'treatment-emergency' },
    icon: 'heartPulse',
    photo: 'dog3',
    formValue: 'dieu-tri-cap-cuu',
    title: { vi: 'Điều trị bệnh & cấp cứu', en: 'Treatment & urgent care' },
    short: {
      vi: 'Điều trị nội khoa, truyền dịch, theo dõi sát các ca bệnh nặng và tình huống khẩn cấp.',
      en: 'Medical treatment, IV fluids and close monitoring for serious and urgent cases.',
    },
    metaTitle: {
      vi: 'Điều trị bệnh & cấp cứu chó mèo – Bình Mỹ, Củ Chi',
      en: 'Pet Treatment & Urgent Care in Binh My, Cu Chi',
    },
    metaDescription: {
      vi: 'Điều trị bệnh cho chó mèo: nôn, tiêu chảy, Parvo, Care, ngộ độc, bỏ ăn… Truyền dịch, theo dõi sát tại PKTY Huỳnh Như, Bình Mỹ. Gọi ngay 0961 291 597.',
      en: 'Treatment for sick dogs and cats — vomiting, diarrhoea, parvovirus, distemper, poisoning, loss of appetite. IV fluids and close monitoring at Huynh Nhu Vet. Call 0961 291 597.',
    },
    intro: {
      vi: 'Khi bé ốm, mỗi giờ đều quan trọng. Phòng khám điều trị các bệnh thường gặp ở chó mèo như viêm dạ dày ruột, Parvo, Care, bệnh hô hấp, bệnh da, ngộ độc… với truyền dịch, máy theo dõi và chăm sóc sát sao. Nhiều khách hàng đã đưa bé đến sau khi điều trị ở nơi khác chưa khỏi — bác sĩ luôn tìm đúng nguyên nhân trước khi điều trị.',
      en: 'When your pet is sick, every hour matters. We treat common illnesses such as gastroenteritis, parvovirus, distemper, respiratory and skin disease and poisoning, with IV fluids, monitoring equipment and attentive care. Many clients come to us after treatment elsewhere did not work — we always look for the real cause before treating.',
    },
    signs: [
      { vi: 'Nôn hoặc tiêu chảy nhiều lần, phân có máu', en: 'Repeated vomiting or diarrhoea, blood in stool' },
      { vi: 'Bỏ ăn trên 24 giờ, li bì, mệt lả', en: 'Not eating for over 24 hours, very weak or lethargic' },
      { vi: 'Khó thở, thở gấp, ho nhiều', en: 'Difficulty breathing, rapid breathing or heavy coughing' },
      { vi: 'Nghi ăn phải chất độc, bị tai nạn, chảy máu', en: 'Suspected poisoning, accident or bleeding' },
      { vi: 'Co giật, đi đứng loạng choạng', en: 'Seizures or wobbly walking' },
    ],
    steps: [
      { title: { vi: 'Gọi trước cho phòng khám', en: 'Call ahead' }, text: { vi: 'Gọi 0961 291 597 để bác sĩ chuẩn bị sẵn khi bé tới.', en: 'Call 0961 291 597 so the vet can be ready when you arrive.' } },
      { title: { vi: 'Đánh giá & ổn định', en: 'Assess & stabilise' }, text: { vi: 'Kiểm tra dấu hiệu sinh tồn, ổn định tình trạng của bé trước tiên.', en: 'Vital signs are checked and your pet is stabilised first.' } },
      { title: { vi: 'Chẩn đoán', en: 'Diagnose' }, text: { vi: 'Xét nghiệm, siêu âm khi cần để tìm đúng nguyên nhân.', en: 'Tests and ultrasound as needed to find the real cause.' } },
      { title: { vi: 'Điều trị & theo dõi', en: 'Treat & monitor' }, text: { vi: 'Truyền dịch, dùng thuốc, theo dõi và cập nhật tình hình cho bạn.', en: 'IV fluids, medication and monitoring, with regular updates for you.' } },
    ],
    faqs: [
      {
        q: { vi: 'Bé bị nôn, tiêu chảy thì có nên tự mua thuốc cho uống?', en: 'Can I give my own medicine for vomiting or diarrhoea?' },
        a: { vi: 'Không nên. Nhiều thuốc của người gây độc cho chó mèo, và nôn – tiêu chảy có thể là dấu hiệu của Parvo hoặc bệnh nặng khác. Hãy gọi bác sĩ để được tư vấn.', en: 'Please don\'t. Many human medicines are toxic to pets, and vomiting or diarrhoea can be a sign of parvovirus or other serious disease. Call the vet for advice.' },
      },
      {
        q: { vi: 'Ngoài giờ mở cửa có liên hệ được không?', en: 'Can I reach you outside opening hours?' },
        a: { vi: 'Phòng khám mở cửa 8:00 – 20:00 mỗi ngày. Ngoài giờ, bạn hãy gọi hoặc nhắn Zalo số 0961 291 597 — bác sĩ sẽ phản hồi sớm nhất có thể.', en: 'We are open 8:00 AM – 8:00 PM daily. Outside those hours, call or message 0961 291 597 on Zalo and the vet will reply as soon as possible.' },
      },
    ],
  },
  {
    slug: { vi: 'phau-thuat', en: 'surgery' },
    icon: 'scissors',
    formValue: 'phau-thuat',
    title: { vi: 'Phẫu thuật & triệt sản', en: 'Surgery & spay/neuter' },
    short: {
      vi: 'Triệt sản và các ca phẫu thuật theo chỉ định, thực hiện trong điều kiện vô trùng.',
      en: 'Spay/neuter and other indicated surgery, performed under sterile conditions.',
    },
    metaTitle: {
      vi: 'Phẫu thuật & triệt sản chó mèo – Bình Mỹ, Củ Chi',
      en: 'Pet Surgery & Spay/Neuter in Binh My, Cu Chi',
    },
    metaDescription: {
      vi: 'Triệt sản chó mèo đực cái và phẫu thuật theo chỉ định tại PKTY Huỳnh Như. Khám và xét nghiệm trước mổ, gây mê an toàn, hướng dẫn chăm sóc hậu phẫu. Gọi 0961 291 597.',
      en: 'Spay and neuter for dogs and cats plus other indicated surgery at Huynh Nhu Vet. Pre-op exam and tests, safe anaesthesia and clear aftercare instructions.',
    },
    intro: {
      vi: 'Phẫu thuật luôn là quyết định lớn với chủ nuôi. Tại phòng khám, mọi ca mổ đều được khám và xét nghiệm trước, gây mê theo dõi cẩn thận và thực hiện trong điều kiện vô trùng. Triệt sản giúp ngăn mang thai ngoài ý muốn, giảm nguy cơ một số bệnh sinh sản và hạn chế hành vi đánh dấu lãnh thổ.',
      en: 'Surgery is always a big decision for pet owners. Every procedure at our clinic starts with an exam and pre-op tests, uses carefully monitored anaesthesia and is performed under sterile conditions. Spaying and neutering prevents unwanted litters, lowers the risk of some reproductive diseases and reduces marking behaviour.',
    },
    signs: [
      { vi: 'Muốn triệt sản cho chó mèo đực hoặc cái', en: 'You would like to spay or neuter your pet' },
      { vi: 'Bé có khối u, vết thương cần khâu', en: 'Your pet has a lump or a wound that needs stitches' },
      { vi: 'Sỏi bàng quang hoặc dị vật cần lấy ra (theo chỉ định của bác sĩ)', en: 'Bladder stones or a foreign body that must be removed (as advised by the vet)' },
    ],
    steps: [
      { title: { vi: 'Tư vấn & khám trước mổ', en: 'Consult & pre-op exam' }, text: { vi: 'Đánh giá sức khỏe, xét nghiệm máu và giải thích rõ quy trình, chi phí.', en: 'Health check, blood tests and a clear explanation of procedure and cost.' } },
      { title: { vi: 'Nhịn ăn trước mổ', en: 'Fasting' }, text: { vi: 'Cho bé nhịn ăn khoảng 8–12 tiếng theo hướng dẫn của bác sĩ.', en: 'Fast your pet for about 8–12 hours as instructed.' } },
      { title: { vi: 'Phẫu thuật', en: 'Surgery' }, text: { vi: 'Gây mê, theo dõi liên tục và phẫu thuật trong điều kiện vô trùng.', en: 'Anaesthesia, continuous monitoring and a sterile procedure.' } },
      { title: { vi: 'Hậu phẫu', en: 'Aftercare' }, text: { vi: 'Hướng dẫn chăm sóc vết mổ, dùng thuốc và hẹn lịch tái khám, cắt chỉ.', en: 'Wound care, medication and follow-up / stitch removal appointment.' } },
    ],
    faqs: [
      {
        q: { vi: 'Nên triệt sản cho chó mèo ở độ tuổi nào?', en: 'At what age should pets be spayed or neutered?' },
        a: { vi: 'Thường từ khoảng 6 tháng tuổi, tùy giống và thể trạng. Bác sĩ sẽ khám và tư vấn thời điểm phù hợp nhất cho bé.', en: 'Usually from around 6 months old, depending on breed and size. The vet will advise on the best timing for your pet.' },
      },
      {
        q: { vi: 'Sau triệt sản bao lâu thì bé hồi phục?', en: 'How long does recovery take after spay/neuter?' },
        a: { vi: 'Đa số bé đi lại, ăn uống bình thường sau 1–2 ngày. Vết mổ lành sau khoảng 7–10 ngày; trong thời gian này cần đeo loa chống liếm và giữ vết mổ khô sạch.', en: 'Most pets walk and eat normally within 1–2 days. The incision heals in about 7–10 days; keep it clean and dry and use a cone to stop licking.' },
      },
    ],
  },
  {
    slug: { vi: 'cham-soc-rang-mieng', en: 'dental-care' },
    icon: 'tooth',
    formValue: 'cham-soc-rang-mieng',
    title: { vi: 'Chăm sóc răng miệng', en: 'Dental care' },
    short: {
      vi: 'Cạo vôi răng, kiểm tra nướu và xử lý hôi miệng, giúp bé ăn uống ngon miệng hơn.',
      en: 'Scaling, gum checks and bad-breath treatment so your pet can eat comfortably.',
    },
    metaTitle: {
      vi: 'Cạo vôi răng cho chó mèo – Bình Mỹ, Củ Chi',
      en: 'Pet Dental Care & Scaling in Binh My, Cu Chi',
    },
    metaDescription: {
      vi: 'Cạo vôi răng, điều trị viêm nướu, hôi miệng cho chó mèo tại PKTY Huỳnh Như, 138 Hà Duy Phiên, Bình Mỹ. Bảo vệ răng miệng và sức khỏe lâu dài cho bé. Gọi 0961 291 597.',
      en: 'Dental scaling and treatment for gum disease and bad breath in dogs and cats at Huynh Nhu Vet, 138 Ha Duy Phien, Binh My. Call 0961 291 597.',
    },
    intro: {
      vi: 'Phần lớn chó mèo trên 3 tuổi có vấn đề về răng miệng nhưng chủ nuôi thường không để ý. Vôi răng và viêm nướu không chỉ gây hôi miệng, đau khi ăn mà vi khuẩn còn có thể ảnh hưởng đến tim, gan và thận. Chăm sóc răng định kỳ giúp bé khỏe mạnh và sống lâu hơn.',
      en: 'Most dogs and cats over three have some dental disease, yet it often goes unnoticed. Tartar and gum inflammation cause bad breath and pain when eating, and the bacteria can affect the heart, liver and kidneys. Regular dental care helps your pet live a longer, healthier life.',
    },
    signs: [
      { vi: 'Hôi miệng kéo dài', en: 'Persistent bad breath' },
      { vi: 'Răng ố vàng, nhiều mảng vôi nâu', en: 'Yellow or brown tartar on the teeth' },
      { vi: 'Nướu đỏ, sưng hoặc chảy máu', en: 'Red, swollen or bleeding gums' },
      { vi: 'Ăn một bên, rơi thức ăn, ngại nhai đồ cứng', en: 'Chewing on one side, dropping food or avoiding hard food' },
    ],
    steps: [
      { title: { vi: 'Kiểm tra răng miệng', en: 'Oral exam' }, text: { vi: 'Đánh giá mức độ vôi răng, viêm nướu, răng lung lay.', en: 'We check tartar, gum inflammation and loose teeth.' } },
      { title: { vi: 'Khám trước gây mê', en: 'Pre-anaesthetic check' }, text: { vi: 'Cạo vôi kỹ cần gây mê nhẹ, nên bé được khám và xét nghiệm trước.', en: 'A thorough clean needs light anaesthesia, so your pet is checked first.' } },
      { title: { vi: 'Cạo vôi & đánh bóng', en: 'Scale & polish' }, text: { vi: 'Làm sạch vôi răng trên và dưới nướu, đánh bóng bề mặt răng.', en: 'Tartar is removed above and below the gum line, then teeth are polished.' } },
      { title: { vi: 'Hướng dẫn tại nhà', en: 'Home care' }, text: { vi: 'Cách chải răng và chọn đồ ăn giúp răng bé sạch lâu hơn.', en: 'How to brush and choose food that keeps teeth clean longer.' } },
    ],
    faqs: [
      {
        q: { vi: 'Bao lâu nên cạo vôi răng cho chó mèo?', en: 'How often does my pet need a dental clean?' },
        a: { vi: 'Tùy từng bé, thường 1–2 năm một lần. Bé giống nhỏ hoặc nhiều vôi răng có thể cần thường xuyên hơn. Bác sĩ sẽ kiểm tra răng trong mỗi lần khám tổng quát.', en: 'It depends on the pet — typically every 1–2 years. Small breeds or pets with heavy tartar may need it more often. We check teeth at every wellness exam.' },
      },
    ],
  },
]

/** Clinic-wide FAQs shown on the home and contact pages. */
export const generalFaqs: Faq[] = [
  {
    q: { vi: 'Phòng khám mở cửa vào giờ nào?', en: 'What are your opening hours?' },
    a: { vi: 'Phòng khám mở cửa từ 8:00 đến 20:00 tất cả các ngày trong tuần, kể cả Chủ nhật.', en: 'We are open from 8:00 AM to 8:00 PM every day, including Sundays.' },
  },
  {
    q: { vi: 'Có cần đặt lịch trước không?', en: 'Do I need an appointment?' },
    a: { vi: 'Bạn có thể đến trực tiếp, nhưng nên gọi hoặc nhắn Zalo 0961 291 597 trước để bác sĩ sắp xếp thời gian, tránh phải chờ lâu.', en: 'Walk-ins are welcome, but please call or message 0961 291 597 on Zalo first so the vet can set aside time and you don\'t have to wait.' },
  },
  {
    q: { vi: 'Phòng khám nằm ở đâu?', en: 'Where is the clinic?' },
    a: { vi: 'Phòng khám ở 138 Hà Duy Phiên, xã Bình Mỹ, TP. Hồ Chí Minh (trước đây thuộc huyện Củ Chi), thuận tiện cho khách ở Bình Mỹ, Củ Chi và Hóc Môn.', en: 'We are at 138 Ha Duy Phien, Binh My Commune, Ho Chi Minh City (formerly Cu Chi District), convenient for Binh My, Cu Chi and Hoc Mon.' },
  },
  {
    q: { vi: 'Phòng khám nhận khám cho những loài nào?', en: 'Which animals do you treat?' },
    a: { vi: 'Chúng tôi chủ yếu khám và điều trị cho chó và mèo. Với các thú cưng khác, vui lòng gọi trước để được tư vấn.', en: 'We mainly treat dogs and cats. For other pets, please call ahead for advice.' },
  },
]
