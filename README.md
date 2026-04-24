# 🎓 Certificate Verification System
**PW Skills · Lendi Institute of Engineering and Technology · 2026**

---

## 📁 Folder Structure

```
cert-verify/
├── backend/
│   ├── models/
│   │   └── Student.js          # Mongoose schema
│   ├── .env                    # MongoDB URI & port (edit this)
│   ├── server.js               # Express API server
│   ├── importStudents.js       # One-time seed script (all 29 students)
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── VerifyPage.js   # Main verification UI
│   │   │   └── AdminPage.js    # Excel upload admin page
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
└── README.md
```

---

## ⚡ Quick Start (Local)

### 1. Backend Setup

```bash
cd backend
npm install
```

Edit `.env` (MongoDB URI is already set):
```
MONGODB_URI=mongodb+srv://...   ← already filled
PORT=5000
FRONTEND_URL=http://localhost:3000
```

Start the server:
```bash
npm start
```

### 2. Import Student Data (ONE TIME)

```bash
cd backend
node importStudents.js
```
This seeds all **29 students** from Lendi IETC (Jan–Mar 2026) into MongoDB Atlas.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```
Opens at `http://localhost:3000`

---

## 🔗 URLs

| URL | Description |
|-----|-------------|
| `http://localhost:3000/` | Certificate Verification Page |
| `http://localhost:3000/admin` | Admin: Upload Excel |
| `http://localhost:5000/student/:id` | API: Verify by Student ID |
| `http://localhost:5000/admin/upload` | API: POST Excel file |
| `http://localhost:5000/admin/students` | API: List all students |

---

## 📱 QR Code

Generate a **static QR code** pointing to:
```
https://yourdomain.com/
```
Use: https://qr.io or https://qrcode-monkey.com

The QR never changes — users scan → enter their Student ID → verified.

---

## 🧪 Test Student IDs

| Student ID | Name |
|-----------|------|
| PW/VSP/LENDI/IN/001 | Burada Dhana Lakshmi |
| PW/VSP/LENDI/IN/010 | Arisetti Vybhava Lakshmi |
| PW/VSP/LENDI/IN/027 | Chelluri Lalitha Madhuri |
| PW/VSP/LENDI/IN/028 | Gara Naga Sai Nareen |
| PW/VSP/LENDI/IN/029 | Bulli Tim Kumar |

---

## 🚀 Deploy to Production

### Backend → Render.com (Free)
1. Push `backend/` folder to GitHub
2. Create new Web Service on Render
3. Set env var: `MONGODB_URI=...`
4. Build: `npm install` · Start: `node server.js`

### Frontend → Vercel (Free)
1. Push `frontend/` folder to GitHub
2. Import to Vercel
3. Set env var: `REACT_APP_API_URL=https://your-render-backend.onrender.com`
4. Deploy

---

## 📊 API Reference

### GET /student/:student_id
```json
// Success (200)
{ "success": true, "data": { "student_id": "PW/VSP/LENDI/IN/001", "name": "Burada Dhana Lakshmi", ... } }

// Not found (404)
{ "success": false, "message": "Invalid Certificate" }
```

### POST /admin/upload
- Body: `multipart/form-data` with field `file` (.xlsx)
```json
// Success
{ "success": true, "results": { "inserted": 29, "updated": 0, "skipped": 3 } }
```

---

## 🏫 College Details
- **College:** Lendi Institute of Engineering and Technology
- **Internship Period:** 26 January 2026 – 26 March 2026
- **Total Students:** 29
- **Domains:** Ethical Hacking, AWS IoT Cloud Engineering, Business Analytics & Data Visualization, Google Data Analytics
