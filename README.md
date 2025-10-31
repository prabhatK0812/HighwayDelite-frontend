# 🚗 HighwayDelite — Frontend

### 🏕️ Explore. Book. Experience the Highways of India.

A modern React + TypeScript application for booking **highway experiences** — Dhabas, Camping, Treks, Safaris, and more!  
Built with **Vite, TailwindCSS, React Router**, and connected to a **Node + Express + MongoDB backend**.

---

## ⚡️ Tech Stack

| Category | Technologies |
|-----------|--------------|
| **Frontend Framework** | React 18 + TypeScript (Vite) |
| **Styling** | Tailwind CSS |
| **Routing** | React Router DOM |
| **State Handling** | React Hooks (useState, useEffect) |
| **Backend (Integrated)** | Node.js, Express.js, MongoDB |
| **Deployment** | Vercel (Frontend) + Render/Vercel (Backend) |

---

## ✨ Features

✅ Responsive and clean UI using TailwindCSS  
✅ Explore highway experiences with images and prices  
✅ Search and filter functionality  
✅ Detailed pages with **date & time slot selection**  
✅ Checkout with **promo code** & booking summary  
✅ Confirmation screen with discount message  
✅ Connected to live backend (MongoDB)  
✅ Fully TypeScript-typed code  

---

## 🧩 Folder Structure

frontend/
├── public/
├── src/
│ ├── components/ # Navbar, ExperienceCard, SlotButton, Loader
│ ├── data/ # Dummy data (fallback) => just for testing
│ ├── pages/ # Home, Details, Checkout, Confirmation
│ ├── types/ # Type definitions
│ ├── App.tsx # Main routing file
│ ├── main.tsx # React root entry
│ └── index.css # Tailwind styles
├── package.json
├── tsconfig.json
└── vite.config.ts



---

## 🧠 How It Works

1️⃣ Users land on the **Home Page** with 8 featured experiences.  
2️⃣ Clicking on an experience opens the **Details Page**.  
3️⃣ User selects **date, time, and quantity** → proceeds to **Checkout Page**.  
4️⃣ At checkout, user can enter a **promo code (DELITE10 or SAVE50 or WELCOME100 )** to get discount.  
5️⃣ Booking confirmed → navigates to **Confirmation Page** with success message.

---

## ⚙️ Installation & Setup

Clone the repository:
```bash
git clone https://github.com/prabhatK0812/HighwayDelite-frontend.git
cd HighwayDelite-frontend
