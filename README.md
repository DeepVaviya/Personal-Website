# Deep Vaviya | Personal Portfolio Website

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)

A responsive, interactive personal portfolio website built to showcase my skills, professional experience as a full-stack developer, and latest projects. The site is built entirely with Vanilla HTML, CSS, and JavaScript and is optimized for seamless deployment.

## ✨ Features

- **Responsive Design:** Fluid layout that adapts to all screen sizes (Desktop, Tablet, and Mobile) using custom media queries (`media.css`).
- **Downloadable Resume:** Direct access to view and download my professional resume (`deep_vaviya_resume.pdf`).
- **Interactive Mini-Projects:** Features fully playable browser-based games embedded directly into the portfolio:
  - 🧠 **Simon Game:** A memory skill game with visual and audio cues.
  - 🔢 **Guess the Number:** An interactive logic game.
- **Dynamic UI:** Smooth scrolling, active navigation states, and interactive elements powered by custom JavaScript.

## 📁 Project Structure

```text
personal-website/
├── images/                 # Profile pictures, logos, and project screenshots
├── projects/               # Standalone interactive mini-projects
│   ├── guess_number/       # JS logic game with custom sounds and styling
│   └── simon_game/         # Classic Simon memory game 
├── deep_vaviya_resume.pdf  # Professional resume document
├── index.html              # Main portfolio layout and content
├── main.js                 # Global interactivity and DOM manipulation
├── style.css               # Core styling and variables
├── media.css               # Mobile-first responsive breakpoints
└── netlify.toml            # Netlify deployment configuration
```

## 🚀 Quick Start (Local Development)

Because this is a static site built without complex build tools, getting it running locally is incredibly simple.

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd personal-website
   ```

2. **Launch the site:**
   - **Option A:** Simply open `index.html` in your preferred web browser.
   - **Option B (Recommended):** Use a local development server like VS Code's "Live Server" extension to ensure all assets and relative links (especially inside the `projects/` directory) load perfectly.

## 🌐 Deployment

This project includes a `netlify.toml` configuration file, making it ready for instant deployment on [Netlify](https://www.netlify.com/).

To deploy:
1. Push your code to a GitHub repository.
2. Log in to Netlify and select "Add new site" -> "Import an existing project".
3. Connect your GitHub account and select this repository.
4. Netlify will automatically detect the configuration and deploy your portfolio.

## 🛠️ Built With

- **HTML5:** Semantic structure and accessibility.
- **CSS3:** Custom properties (variables), Flexbox, CSS Grid, and responsive media queries.
- **Vanilla JavaScript:** DOM manipulation, event handling, and game logic without relying on heavy frameworks.

## 📝 License

This project is open-source and available under the MIT License.
```
