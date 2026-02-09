# 3S-SOFT Official

A modern, content-driven web application built with **Next.js 16**, **TypeScript**, **DaisyUI**, and **Firebase**. 3S-SOFT delivers scalable digital solutions, expert services, and thought leadership through a modular, SEO-friendly platform.

---

## 🚀 What’s Inside?

### ✍️ Blog Highlights

- **MERN Stack Mastery**: Guides for startups on scalable web apps.
- **Amazon & Shopify Growth**: Strategies for global eCommerce success.
- **SEO & Digital Marketing**: Advanced checklists and integrated marketing tactics.
- **AI & Engineering**: Insights on AI-powered development and full-stack engineering.
- **Business Transformation**: Digital transformation, virtual assistants, and more.

### 🛠️ Services

- **Web Development (MERN Stack)**
- **WordPress Customization**
- **eCommerce Product Listing**
- **Lead Generation (B2B/B2C)**
- **Digital Marketing & SEO**
- **Social Media Marketing**
- **Graphic Design**
- **Virtual Assistant Services**

Each service includes detailed features, from custom dashboards and API integration to campaign management and administrative support.

### 👥 Meet the Team

- **Jashedul Islam Shaun** – Founder & CEO, MERN expert, digital strategist
- **Oahidul Islam Sajib** – Co-Founder & Creative Director, UI/UX & branding
- **Rakibul Hasan** – Senior Front End Developer, React & Next.js specialist
- **Maptaul Islam Taraq** – Full Stack Developer, JavaScript & TypeScript
- **Borhan Siddque** – Frontend Developer, accessibility & responsive design
- **Md. Shahidul Islam** – Digital Marketing Specialist, SEO & social media
- **Mehedi Hasan Akash** – UI/UX & Graphic Designer, visual storytelling
- **Fariya Rahman** – Data Entry Specialist, data management & research

### 🌟 Client Testimonials

> “3S-SOFT transformed our online presence completely. Their MERN stack development skills are exceptional, and they delivered our project ahead of schedule.”  
> — Sarah Johnson, CEO, TechStart Inc.

> “Working with 3S-SOFT for our eCommerce product listings was a game-changer. They optimized our Amazon and eBay listings perfectly, resulting in a 300% increase in sales within the first month.”  
> — Michael Chen, Founder, EcoShop

> “The digital marketing and SEO services provided by 3S-SOFT exceeded our expectations. Our website traffic increased by 250% and lead generation improved significantly.”  
> — Emily Rodriguez, Marketing Director, GrowthCo

And more — see `src/data/testimonials.json` for all feedback.

---

## 📁 Folder Structure

```
├── public/                # Static assets (images, favicons, etc.)
├── src/
│   ├── app/               # Main app entry, layouts, and routes
│   ├── components/        # UI components (home, auth, portfolio, etc.)
│   ├── contexts/          # React context providers
│   ├── data/              # Blogs, services, team, testimonials (JSON)
│   ├── firebase/          # Firebase config
│   ├── lib/               # Utility libraries
│   └── types/             # TypeScript type definitions
├── package.json
├── tsconfig.json
├── next.config.mjs
├── postcss.config.mjs
└── README.md
```

---

## 🛠️ Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Start production server:**
   ```bash
   npm start
   ```

---

## 🐞 Troubleshooting

- **Build Errors:**  
  If you see errors like `Cannot find module for page: /blogs` or `/contact`, ensure the corresponding files exist in `src/app/blogs/` and `src/app/contact/`.
- **CSS Warnings:**  
  DaisyUI may emit warnings about unknown CSS at-rules (`@property`). These are generally safe to ignore.

---

## 📄 License

MIT