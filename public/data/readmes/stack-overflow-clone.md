# Stack Overflow Clone 💬

A **MERN stack** web application developed during my internship at [NullClass](https://nullclass.com/), replicating key functionalities of Stack Overflow, with added features like a **chatbot**, **subscription plans**, and a **social media community**.

---

## 🚀 Live Demo

[🔗 Click here to visit the live website!](https://stack-overflow-clone-namasivaayam-l.netlify.app/)

---

## ✨ Features

### Core Stack Overflow Functionality

-   ✅ **Question & Answer**: View, ask, answer, and delete questions.
-   ✅ **Voting**: Upvote or downvote questions and answers.
-   ✅ **Sharing**: Share questions with others.
-   🔒 **Authentication**: Token-based authentication, with tokens expiring every 24 hours for security.

### Internship Enhancements

-   🤖 **AI Chatbot Integration**:
    -   Ask programming-related questions directly to the chatbot.
    -   **OTP Authentication** required via registered email for chatbot access.
    -   Fetches top answers from `https://api.stackexchange.com/`.
-   💰 **Subscription Plans & Payment Gateway**:
    -   Integrates **Stripe** for secure payment processing.
    -   **Free Plan**: 1 question/day.
    -   **Silver Plan (₹100/month)**: 5 questions/day.
    -   **Gold Plan (₹1000/year)**: Unlimited questions/day.
-   🤝 **Social Media Community**:
    -   Share programming experiences via text, photos, and videos.
    -   Users can follow/unfollow, like/unlike, comment, and delete posts/comments.
    -   Search for and manage friends.

---

## 🧰 Tech Stack

| Component           | Tech                                    |
|---------------------|-----------------------------------------|
| Frontend            | React.js, Redux, React-Router-Dom-V6    |
| UI Library          | Material UI Icons, React Simple Chatbot |
| Backend             | Node.js, Express.js                     |
| Database            | MongoDB Atlas / MongoDB Compass, Mongoose |
| Authentication      | JWT, Nodemailer (for OTP)               |
| Payment Gateway     | Stripe                                  |
| API Integration     | StackExchange API                       |
| Language            | JavaScript                              |

---

## 🛠️ Setup Instructions

To run this project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/Namasivaayam-L/stack-overflow-clone.git # Replace with actual repo URL if different
cd stack-overflow-clone
```

### 2. Install Dependencies

Navigate to both `client` and `server` directories to install their respective dependencies:

```bash
# For the frontend
cd client
npm install --force # Use --force if peer dependency issues arise
cd ..

# For the backend
cd server
npm install
cd ..
```

### ⚙️ Configuration

-   Ensure **MongoDB** is running or connect to **MongoDB Atlas**. Update connection strings in `server` as needed.
-   Configure **Nodemailer** for email OTPs and **Stripe** API keys in your backend environment variables (e.g., `.env` file in `server` directory).

---

## 🧑‍💻 Run the Application

To start both the client and server:

```bash
# In one terminal, start the backend server
cd server
npm start

# In a separate terminal, start the frontend development server
cd client
npm start
```

-   **Frontend**: `http://localhost:3000` (default for React apps)
-   **Backend API**: `http://localhost:5000` (or as configured in `server/index.js`)

---

## 📂 Project Structure

```
.
├── client/                     # Frontend React.js application
│   ├── public/                 # Static assets
│   ├── src/                    # React components, Redux store, pages, etc.
│   ├── package.json            # Client-side dependencies and scripts
│   └── ...
├── server/                     # Backend Node.js/Express.js application
│   ├── models/                 # Mongoose schemas for data models
│   ├── routes/                 # API endpoints
│   ├── controllers/            # Logic for handling API requests
│   ├── index.js                # Main server entry point
│   ├── package.json            # Server-side dependencies and scripts
│   └── ...
├── image/                      # Project screenshots and images
│   └── README/                 # Images specifically for README
├── README.md                   # Project overview and documentation
└── .gitignore                  # Git ignore rules
```

---

## 🔮 Future Plans

-   📈 **Integrate ChatGPT**: Enhance the existing chatbot with more advanced AI capabilities.
-   📱 **Mobile OTP Verification**: Implement OTP verification via mobile numbers for increased security.

---

Built by **Namasivaayam L.**
