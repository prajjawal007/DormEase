# [DormEase](https://dormease.onrender.com) | Simplifying student housing, one city at a time

DormEase is a web application designed to help students find and connect with suitable PGs and flats near their colleges. The platform allows students to view available accommodations, contact the owners, confirm residence, and connect with fellow residents for better coordination.

## 🚀 Features
- **User Authentication**: Signup and login functionality for students.
- **College & PG Listings**: View a list of colleges and available PGs near each college.
- **PG Details**: View details such as rent, amenities, and owner contact information.
- **Resident Count & Chat**: See how many students are living in a PG and chat with them before moving in.
- **Notifications**: Receive notifications when someone starts a chat with you.
- **Seamless UI**: Responsive and user-friendly interface for smooth navigation.

## 🏗 Tech Stack
### **Frontend:**
- React.js
- Tailwind CSS
- React Router
- React Hot Toast

### **Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- Supabase (for file storage)

### **Deployment:**
- Render (Backend)
- Render (Frontend)
- GitHub (Version Control)

## 📂 Project Structure
```
DormEase/
│── client/ (Frontend - React.js)
│   ├── src/
│   │   ├── components/ (Reusable components)
│   │   ├── pages/ (Page-specific components)
│   │   ├── utils/ (Helper functions)
│   │   ├── services/ (API Calls)
│   │   ├── styles/ (CSS/Tailwind)
│   │   ├── App.js
│   │   ├── index.js
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│
│── server/ (Backend - Node.js & Express)
│   ├── models/ (Mongoose models)
│   ├── routes/ (API Routes)
│   ├── controllers/ (Business logic)
│   ├── middleware/ (Authentication & Error Handling)
│   ├── config/ (Database & Environment setup)
│   ├── index.js (Main Server File)
│   ├── package.json
│
│── README.md
│── .env
│── .gitignore
```

## 📦 Installation & Setup
### 1️⃣ Clone the repository
```sh
git clone https://github.com/prajjawal007/DormEase.git
cd DormEase
```

### 2️⃣ Install Dependencies
#### Install frontend dependencies
```sh
cd client
npm install
```
#### Install backend dependencies
```sh
cd ../server
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file inside the `server` directory and add:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
CLIENT_URL=https://dormease.onrender.com
```

### 4️⃣ Run the Application
#### Start the backend server
```sh
cd server
npm run dev
```
#### Start the frontend
```sh
cd client
npm start
```

### 5️⃣ Open in Browser
Visit: [Link](https://dormease.onrender.com)


### **Deploy Backend to Render**
1. Push your changes to GitHub.
2. Go to [Render](https://dormease.onrender.com/), create a new web service.
3. Select your GitHub repo and deploy.

## 🔥 Contributing
We welcome contributions! Follow these steps:
1. Fork the repository.
2. Create a new branch (`feature-name`).
3. Commit your changes.
4. Push to your branch and create a Pull Request.

## 📜 License
This project is licensed under the MIT License.

---
**DormEase - Making Student Housing Easy!** 🏠✨

