# Gym Fit App 💪

Gym Fit App adalah aplikasi mobile berbasis **React Native menggunakan Expo dan Expo Router** yang dirancang untuk membantu pengguna mengelola aktivitas kebugaran, latihan gym, serta memantau progres kesehatan secara digital.  
Aplikasi ini terintegrasi dengan **Gym Fit Backend API (Node.js + Prisma)**.

---

## 🚀 Tech Stack
- Expo (React Native)
- Expo Router
- TypeScript
- Axios / Fetch API
- Expo Secure Store
- Node.js (Backend API)

---

## 📦 Requirements
Pastikan tools berikut sudah terinstall:

- Node.js (disarankan versi LTS)
- npm
- Expo CLI
- Android Emulator / iOS Simulator / Expo Go

Cek Expo:
```bash
npx expo --version
````

---

## ⚙️ Installation

Clone repository:

```bash
git clone https://github.com/username/gym-fit-project.git
cd gym-fit-project
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Running the App (Expo)

Jalankan aplikasi:

```bash
npx expo start
```

Opsi menjalankan:

* Tekan **a** → Android Emulator
* Tekan **i** → iOS Simulator (macOS)
* Scan QR → Expo Go (Android / iOS)

---

## 🔐 Environment Variables

Buat file `.env` di root project:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

> ⚠️ File `.env` bersifat rahasia dan **tidak boleh di-commit ke repository**

Gunakan di code:

```ts
process.env.EXPO_PUBLIC_API_URL
```

---

## 📁 Project Structure

```
gym-fit-project/
├── app/                    # expo-router (screens & navigation)
│   ├── (tabs)/             # main tab navigation
│   ├── _layout.tsx         # root layout
│   ├── _layout.tsx         # root layout
│   ├── index.tsx           # entry screen
│   └── profile.tsx
├── assets/                 # images, icons, fonts
├── src/
│   ├── components/         # reusable UI components
│   ├── services/           # API & axios config
│   ├── hooks/              # custom hooks
│   ├── utils/              # helper & utilities
│   ├── constants/          # theme, colors, config
│   └── types/              # global types
├── .expo/
├── .env
├── .gitignore
├── app.json
├── eslint.config.js
├── expo-env.d.ts
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔗 API Integration

Aplikasi terhubung ke **Gym Fit Backend API**.

Contoh konfigurasi Axios:

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});
```

---

## 🔑 Authentication Flow

1. User register / login
2. Backend mengembalikan **JWT token**
3. Token disimpan menggunakan **Expo Secure Store**
4. Token dikirim ke API melalui header:

```http
Authorization: Bearer <token>
```

---

## 🎯 Core Features

* Register & Login user
* Profil user (goal, tinggi, berat, activity level)
* Rekomendasi mission gym
* Pilih mission
* Session latihan harian
* Log latihan & progres
* Riwayat latihan

---

## 🧪 Development Tips

Reset cache Expo:

```bash
npx expo start -c
```

Install dependency Expo-native:

```bash
npx expo install expo-secure-store
```

---

## 📝 Notes

* Folder `node_modules` dan file `.env` **tidak masuk git**
* Gunakan **Expo Go** untuk testing cepat
* Untuk akses API dari HP fisik, gunakan **IP lokal**, bukan `localhost`

Contoh:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.10:3000/api
```

---

## 🐞 Troubleshooting

Jika app tidak reload:

```bash
npx expo start -c
```

Jika API tidak terbaca:

* Pastikan backend berjalan
* Pastikan HP dan laptop satu jaringan

---

## 🤝 Contributing

Kontribusi sangat terbuka:

1. Fork repository
2. Buat branch fitur
3. Commit perubahan
4. Ajukan Pull Request

---
