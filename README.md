# 🌱 BEST Hackathon 2025 – Eco Gamification Platform

Web project developed during **BEST Hackathon 2025** in Mostar.

---

## 🚀 About the Project
This web application promotes ecological donations through gamification, allowing users to:
- Donate to environmental projects
- Earn XP and Leafer Points (virtual currency)
- Unlock rewards and customize their profiles
- Compete on the leaderboard

The goal is to raise awareness about climate change and reduce the CO₂ footprint through community engagement.

---

## 🛠 Technologies Used
- **Next.js** – React framework for fast web development
- **TypeScript** – Type-safe JavaScript for better maintainability
- **Tailwind CSS** – Utility-first styling framework
- **PostgreSQL (Supabase)** – Database for storing projects and user data
- **Vercel** – Hosting and deployment platform

---

## 📂 Project Structure
```
/public         - Static assets such as images and favicons
/pages         - Next.js pages (Home, Projects, Profile, Leaderboard)
/components    - Reusable React components
/styles        - Global CSS/Tailwind styles
/api           - API routes for data fetching and updates
/utils         - Helper functions for XP system and donations
```

---

## 🏁 How to Run the Project Locally
1. **Clone the repository**
   ```bash
   git clone https://github.com/username/repository.git
   cd repository
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up `.env.local` file with configuration**
   Create a `.env.local` file in the root of the project and add the following:
   ```env
   DATABASE_URL=postgres://neondb_owner:npg_sYAEuZ1t9IhP@ep-spring-butterfly-a2mjhupd-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
   DATABASE_URL_UNPOOLED=postgresql://neondb_owner:npg_sYAEuZ1t9IhP@ep-spring-butterfly-a2mjhupd.eu-central-1.aws.neon.tech/neondb?sslmode=require
   PGHOST=ep-spring-butterfly-a2mjhupd-pooler.eu-central-1.aws.neon.tech
   PGHOST_UNPOOLED=ep-spring-butterfly-a2mjhupd.eu-central-1.aws.neon.tech
   PGUSER=neondb_owner
   PGDATABASE=neondb
   PGPASSWORD=npg_sYAEuZ1t9IhP
   POSTGRES_URL=postgres://neondb_owner:npg_sYAEuZ1t9IhP@ep-spring-butterfly-a2mjhupd-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
   POSTGRES_URL_NON_POOLING=postgres://neondb_owner:npg_sYAEuZ1t9IhP@ep-spring-butterfly-a2mjhupd.eu-central-1.aws.neon.tech/neondb?sslmode=require
   POSTGRES_USER=neondb_owner
   POSTGRES_HOST=ep-spring-butterfly-a2mjhupd-pooler.eu-central-1.aws.neon.tech
   POSTGRES_PASSWORD=npg_sYAEuZ1t9IhP
   POSTGRES_DATABASE=neondb
   POSTGRES_URL_NO_SSL=postgres://neondb_owner:npg_sYAEuZ1t9IhP@ep-spring-butterfly-a2mjhupd-pooler.eu-central-1.aws.neon.tech/neondb
   POSTGRES_PRISMA_URL=postgres://neondb_owner:npg_sYAEuZ1t9IhP@ep-spring-butterfly-a2mjhupd-pooler.eu-central-1.aws.neon.tech/neondb?pgbouncer=true&connect_timeout=15&sslmode=require
   ```
4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at **http://localhost:3000**

---

## 🎮 Key Features
✔️ User registration and authentication  
✔️ Create and browse environmental projects  
✔️ Make donations and earn XP  
✔️ Gamification with the Leafer Points system  
✔️ User leaderboard  

---

## 🌍 API Routes
| Method | Route               | Description                   |
|--------|--------------------|------------------------------|
| GET    | `/api/projects`    | Fetch all projects          |
| POST   | `/api/donate`      | Submit a donation           |
| GET    | `/api/leaderboard` | Fetch leaderboard data      |
| POST   | `/api/update-xp`   | Update user XP              |

---



## 🤝 Team & Contributors
- **Faris Lindov** 
- **Tamir Oladejo** 
- **Adi Hadžavdić**
- **Eldar Hadžiselimović** 





