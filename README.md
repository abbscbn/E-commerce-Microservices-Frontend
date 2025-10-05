# 🛍️ E-Commerce Frontend (React + TypeScript + Vite)

Bu proje, mikroservis tabanlı e-ticaret sisteminin **frontend (kullanıcı arayüzü)** kısmıdır.  
React ve TypeScript kullanılarak geliştirilmiş olup, modern UI kütüphaneleriyle desteklenmiştir.  
Kullanıcı işlemleri, ürün görüntüleme ve **admin paneli üzerinden CRUD işlemleri** bu arayüz aracılığıyla gerçekleştirilir.

---

## 🚀 Proje Genel Özeti

Frontend, üç temel rolü destekler:
- 👤 **Kullanıcı:** Kayıt olabilir, giriş yapabilir, ürünleri görüntüleyebilir, sepete ürün ekleyebilir ve sipariş oluşturabilir.  
- 🔐 **Admin:** Admin paneli üzerinden ürün ekleme, düzenleme, silme ve listeleme işlemlerini yapabilir.  
- ⚙️ **Sistem:** Backend servisleriyle (identity, product, order) iletişim kurarak token bazlı yetkilendirme ve veri yönetimi sağlar.

---

## 🧩 Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|------------|-----------|
| **React 19** | Kullanıcı arayüzü oluşturmak için |
| **TypeScript** | Tür güvenli geliştirme ortamı |
| **Vite** | Hızlı geliştirme ve build aracı |
| **React Router DOM v7** | Sayfalar arası yönlendirme |
| **Redux Toolkit** | Global state yönetimi |
| **Redux Persist** | Kullanıcı oturumunu local storage'da koruma |
| **Axios** | Backend API’leriyle HTTP isteği |
| **Material UI (MUI)** | Modern ve profesyonel arayüz bileşenleri |
| **Emotion / Styled** | MUI ile uyumlu CSS-in-JS stillendirme |
| **Tailwind CSS** | Hızlı ve esnek UI tasarımı |
| **Formik + Yup** | Form yönetimi ve doğrulama işlemleri |
| **GSAP** | Animasyonlar ve geçiş efektleri |
| **Lucide-React** | Hafif ve şık ikon seti |
| **Bootstrap** | Proje başlangıcında temel UI düzeni için kullanıldı |

---

## 🧱 Proje Yapısı

```
📦 e-commerce-microservices-frontend
├── src
│   ├── assets/              # Görseller ve statik dosyalar
│   ├── components/          # Yeniden kullanılabilir UI bileşenleri
│   ├── pages/               # Sayfa bileşenleri (Login, Register, Home, Cart, AdminPanel vs.)
│   ├── services/            # Axios servisleri (identityService, productService, orderService)
│   ├── slices/              # Redux slice’ları (authSlice, productSlice, basketSlice vs.)
│   ├── app/                 # Store yapılandırması
│   ├── routes/              # Router tanımlamaları
│   ├── types/               # TypeScript arayüzleri
│   ├── hooks/               # Özel hook’lar (örn: useAppDispatch, useAuth)
│   └── main.tsx             # Giriş noktası
```

---

## 🧑‍💻 Özellikler

### 👤 Kullanıcı Tarafı
- Kayıt olma ve giriş yapma işlemleri (`identity-service` üzerinden)
- JWT Token doğrulamasıyla korunan sayfalar
- Ürün listeleme, detay görüntüleme
- Ürünleri sepete ekleme ve sepeti yönetme
- Sipariş oluşturma ve sipariş sonucu ekranı (başarılı/başarısız mesajlar)
- Dinamik kullanıcı bilgilendirme (Snackbar / Alert yapısı ile)

### 🔐 Admin Paneli
- Admin olarak giriş yapılınca erişilebilir
- Ürün CRUD işlemleri (Create, Read, Update, Delete)
- Ürün görsellerini yükleme ve düzenleme
- Yetkilendirme kontrolü: Admin olmayan kullanıcılar bu sayfaya erişemez

### 🎨 Arayüz ve Tasarım
- Material UI + Tailwind ile modern, responsive tasarım
- GSAP ile geçiş animasyonları
- Lucide-React ikonları
- Snackbar ve Alert bileşenleriyle kullanıcı dostu hata/bilgilendirme mesajları

---

## ⚙️ Kullanılan Paketler

### 🧠 Durum Yönetimi
- `@reduxjs/toolkit`
- `react-redux`
- `redux-persist`

### 🌐 İstekler
- `axios`

### 🧭 Yönlendirme
- `react-router-dom@7`

### 🎨 UI / CSS
- `@mui/material`
- `@mui/icons-material`
- `@emotion/react`
- `@emotion/styled`
- `tailwindcss`
- `bootstrap`
- `lucide-react`

### 🧾 Form / Doğrulama
- `formik`
- `yup`

### ✨ Diğer
- `gsap` → sayfa geçişleri ve animasyonlar
- `classnames`, `clsx`, `tailwind-merge` → class yönetimi
- `tw-animate-css` → Tailwind ile CSS animasyonlarını kolaylaştırır

---

## 🛠️ Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Adımlar
1. Projeyi klonla:
   ```bash
   git clone https://github.com/abbascoban/e-commerce-microservices-frontend.git
   cd e-commerce-microservices-frontend
   ```
2. Bağımlılıkları yükle:
   ```bash
   npm install
   ```
3. Geliştirme sunucusunu başlat:
   ```bash
   npm run dev
   ```
4. Build almak için:
   ```bash
   npm run build
   ```

---

## 🌐 Örnek Sayfalar

| Sayfa | Açıklama |
|--------|----------|
| `/register` | Yeni kullanıcı kaydı |
| `/login` | Giriş ekranı |
| `/admin` | Admin paneli (sadece `ADMIN` rolü erişebilir) |

---

## 💾 Backend Entegrasyonu

Frontend, aşağıdaki servislerle entegre çalışır:

| Servis | Açıklama |
|--------|-----------|
| **identity-service** | Login, Register, Logout işlemleri |
| **product-service** | Ürün CRUD işlemleri |
| **order-service** | Sipariş oluşturma ve sepet yönetimi |

Tüm API istekleri `Axios` üzerinden yapılır ve JWT token otomatik olarak `Authorization` başlığına eklenir.

---

## 🧰 Geliştirici Notları
- `axios` interceptor yapısı ile token kontrolü sağlanır.  
- Token expired veya geçersiz olduğunda kullanıcı otomatik olarak logout edilir.  
- Global state yönetimi Redux Toolkit ile merkezi olarak yapılır.  
- UI, responsive olacak şekilde hem mobil hem desktop uyumludur.  
- Admin paneli sadece admin kullanıcılar tarafından erişilebilir.

---

## 👨‍💻 Geliştirici
**Abbas Çoban**  
Full-Stack Developer (React / Spring Boot / PostgreSQL)

---

## 🚀 Gelecekte Planlanan Geliştirmeler
- Kullanıcı profil düzenleme ekranı  
- Ürün yorum sistemi  
- Tema (dark/light) desteği  
- Sipariş geçmişi görüntüleme sayfası  
