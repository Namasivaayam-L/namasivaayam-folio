# 🏆 MSCS CRCs Competition Platform

A full-stack web application meticulously crafted for the **MSCS CRCs competition**. It features robust **data visualization**, **society registration**, **forms management**, and **interactive maps**, offering a comprehensive platform for competition administration and participant engagement.

---

## ✨ Features

-   📊 **Data Visualization**: Dynamic charts and graphs for competition analytics.
-   📝 **Society Registration & Management**: Streamlined process for society registration and administration.
-   📄 **Forms & Document Management**: Handle competition forms, including integrated PDF viewing.
-   📍 **Interactive Maps**: Powered by Google Maps API for location-based features and event mapping.
-   🔒 **Secure Authentication**: Robust user authentication and authorization system.
-   ⚙️ **Admin Dashboard**: Centralized control panel for comprehensive competition management.

---

## 🧰 Tech Stack

| Component           | Tech                                    |
|---------------------|-----------------------------------------|
| Frontend            | React.js (TypeScript)                   |
| Backend             | Node.js, Express.js                     |
| Database            | MongoDB                                 |
| UI Library          | Material UI                             |
| Charting            | Chart.js                                |
| Mapping             | Google Maps API                         |
| PDF Viewer          | PDF.js                                  |
| Authentication      | JWT, Bcrypt                             |
| Language            | JavaScript, TypeScript                  |

---

## 🚀 Setup Instructions

To get the MSCS CRCs Competition Platform up and running locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/Namasivaayam-L/mscs-crcs-competition.git # Replace with actual repo URL if different
cd mscs-crcs-competition
```

### 2. Install Client-side Dependencies

Navigate to the `client` directory and install the required packages:

```bash
cd client
npm install
# To start the frontend development server:
# npm start
```

### 3. Install Server-side Dependencies

Navigate to the `server` directory and install the required packages:

```bash
cd server
npm install
# To start the backend server:
# npm start
```

### ⚙️ Configuration

-   Ensure **MongoDB** is running and accessible.
-   Set up any necessary environment variables for database connections, JWT secrets, and Google Maps API keys in the `server` directory (e.g., in a `.env` file).

---

## 🧑‍💻 Run the Application

To run both the client and server:

```bash
# In one terminal, start the backend server
cd server
npm start

# In a separate terminal, start the frontend development server
cd client
npm start
```

The frontend should be available at `http://localhost:3000` (default for React) and the backend API at `http://localhost:5000` (or as configured).

---

## 📂 Project Structure

```
.
├── client/                     # Frontend React.js (TypeScript) application
│   ├── public/                 # Public assets
│   ├── src/                    # React components, pages, services, styles
│   ├── package.json            # Client-side dependencies and scripts
│   └── ...
├── server/                     # Backend Node.js/Express.js application
│   ├── models/                 # Mongoose schemas for data models
│   ├── routes/                 # API endpoints and logic
│   ├── config/                 # Server-side configurations (e.g., database, auth)
│   ├── package.json            # Server-side dependencies and scripts
│   └── ...
├── README.md                   # Project overview and documentation
└── .gitignore                  # Git ignore rules
```

---

Built for **Full-Stack Web Development**, **Data Visualization**, and **Competition Management**.
