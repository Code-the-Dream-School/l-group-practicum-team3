# Smart Kitchen

A full-stack web application that helps users manage their kitchen inventory. It includes features like tracking expiration dates, adding items by scanning a receipt, and suggesting recipes based on available ingredients.

## 🧠 Problem Statement

- **Who is this for?** Home cooks and busy individuals who struggle to keep track of what's in their kitchen.
- **Pain point:** Food waste from forgotten or expired ingredients, and the daily friction of deciding what to cook with what's on hand.
- **Why it matters:** By automating inventory tracking and matching recipes to what you already have, Smart Kitchen reduces food waste and makes meal planning effortless.

## 🎯 Features

- **Receipt scanning** — Upload a photo of a receipt to automatically populate your kitchen inventory
- **Manual item entry** — Add items by hand with name, quantity, category, and expiration date
- **Expiration tracking** — View items sorted by expiration date, with alerts for items expiring soon
- **Recipe suggestions** — Get recipe ideas based on the ingredients you currently have
- **User authentication** — Secure registration, login, and logout using Supabase Auth
- **Responsive UI** — Clean Material UI interface that works on desktop and mobile

## 📸 Screenshots

Add screenshots or GIFs of key features here.

## 🛠 Tech Stack

### Frontend
- React 19
- Vite 7
- Material UI (MUI) 9
- Lucide React icons
- Axios
- React Router DOM 7
- Tailwind CSS 3

### Backend
- Node.js
- Express.js
- Supabase (User Auth & Database)
- Google Gemini AI (receipt parsing & recipe generation)
- Joi (request validation)
- Helmet, CORS, express-rate-limit (security)

### Database
- PostgreSQL (Supabase)

### Tooling
- Git & GitHub
- dotenv (environment variables)
- Nodemon
- ESLint / Prettier

## 📁 Project Structure

```text
project-root/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/        
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/        
│   │   ├── validation/
│   │   └── app.js
│   ├── server.js
│   └── package.json
└── README.md
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm
- A Supabase project (free tier works)
- A Google Gemini API key
- A Spoonacular API key

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
FRONTEND_URL=

# For Supabase
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# For AI
GEMINI_API_KEY=
AI_MODEL=

# For Recipes API
SPOONACULAR_API_KEY=
```

Backend runs on:  
http://localhost:5000

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file inside the `frontend` folder:

```env
# backend Url - Local Host Port 
VITE_API_URL=
```

Frontend runs on:  
http://localhost:5173

## 🧪 Available Scripts

### Frontend
```bash
npm run dev
npm run build
npm run preview
```

### Backend
```bash
npm run dev
npm start
```

## 🔐 API Overview

Documentation can be found here: [https://registry.scalar.com/@default-team-qpeba/apis/smart-kitchen-backend-api@0.0.3](https://registry.scalar.com/@default-team-qpeba/apis/smart-kitchen-backend-api@0.0.3)

### Endpoints

```text
AUTH
  POST /users/register
  POST /users/login
  GET /users/auth/google
  GET /users/auth/callback
GROCERIES
  POST /users/register
  POST /users/login
  GET /users/auth/google
  GET /users/auth/callback
WISHLIST
  GET /grocery
  POST /grocery
  GET /grocery/{id}
  PATCH /grocery/{id}
  DELETE /grocery/{id}
RECIPES
  GET /recipes/search
  GET /recipes/favorites
  GET /recipes/{id}
  POST /recipes/{id}/favorite
  DELETE /recipes/{id}/favorite
RECEIPTS
  POST /receipts/scan
```

## 🤝 Team & Collaboration

### Team Members
- Alex Yadaicela - Fullstack
- Padmaja Ramesh - Frontend
- Yongting Shi - Frontend
- Swetha Kanneganti - Frontend
- Adrian Konarski - Backend

### Workflow
- GitHub Issues for task tracking
- Feature branches for development
- Pull Requests required for all merges
- Code reviews before merging to `main`


## 🧩 Development Process

- Agile / sprint-based workflow
- Backend API built before frontend integration
- MVP defined early
- Incremental feature development

## 📌 Known Issues / Limitations

- Receipt scanning accuracy depends on image quality and receipt format
- No automated tests yet
- Performance optimizations pending

## 🛣 Future Improvements

- Add automated testing (Jest, Supertest)
- Shared household inventories
- Recipe Copying & Editing

## 🙌 Acknowledgments

Thank you to Alton, Anastasia, and Munir for their guidance, code reviews, and always keeping us on track. Without them, this project wouldn't have been possible!

## 📄 License

This project is for educational purposes only.
