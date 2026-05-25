# 🚀 Rohit Shrestha | Full Stack Developer Portfolio

A premium, production-ready personal portfolio website built with React.js, Tailwind CSS, and Framer Motion.

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-pink?logo=framer)](https://www.framer.com/motion/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite)](https://vitejs.dev/)

---

## ✨ Features

- **Dark/Light Mode** — Toggle with persistent storage via Zustand
- **Animated Loading Screen** — Cinematic intro with progress bar
- **Custom Cursor** — Smooth trailing cursor with hover effects
- **Scroll Progress Bar** — Top-edge indicator
- **Smooth Animations** — Framer Motion throughout every section
- **Mobile-First Responsive** — Pixel-perfect on all screen sizes
- **SEO-Friendly** — Meta tags, semantic HTML, Open Graph
- **Type Animation** — Rotating role titles in Hero section
- **Project Filtering** — Category-based project filtering
- **Form Validation** — Client-side contact form with real-time errors
- **GitHub Stats** — Live GitHub stats integration
- **Testimonial Carousel** — Animated multi-directional carousel
- **Timeline Experience** — Alternating vertical timeline layout
- **Particle Background** — Floating animated particles in Hero

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── Hero.jsx           # Landing section with animated avatar
│   │   ├── About.jsx          # Bio, education, highlights
│   │   ├── Skills.jsx         # Animated skill bars + tech cloud
│   │   ├── Projects.jsx       # Filterable project cards grid
│   │   ├── Experience.jsx     # Alternating timeline
│   │   ├── Services.jsx       # Services cards + CTA banner
│   │   ├── Achievements.jsx   # Certs, awards, GitHub stats
│   │   ├── Testimonials.jsx   # Animated testimonial carousel
│   │   └── Contact.jsx        # Contact form + info
│   └── ui/
│       ├── Navbar.jsx         # Responsive navbar with active section
│       ├── Footer.jsx         # Footer with quick nav
│       ├── CustomCursor.jsx   # Smooth trailing cursor
│       └── LoadingScreen.jsx  # Cinematic loading animation
├── hooks/
│   └── usePortfolio.js        # Custom hooks (scroll, form, cursor, etc.)
├── store/
│   └── useStore.js            # Zustand state (theme, menu, filter)
├── utils/
│   └── data.js                # All portfolio data (edit here!)
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 11 |
| State | Zustand 4 |
| Icons | Lucide React |
| Type Animation | react-type-animation |
| Scroll Detection | react-intersection-observer |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/RohitShrestha533/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎨 Customization

All portfolio data lives in **`src/utils/data.js`** — edit this file to personalize everything:

```js
export const personalInfo = {
  name: "Your Name",
  email: "you@email.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  // ...
}

export const projects = [
  {
    title: "Your Project",
    description: "What it does...",
    tech: ["React", "Node.js"],
    github: "https://github.com/...",
    live: "https://...",
  }
]
```

### Adding EmailJS (for real contact form emails)

1. Create account at [emailjs.com](https://www.emailjs.com)
2. Install: `npm install @emailjs/browser`
3. In `Contact.jsx`, replace the mock `setTimeout` with:

```js
import emailjs from '@emailjs/browser'

await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  { name: values.name, email: values.email, message: values.message },
  'YOUR_PUBLIC_KEY'
)
```

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Drag dist/ folder to netlify.com/drop
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json: "homepage": "https://yourusername.github.io/portfolio"
# Add scripts: "predeploy": "npm run build", "deploy": "gh-pages -d dist"
npm run deploy
```

---

## 📸 Screenshots

The portfolio includes these sections:
1. **Hero** — Animated intro with floating avatar card and stats
2. **About** — Bio, highlights, and education cards
3. **Skills** — Category tabs with animated progress bars
4. **Projects** — Filterable 3-column grid with hover animations
5. **Experience** — Alternating vertical timeline
6. **Services** — Icon cards with CTA banner
7. **Achievements** — Certifications, awards, and GitHub stats
8. **Testimonials** — Animated carousel
9. **Contact** — Form with validation + contact info

---

## 📄 License

MIT License — free to use and modify.

---

## 👤 Author

**Rohit Shrestha**
- GitHub: [@RohitShrestha533](https://github.com/RohitShrestha533)
- LinkedIn: [rohitshrestha533](https://www.linkedin.com/in/rohitshrestha533)

---

*Built with ❤️ in Pokhara, Nepal 🇳🇵*
