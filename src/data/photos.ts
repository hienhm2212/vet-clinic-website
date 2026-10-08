import type { ImageMetadata } from 'astro'
import type { T } from '../i18n'
import dog from '../assets/photos/dog.jpg'
import dog2 from '../assets/photos/dog-2.jpg'
import dog3 from '../assets/photos/dog-3.jpg'
import meo from '../assets/photos/meo.jpg'
import meo2 from '../assets/photos/meo-2.jpg'
import meo3 from '../assets/photos/meo-3.jpg'
import meo4 from '../assets/photos/meo-4.jpg'
import soiThan from '../assets/photos/soi-than.jpg'
import clinicRoom from '../assets/photos/vet-rx.jpg'

export type Photo = { src: ImageMetadata; alt: T; caption: T }

export const photos = {
  dog: {
    src: dog,
    alt: { vi: 'Chó con lông vàng thè lưỡi tinh nghịch tại phòng khám thú y Huỳnh Như', en: 'A tan puppy sticking out its tongue at Huynh Nhu Vet' },
    caption: { vi: 'Bé cún tinh nghịch', en: 'A cheeky pup' },
  },
  dog2: {
    src: dog2,
    alt: { vi: 'Bác sĩ nắm chân chú chó con lông đen để thăm khám', en: 'The vet gently holding a black puppy\'s paw during a check-up' },
    caption: { vi: 'Thăm khám nhẹ nhàng', en: 'Gentle check-ups' },
  },
  dog3: {
    src: dog3,
    alt: { vi: 'Chó Poodle đang được truyền dịch và theo dõi bằng máy monitor', en: 'A poodle on IV fluids with a patient monitor' },
    caption: { vi: 'Truyền dịch & theo dõi sát', en: 'IV fluids & close monitoring' },
  },
  meo: {
    src: meo,
    alt: { vi: 'Mèo cam nằm trên bàn khám thú y', en: 'An orange cat lying on the exam table' },
    caption: { vi: 'Khám sức khỏe cho mèo', en: 'Cat health check' },
  },
  meo2: {
    src: meo2,
    alt: { vi: 'Mèo Anh lông ngắn xám trắng nằm thư giãn', en: 'A grey and white British Shorthair cat relaxing' },
    caption: { vi: 'Bé mèo khỏe mạnh', en: 'A healthy, happy cat' },
  },
  meo3: {
    src: meo3,
    alt: { vi: 'Mèo đồi mồi mắt xanh nhìn vào ống kính', en: 'A tortoiseshell cat with green eyes looking at the camera' },
    caption: { vi: 'Bệnh nhân đáng yêu', en: 'One of our sweet patients' },
  },
  meo4: {
    src: meo4,
    alt: { vi: 'Mèo con lông cam được bế ngửa trên tay', en: 'An orange kitten held belly-up' },
    caption: { vi: 'Mèo con đến tiêm phòng', en: 'Kitten vaccine visit' },
  },
  soiThan: {
    src: soiThan,
    alt: { vi: 'Viên sỏi được lấy ra đặt cạnh màn hình máy siêu âm tại phòng khám', en: 'A removed stone held next to the clinic\'s ultrasound screen' },
    caption: { vi: 'Siêu âm phát hiện sỏi', en: 'Stone found on ultrasound' },
  },
  clinicRoom: {
    src: clinicRoom,
    alt: { vi: 'Không gian bên trong Phòng Khám Thú Y Huỳnh Như', en: 'Inside Huynh Nhu Veterinary Clinic' },
    caption: { vi: 'Không gian phòng khám', en: 'Inside the clinic' },
  },
} satisfies Record<string, Photo>

export type PhotoKey = keyof typeof photos

export const galleryOrder: PhotoKey[] = ['clinicRoom', 'dog', 'meo', 'soiThan', 'dog3', 'meo2', 'dog2', 'meo3', 'meo4']
