# 🌐 Abdulrahman Hamdi Portfolio & Infinity Team Platform

A modern, responsive, and feature-rich web platform that serves as both a **personal portfolio** and an **educational hub** — designed and developed by **Abdulrahman Hamdi**, a computer engineer passionate about technology, teaching, and AI.

The project integrates a professional portfolio, a technical blog, a dynamic resume, and the **Infinity Team educational platform**, which provides university-level course materials, video lectures, and interactive learning experiences.

---

## 🎯 Overview
This project acts as a **multifunctional personal and educational ecosystem**, designed to:
- Showcase personal and professional achievements.
- Offer structured university-level lessons through the *Infinity Team* platform.
- Share technical knowledge via an integrated blog.
- Facilitate direct communication through an intelligent contact system powered by **EmailJS**.

It merges elegant UI/UX design with accessibility, interactivity, and responsiveness — offering a complete learning and professional experience.

---

## ✨ Key Features
- 🌓 **Dark/Light Mode** with persistent user preferences.
- 🎤 **Smart Search** with text and **voice input** capabilities.
- 🔊 **Interactive Sound Effects** for enhanced engagement.
- 💬 **Text-to-Speech Accessibility** for inclusive learning.
- 💌 **EmailJS Contact Integration** (no backend required).
- ⭐ **Feedback & Rating System** with local storage memory.
- 🧮 **Dynamic Counters** and animated progress visuals.
- 🎓 **Infinity Team Courses** – structured lessons, exams, notes, and videos.
- ⚡ **Particles.js, Swiper.js, and VanillaTilt.js** for modern motion design.
- 📱 Fully **responsive** and optimized for all devices.

---

## 🧩 Technologies Used
| Category | Tools & Libraries |
|-----------|-------------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6) |
| **Frameworks** | Bootstrap 5, Swiper.js, AOS.js, Vanilla Tilt |
| **Visual Effects** | Particles.js, Intersection Observer, ScrollReveal |
| **Icons** | Font Awesome, Bootstrap Icons |
| **Integrations** | EmailJS (contact & feedback), LocalStorage (theme, sound, rating) |
| **Hosting** | Firebase Hosting |

---

## 📚 Infinity Team Courses
The **Infinity Team Platform** hosts a collection of university-level courses, each with lectures, notes, and exam materials:

| Course | Topics Covered |
|--------|----------------|
| **Algorithm Analysis & Design** | Data structures, time complexity, divide & conquer, recursion, dynamic programming. |
| **Programming (Java)** | Object-oriented programming, inheritance, file handling, and real-world applications. |
| **Differential Equations** | Modeling, analytical methods, Laplace transforms, and real-world applications. |
| **Signals & Systems** | LTI systems, Fourier/Laplace transforms, convolution, and system modeling. |
| **Probability & Statistics** | Data analysis, probability theory, random variables, and hypothesis testing. |
| **Physics II** | Electricity, magnetism, Maxwell’s laws, and electromagnetic waves. |
| **Mathematics I & II** | Calculus, limits, derivatives, integrals, and advanced problem-solving. |
| **Linear Algebra** | Matrices, determinants, vector spaces, and eigenvalue problems. |
| **MATLAB Applications** | Simulation, plotting, and numerical problem-solving for engineering. |

Each course includes structured sections for **videos**, **PDF materials**, **exams**, and **course descriptions** with accessibility features.

---

## ⚙️ Folder Structure
```
assets/
├── css/
│   ├── style.css
│   ├── stylecv.css
│   ├── styleabout.css
│   └── styleit.css
│
├── js/
│   ├── script.js           # Global logic and UI control
│   ├── scriptcv.js         # Resume page animations
│   ├── scriptabout.js      # About & team effects
│   ├── scriptit.js         # Infinity Team course interactivity
│   └── scriptsearch.js     # Autocomplete + voice search
│
├── img/                    # All media, logos, and course illustrations
├── music/                  # UI sounds (click, mode switch)
└── PDF/                    # Course PDFs and exam materials
```

---

## 🚀 How to Run Locally
### Option 1: VSCode Live Server
1. Open the project in **Visual Studio Code**.
2. Install the **Live Server** extension.
3. Right-click on `index.html` → *Open with Live Server*.
4. Visit: `http://127.0.0.1:5500`.

### Option 2: Node.js Static Server
```bash
npm install -g serve
serve .
```
Then open: **http://localhost:3000**

---

## ☁️ Firebase Deployment
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Login:
   ```bash
   firebase login
   ```
3. Initialize project:
   ```bash
   firebase init hosting
   ```
   - Set `public` to `./`
   - Configure as SPA → **No**
4. Deploy:
   ```bash
   firebase deploy
   ```
✅ Live URL → `https://yourprojectname.web.app`

---

## 🧠 JavaScript Components
| File | Functionality |
|------|----------------|
| **script.js** | Handles mode toggle, animations, and star ratings. |
| **scriptsearch.js** | Implements smart search and voice recognition. |
| **scriptit.js** | Controls course pages, counters, and sidebar logic. |
| **scriptcv.js / scriptabout.js** | Adds visual enhancements and motion effects. |

---

## 🔮 Future Enhancements
- 🌍 Add a full multilingual interface (EN / AR / TR).
- 📊 Integrate admin dashboard for managing course materials.
- 🧠 Add AI-based recommendation for study materials.
- 📱 Launch a mobile app version for Infinity Team.

---

## 👨‍💻 Author
**Abdulrahman Hamdi**  
Computer Engineer | Full-Stack Developer | AI Enthusiast  
📧 [abdulrahmanh524@gmail.com](mailto:abdulrahmanh524@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/abdulrahman-hamdi-54a8a6143/) | [GitHub](https://github.com/abdulrahmanhamdi) | [Instagram](https://www.instagram.com/98abdulrahmanhamdi/)

---

## 🪪 License
This project is licensed for **educational, academic, and personal showcase purposes**.  
All visuals, course materials, and content are © 2025 **Abdulrahman Hamdi**.

---

### 💡 Summary
A professional full-featured web platform that bridges personal branding and education — empowering students to learn interactively while showcasing the developer’s technical expertise and teaching
