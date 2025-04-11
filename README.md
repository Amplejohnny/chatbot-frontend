# Nimbou CMS Frontend (React + TypeScript)

This is the **frontend** for the **Nimbou CMS** web application — a modern content management system designed for simplicity and power. Built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**, it delivers a fast, responsive, and developer-friendly UI.

---

## 🚀 Prerequisites

- **Node.js** v18 or newer
- **Backend API** deployed (e.g., `https://nimbou-cms-backend.onrender.com`)
- **Docker** (optional, for containerized deployment)

---

## 🔧 Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Amplejohnny/chatbot-frontend.git
cd chatbot-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🐳 Docker Setup (Optional)

Build and run the frontend using Docker:

```bash
docker build -t nimbou-frontend .
docker run -p 5173:80 nimbou-frontend
```

---

## 🖼️ Tech Stack

- **React** – Component-based UI
- **TypeScript** – Static type safety
- **Vite** – Fast build tooling
- **Tailwind CSS** – Utility-first styling

---

## 📂 Project Structure

```
nimbou-frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── types/
│   └── main.tsx
├── index.html
├── tailwind.config.js
└── vite.config.ts
```

---

## ✨ License

This project is licensed under the [MIT License](LICENSE).
