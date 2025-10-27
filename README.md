# Quizly

**Live Site:** [http://localhost:5173 ](https://quizlyy.netlify.app/)

## 📌 Project Description

**Quizly** is a full-stack quiz application designed for educators and students. It allows admins to create quizzes (manually or via Excel upload) and users to take them with a built-in timer. The platform supports various question types, detailed result tracking, secret-code-based access, and email integration for contact and support.

## 🚀 Features

- 👩‍🏫 Admin quiz creation (manual + Excel upload)
- 🧑‍🎓 Timed quiz participation for users
- ✅ Authentication & Authorization using JWT
- 📊 Auto-scoring and result tracking
- 🧾 Excel upload with Multer for bulk quiz input
- ✉️ Contact form integration using Web3Forms
- 🎯 Support for single-choice, multiple-choice, and written answers
- 🎨 Responsive UI using Tailwind CSS
- 🚫 Custom error handling for better UX

## 🛠 Tech Stack

### 📦 Backend
- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB ODM
- **Multer** – File upload (Excel handling)
- **jsonwebtoken** – Secure token-based authentication

### 💻 Frontend
- **React (Vite)** – Fast frontend build tool
- **Tailwind CSS** – Utility-first CSS framework
- **Web3Forms** – Serverless contact form integration

### 📄 Additional Libraries
- **XLSX** – Excel file parsing
- **bcryptjs** – Password hashing
- **React Router DOM** – Routing
- **Axios** – HTTP requests

## 📦 Installation

### Step 1: Clone the repository
<pre>
git clone https://github.com/<your-username>/quizly.git
</pre>

### Step 2: Backend setup
<pre>
cd quizly/backend
npm install
</pre>

Create a `.env` file with the following:
<pre>
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
</pre>

Start the backend:
<pre>
npm start
</pre>

### Step 3: Frontend setup
\`\`\`bash
cd ../frontend
npm install
npm run dev
\`\`\`

Now your frontend runs on: **http://localhost:5173**

## 🧪 Usage

### 👩‍🏫 Admin Flow
1. Login as admin  
2. Create quizzes manually or upload Excel  
3. Share the secret code with users

### 🧑‍🎓 User Flow
1. Login or register  
2. Enter secret code to start quiz  
3. Timer starts and responses are recorded  
4. On submission, results are stored and displayed

### 📬 Contact
Use the built-in contact form (powered by Web3Forms) for inquiries or support.

## 🤝 Contributing

### Step 1: Fork the repository
<pre>
git clone https://github.com/<your-username>/quizly.git
</pre>

### Step 2: Clone your fork
<pre>
  git clone https://github.com/<your-username>/quizly.git
</pre>

### Step 3: Create a new branch
<pre>
git checkout -b feature-or-fix-name
</pre>

### Step 4: Make your changes and commit
<pre>
git add .
git commit -m "Describe your changes"
</pre>

### Step 5: Push to your fork
<pre>
git push origin feature-or-fix-name
</pre>

### Step 6: Submit a pull request
Go to your forked repo and click **"New Pull Request"** to submit your changes.


