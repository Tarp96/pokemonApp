# Pokémon Explorer (React)

A lightweight React app for exploring Pokémon using the public [PokeAPI](https://pokeapi.co/). Browse every Pokémon, open a rich detail page (types, abilities, weight, height, sounds, game appearances, sprites, evolution trees, and alternate forms), create an account, and save favourites — all with Firebase-backed auth and storage.

---

## ✨ Shipped Features

- **Full Pokédex browsing** powered by PokeAPI.
- **Detail pages for every Pokémon** with:
  - weight, height, types
  - abilities & sounds
  - sprites/pictures
  - which games the Pokémon featured in
  - evolution trees & alternate forms
- **Account creation** (Firebase Authentication).
- **Save favourites** when signed in (Firebase-backed persistence).
- **Filter by type** to quickly narrow your search.
- **Firebase integration** for auth and data storage.

> 🔐 Note: You’ll need your **own Firebase project** to run auth/favourites locally. Fallback: the app still lets you browse Pokémon without Firebase configured, but sign-up/sign-in and favourites will be disabled.

---

## 🧰 Tech Stack

- **React 19** + **Vite 6**
- **React Router 7**
- **Firebase 12** — Auth + **Firestore** (favourites)
- **Howler** — audio playback for Pokémon cries
- **React Toastify**, **React Spinners**, **React Icons**
- **ApexCharts + react-apexcharts** (where used in UI)

---

## ✅ Requirements

- **Node.js ≥ 18** (LTS recommended)
- **npm** (or yarn/pnpm)

---

## 🚀 Getting Started

### 1) Clone & Install

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
```

### 2) Environment Variables

Create a `.env` file in the project root. (No `.env` is committed.)

```bash
# PokeAPI (optional — defaults may exist in code)
VITE_POKEAPI_BASE_URL=https://pokeapi.co/api/v2

# Firebase — REQUIRED for auth & favourites
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id  # if Analytics is enabled
```

> All Firebase keys **must** be present for the auth/favourites flow to work.

### 3) Firebase Setup (once per project)

1. Go to **Firebase Console** → **Create project** (or use an existing one).
2. **Add app** → **Web**. Copy the config values into `.env` as shown above.
3. **Authentication** → **Sign-in method** → enable at least **Email/Password** (and any other providers you plan to use).
4. **Firestore** (or Realtime Database) → create a database (for favourites). Start in **Test mode** for local development if needed.
5. (Optional) **Storage** → create a bucket if you store any files (e.g., profile images).
6. (Optional) **Analytics** → enable to get a **measurement ID**.

> ⚠️ Security rules should be configured for production. For development, test-mode rules are convenient but not secure — don’t deploy them as-is.

## 🔐 Firebase Usage & Data Model

- **Auth**: Email/Password and Google (Popup).
- **Firestore**:
  - Collection path: `/users/{uid}/favorites/{pokemonId}`
  - Document ID: `pokemon.id` as **string**
  - Fields:
    - `name` (string)
    - `id` (number)
    - `sprite` (string \| null)
    - `types` (array<string>)
    - `generation` (string, defaults to `"unknown"`)
    - `cries` (string \| null)
    - `savedAt` (timestamp)

### Example (from code)

```js
// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

```js
// src/services/favoriteService.js
// addFavorite, removeFavorite, isAlreadyFavorited, getAllFavorites
// documents live under users/{uid}/favorites/{pokemonId}
```

---

## 🧩 Auth Providers (Email/Password + Google)

1. Firebase Console → **Authentication → Sign‑in method**:
   - Enable **Email/Password**
   - Enable **Google**
2. **Authentication → Settings → Authorized domains**:
   - Add `localhost` for local dev and your deployed domain (e.g., `your-app.vercel.app`).
3. Ensure your `.env` values are present. For Google popup sign‑in you don’t need custom redirect URIs — but your domain **must** be authorized.

---

## 🔒 Firestore Security Rules (Dev → Prod)

> Development example that restricts each user to their own data. Tighten before production as needed.

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

## ☁️ Storage Rules (optional)

If you later upload user files (e.g., avatars):

```js
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{uid}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

---

## 🧰 Troubleshooting

- **auth/operation-not-allowed** → Enable the provider in Firebase Auth.
- **auth/unauthorized-domain** → Add your domain under Auth → Settings → Authorized domains.
- **PERMISSION_DENIED / Missing or insufficient permissions** → Check Firestore rules and confirm you’re signed in.
- **Favourites not saving** → Ensure Firestore is created and `.env` is loaded (restart after editing `.env`).

---

### 4) Run the App (Dev)

```bash
npm run dev
```

Open the printed local URL (commonly `http://localhost:5173`).

### 5) Production Build

```bash
npm run build
npm run preview   # optional local preview
```

---

## 📁 Project Scripts

From `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

## 🗂️ File Layout (Firebase & services)

```
src/
  firebaseConfig.js
  services/
    favoriteService.js
    authService.js
```

---

## 🧭 App Overview

- **Home / Pokédex**: browse and filter by type.
- **Pokémon Details**: full information including types, abilities, stats (where used), sounds, sprites, games, evolution/alternate forms.
- **Auth**: sign up/in with Firebase; favourites persist per user.
- **UI**: responsive cards, thin borders, tasteful gradients; readable type badges.

> Project preference: **camelCase** for class names; subtle **blue–white gradient** backgrounds on display screens.

---

## 🔧 Configuration Notes

- If you refresh on a nested route during local dev, Vite handles SPA fallback automatically. For static hosting (e.g., GitHub Pages), ensure SPA fallback is configured.
- If auth screens fail to load, double‑check that your **.env** keys are present and that **Authentication** → **Sign-in providers** include the method you’re using.
- If favourites don’t save, verify your database is created (Firestore or Realtime DB) and that the client has permission per your rules in development.

---

## 🧪 Dev Tips

- Use the browser DevTools Network tab to watch PokeAPI requests and spot rate‑limit or CORS errors.
- Log Firebase initialization only once (hot reload can re-run modules; guard against duplicate `initializeApp`).
- Keep API layers (fetch helpers) separate from UI components for easier testing.

---

## 🗺️ Roadmap (Planned)

- **Mini‑game**: catch Pokémon to earn coins; spend coins to build your ultimate team.
- **User profile polish**: more relevant data and a richer profile experience.

---

## 🙏 Acknowledgements

- [PokeAPI](https://pokeapi.co/) for the amazing dataset.
- [Firebase](https://firebase.google.com/) for auth and storage.

---
