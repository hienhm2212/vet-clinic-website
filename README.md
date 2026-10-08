# Website Phòng Khám Thú Y Huỳnh Như

Website của **Phòng Khám Thú Y Huỳnh Như**, 138 Hà Duy Phiên, xã Bình Mỹ (Củ Chi), TP. Hồ Chí Minh.
Dựng bằng [Astro](https://astro.build): xuất ra HTML tĩnh nên tải nhanh, và Google đọc được toàn bộ nội dung.

## Chạy trên máy

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # kiểm tra kiểu + build ra thư mục dist/
npm run preview    # xem bản build
```

## Sửa nội dung

Hầu hết nội dung nằm trong `src/data/`, không cần sửa giao diện:

| File | Nội dung |
|---|---|
| `src/data/clinic.ts` | Tên, địa chỉ, số điện thoại, Zalo, Facebook, giờ mở cửa, bác sĩ |
| `src/data/services.ts` | 6 dịch vụ (mô tả, dấu hiệu, quy trình, FAQ) và FAQ chung |
| `src/data/reviews.ts` | Đánh giá Google của khách hàng |
| `src/data/photos.ts` | Ảnh, mô tả ảnh (alt) và chú thích |

Mỗi đoạn chữ có hai bản `{ vi: '…', en: '…' }`.
Thêm ảnh: chép file vào `src/assets/photos/`, khai báo trong `photos.ts`. Astro tự nén sang AVIF/WebP.
Nếu đổi logo hoặc thông tin trên ảnh chia sẻ, chạy `npm run og` để tạo lại `public/og-image.jpg` và các icon.

## Cấu trúc trang

| Tiếng Việt | English |
|---|---|
| `/` | `/en/` |
| `/dich-vu/` và `/dich-vu/<dịch-vụ>/` | `/en/services/` và `/en/services/<service>/` |
| `/gioi-thieu/` | `/en/about/` |
| `/lien-he/` (form đặt lịch) | `/en/contact/` |

## SEO đã có sẵn

- Title và meta description riêng cho từng trang; canonical; `hreflang` vi/en
- Open Graph và ảnh chia sẻ 1200×630 cho Zalo/Facebook
- Dữ liệu có cấu trúc JSON-LD: `VeterinaryCare` (tên, địa chỉ, SĐT, giờ mở cửa), `Service`, `FAQPage`, `BreadcrumbList`
- `sitemap-index.xml` và `robots.txt` được tạo tự động
- Mỗi dịch vụ có một trang riêng, nhắm các từ khóa địa phương (VD: "tiêm phòng chó mèo Củ Chi")
- Lighthouse (mobile): Performance 99–100, Accessibility 100, SEO 100

## Biến môi trường khi deploy

| Biến | Bắt buộc | Ý nghĩa |
|---|---|---|
| `SITE_URL` | **Có** (trừ khi deploy trên Vercel) | Tên miền chính thức, VD `https://thuyhuynhnhu.vn`. Dùng cho canonical, sitemap và ảnh chia sẻ. Trên Vercel, tên miền production được lấy tự động. |
| `PUBLIC_FORM_ENDPOINT` | Không | URL nhận form, VD Formspree `https://formspree.io/f/xxxx`. Khi có, yêu cầu đặt lịch được gửi về email. Khi không có, form tạo sẵn một tin nhắn để khách gửi qua Zalo hoặc SMS. |

**Deploy lên Vercel:** import repo; Vercel tự nhận Astro, không cần cấu hình thêm.

## Sau khi deploy (quan trọng cho SEO địa phương)

1. Thêm website vào [Google Search Console](https://search.google.com/search-console) và gửi `sitemap-index.xml`.
2. Cập nhật **Google Business Profile** (Google Maps): gắn link website, giữ tên, địa chỉ và SĐT **giống hệt** `clinic.ts`.
3. Mời khách hàng để lại đánh giá trên Google Maps.
4. Thêm link Facebook vào `clinic.facebook` nếu có.

## Kiểm thử

```bash
npx playwright install chromium   # lần đầu
npm run build && npm test         # SEO, link hỏng, accessibility (axe), menu, form, lightbox…
npm run lighthouse                 # cần `npm run preview -- --port 4329` đang chạy
```
