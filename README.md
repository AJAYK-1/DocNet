# 🩺 DocNet – Online Doctor Appointment Booking System

**DocNet** is a full-stack web application that allows users to book appointments with doctors online. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), the platform provides a smooth, responsive, and secure experience for both patients and doctors.

## 🚀 Features

- 🔒 Secure user and doctor authentication (JWT)
- 📅 Doctor availability scheduling and appointment booking
- 🧑‍⚕️ User and doctor dashboards
- 📊 Admin panel for managing users, doctors, and appointments
- 🌐 Responsive UI with Bootstrap, gsap and React

## 🛠 Tech Stack

**Frontend**  
- React.js  
- Bootstrap
- gsap

**Backend**  
- Node.js  
- Express.js  

**DataBase**
- MongoDB (Mongoose ODM)

**Tools**  
- Git & GitHub  
- Postman (for API testing)  
- MongoDB Compass  


## ⚙️ Installation

### Prerequisites
- Node.js and npm
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/AJAYK-1/docnet.git
cd docnet
```

### 2. Install dependencies for backend
```bash
cd backend
npm install express
```

### 3. Install dependencies for frontend
```bash
cd ../frontend
npm install vite@latest
```

### 4. Environment Setup

Create a `.env` file in the `backend/` folder with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 5. Run the app

#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd ../frontend
npm run dev
```

App runs at: `http://localhost:3000`

## 📂 Folder Structure

```
docnet/
│
├── backend/       # Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/      # React application
│   ├── components/
│   ├── pages/
│   └── App.js
```

## ✅ To-Do / Improvements

- [ ] Implement notifications or reminders
- [ ] Deploy to cloud (Render/Netlify/Heroku)
- [ ] Add tests (Jest/Mocha)

## 👨‍💻 Author

**Ajay Kumar T P**  
📧 ajaykumartp10@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/ajaykumartp) | [GitHub](https://github.com/AJAYK-1)

---

> Feel free to fork this project, suggest improvements, or raise issues!
