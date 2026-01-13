# 🚀 David Build – Portfolio Website

A modern, full-stack **portfolio website** built with **Next.js** to showcase my projects, skills, and achievements.
The application uses **Cloudinary** for image management, **Prisma** for database access, and a clean, responsive UI powered by **Tailwind CSS** and **Radix UI**.

---

## ✨ Features

* ⚡ Built with **Next.js (App Router)**
* 🖼️ **Cloudinary integration** for image upload & optimization
* 🧠 **Prisma ORM** for database interactions
* 🔐 Authentication utilities using **JWT & bcrypt**
* ✍️ Rich text editor using **Tiptap**
* 🎨 Modern UI with **Tailwind CSS**, **Radix UI**, and **Framer Motion**
* 📱 Fully responsive design
* 🧩 Scalable project structure

---

## 🛠️ Tech Stack

### Frontend

* Next.js 16
* React 19
* Tailwind CSS
* Radix UI
* Framer Motion
* Lucide Icons

### Backend / Tools

* Prisma
* JWT Authentication
* bcrypt / bcryptjs
* Cloudinary (`next-cloudinary`)
* TypeScript

---

## 📂 Project Structure (Simplified)

```
└── 📁src
    └── 📁app
        └── 📁admin
            └── 📁(dashboard)
                └── 📁blog
                    └── 📁[id]
                        ├── page.tsx
                    └── 📁new
                        ├── page.tsx
                    ├── page.tsx
                └── 📁projects
                    └── 📁[id]
                        ├── page.tsx
                    └── 📁new
                        ├── page.tsx
                    ├── page.tsx
                ├── layout.tsx
                ├── page.tsx
            └── 📁login
                ├── layout.tsx
                ├── page.tsx
            ├── layout.tsx
        └── 📁api
            └── 📁admin
                └── 📁blog
                    └── 📁[id]
                        ├── route.ts
                    ├── route.ts
                └── 📁dashboard
                    ├── route.ts
                └── 📁login
                    ├── route.ts
                └── 📁logout
                    ├── route.ts
                └── 📁projects
                    └── 📁[id]
                        ├── route.ts
                    ├── route.ts
                └── 📁session
                    └── 📁cleanup
                        ├── route.ts
                    └── 📁revoke
                        ├── route.ts
                    ├── route.ts
            └── 📁blog
                └── 📁[slug]
                    ├── route.ts
                └── 📁id
                    └── 📁[id]
                        ├── route.ts
                ├── route.ts
            └── 📁projects
                └── 📁[slug]
                    ├── route.ts
                └── 📁featured
                    ├── route.ts
                └── 📁id
                    └── 📁[id]
                        ├── route.ts
                ├── route.ts
        └── 📁blog
            └── 📁[slug]
                ├── page.tsx
            ├── page.tsx
        └── 📁experience
            ├── page.tsx
        └── 📁links
            ├── page.tsx
        └── 📁projects
            └── 📁[slug]
                ├── page.tsx
            ├── page.tsx
            ├── ProjectsClient.tsx
        ├── error.tsx
        ├── globals.css
        ├── layout.tsx
        ├── not-found.tsx
        ├── page.tsx
    └── 📁components
        └── 📁Admin
            ├── AdminSidebar.tsx
            ├── BlogForm.tsx
            ├── BlogPreviewModal.tsx
            ├── ProjectForm.tsx
        └── 📁editor
            ├── RichTextEditor.tsx
        └── 📁Landing
            ├── FeaturedProjects.tsx
            ├── hero.tsx
            ├── What_I_Work_On.tsx
        └── 📁Projects
            ├── FeaturedProjects.tsx
            ├── ProjectCard.tsx
            ├── ProjectsFilter.tsx
            ├── ProjectsGrid.tsx
            ├── ProjectsHeader.tsx
        └── 📁ui
            ├── avatar.tsx
            ├── badge.tsx
            ├── button.tsx
            ├── card.tsx
            ├── dialog.tsx
            ├── dropdown-menu.tsx
            ├── separator.tsx
            ├── table.tsx
        ├── Blogcard.tsx
        ├── Footer.tsx
        ├── Navbar.tsx
        ├── Projectcard.tsx
    └── 📁lib
        ├── adminFetch.ts
        ├── auth.ts
        ├── fonts.ts
        ├── jwt.ts
        ├── password.ts
        ├── prisma.ts
        ├── requireAdmin.ts
        ├── sessionCleanup.ts
        ├── upload.ts
        ├── uploadVideo.ts
        ├── utils.ts
    └── 📁types
        ├── project.ts
    └── proxy.ts
```

---

## ☁️ Cloudinary Integration

Cloudinary is used for:

* Image uploads
* Automatic optimization
* Fast CDN delivery

Add the following environment variables to your `.env` file:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🧪 Scripts

```
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

---

## 🗄️ Prisma Setup

```
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

---

## 🚀 Getting Started

```
git clone https://github.com/your-username/david_build.git
cd david_build
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 📌 Purpose

This project is built to:

* Showcase my **projects & skills**
* Serve as a **resume-grade portfolio**
* Demonstrate real-world **Next.js + Cloudinary + Prisma** usage

---

## 👤 Author

**David Tembhare**
B.Tech CSE (AI)
University of Allahabad

---

## 📜 License

This project is **open-source** and available under the **MIT License**.
