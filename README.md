<h1 align="center">🔗 TinyLink — URL Shortener (MERN + Tailwind)</h1>

<p align="center">
  A clean, fast and fully-tested URL shortener built as a take-home assignment.<br/>
  Generates short links, tracks clicks, shows stats, and provides a smooth dashboard UI.
</p>

---

 
 
**API Health:** `/healthz` → should return `{ ok: true, version: "1.0" }`
---

## 🎥 Link  
📌 **Visit**  
👉 *https://tinylink-olive.vercel.app/*

---

---

## 🎥 Video Walkthrough  
📌 **Demo + Code Explanation Video:**  
👉 * https://drive.google.com/file/d/1Fhl1D_FV9IJNofpen4w3-IAU4uViJ09E/view?usp=drivesdk*

---

## 🤖 AI Assistance  
📌 **ChatGPT Transcript:**  
👉  *https://chatgpt.com/share/6920b46b-15e4-8002-a261-8b2eaf23f371*

---

# ⭐ Features Overview

| Feature | Description |
|--------|-------------|
| 🔗 **Create Short Links** | Convert long URLs to short codes. Optional custom code (6–8 chars). |
| 🚀 **Instant Redirect** | Visiting `/code` → redirects using HTTP 302. |
| 📊 **Stats Page** | View clicks, last clicked time, created date. |
| ❌ **Delete Short Links** | Removes the link permanently (redirect stops working → 404). |
| 📁 **Dashboard** | Table of all links with copy, delete, search & refresh. |
| 📱 **Responsive UI** | Built with Tailwind, modern & mobile-friendly. |
| 🧪 **Autograde-friendly** | Exactly follows required endpoints and route structure. |
| 💾 **MongoDB Atlas** | Cloud database with persistent storage. |
| ⚙️ **Health Check** | `/healthz` endpoint for automated testing. |

---

tinylink/
├── client/ (React + Tailwind)
│ ├── src/
│ │ ├── api.js
│ │ ├── components/
│ │ │ ├── AddLinkForm.jsx
│ │ │ └── LinkRow.jsx
│ │ ├── pages/
│ │ │ ├── Dashboard.jsx
│ │ │ └── Stats.jsx
│ │ ├── App.jsx
│ │ └── index.js
│ └── package.json
│
├── server/ (Node + Express + MongoDB)
│ ├── models/
│ │ └── Link.js
│ ├── routes/
│ │ └── links.js
│ ├── server.js
│ └── package.json
│
└── README.md


---

# 🛠️ Tech Stack

### **Frontend**
- ⚛️ React (Vite or CRA)
- 🎨 TailwindCSS
- 🔄 React Router

### **Backend**
- 🟢 Node.js + Express
- 🍃 MongoDB Atlas (Cloud)
- 🧩 Mongoose ORM

### **Deployment**
- **Frontend:** Vercel  
- **Backend:** Render 
- **Database:** MongoDB Atlas

---

# 🌐 API Endpoints (Required for Autograding)

### **POST /api/links**
Create new short link  
- Returns 409 if code already exists  
- Body:
```json
{
  "target": "https://example.com",
  "code": "custom01"
}
```


# 🧩 Project Architecture
GET /api/links

List all saved links

GET /api/links/:code

Get stats for a single short code

DELETE /api/links/:code

Deletes a link
Removes redirect and returns { success: true }

GET /:code

Redirect to target (302)

GET /healthz
{ "ok": true, "version": "1.0" }

🖥️ Pages & Routes (Frontend)
Page	Path	Description
🏠 Dashboard	/	Create, list, search and delete links
📊 Stats Page	/code/:code	View analytics for a specific short code
🔁 Redirect	/:code	Redirect handler (server-side)
❤️ Health check	/healthz	Required by autograder
⚙️ Environment Variables

Create .env in both client and server.

🟢 Server (.env)
PORT=5000
MONGO_URI="your mongodb atlas uri"
BASE_URL="http://localhost:5000"

🔵 Client (.env)
REACT_APP_BASE_URL="http://localhost:5000"


Restart frontend after editing:

npm start

🚀 Run Locally
Backend
cd server
npm install
npm run dev

Frontend
cd client
npm install
npm start



🤝 Acknowledgements

MongoDB Atlas for cloud database

Vercel for frontend deployment

Render / Railway for backend hosting

TailwindCSS for design system

<h3 align="center">✨ Built with MERN, TailwindCSS, and a lot of coffee ✨</h3> ```
