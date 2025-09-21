# E-commerce Microservices Frontend

Bu proje, **React + TypeScript** ile geliştirilmiş bir **e-ticaret uygulaması frontend’idir**.  
Kullanıcılar kayıt olabilir, giriş yapabilir ve sistemde oturum açabilir. Uygulama, state yönetimi için **Redux Toolkit** ve sayfa yönlendirmeleri için **React Router** kullanmaktadır.  

---

## 🚀 Kullanılan Teknolojiler
- **React** (TypeScript ile)  
- **Redux Toolkit** – state yönetimi  
- **React Router DOM** – sayfa yönlendirmeleri  
- **Formik & Yup** – form yönetimi ve validasyon  
- **Axios** – backend API istekleri  
- **Bootstrap / MDBootstrap** – UI tasarımı  

---

## 🔐 Özellikler
- Kullanıcı **kayıt (register)**  
- Kullanıcı **giriş (login)**  
- Form validasyonu (Formik + Yup)  
- Oturum yönetimi (Redux Toolkit)  
- Protected Routes (React Router ile)  

---

## 📂 Proje Yapısı (Örnek)
```
src/
 ┣ components/
 ┃ ┣ Register.tsx
 ┃ ┣ Login.tsx
 ┣ form/
 ┃ ┣ RegisterFormSchemas.ts
 ┣ store/
 ┃ ┣ index.ts
 ┃ ┣ authSlice.ts
 ┣ pages/
 ┃ ┣ Home.tsx
 ┣ App.tsx
 ┗ main.tsx
```

---

## ⚙️ Kurulum ve Çalıştırma
1. Repoyu klonla:
   ```bash
   git clone https://github.com/abbscbn/E-commerce-Microservices-Frontend.git
   cd E-commerce-Microservices-Frontend
   ```

2. Bağımlılıkları yükle:
   ```bash
   npm install
   ```

3. Development server’ı çalıştır:
   ```bash
   npm run dev
   ```

4. Uygulamayı aç:  
   👉 [http://localhost:5173](http://localhost:5173)

---

## 🔗 Backend
Bu frontend uygulaması, Spring Boot ile yazılmış **E-commerce Microservices Backend** projesi ile haberleşmektedir.  
---

