# SUPTO | Creative Developer Portfolio

A high-performance, immersive personal portfolio website built to demonstrate modern web capabilities, featuring advanced animations, 3D aesthetic elements, and a focus on premium user experience.

![Portfolio Preview](./public/placeholder.svg)

## ✨ Key Features

- **Staggered Navigation**: A custom full-screen menu overlay with large typography and sequential entrance animations.
- **Magic Bento Grid**: An interactive "Skills" section utilizing a responsive masonry layout with spotlight/glow hover effects.
- **Animated Contact Wizard**: A multi-step conversational form interface with real-time validation, smooth state transitions, and EmailJS integration for real email delivery.
- **Glitch Text Effects**: custom "matrix-decoding" text animations for headers and key interactions.
- **Responsive Design**: Fully optimized layouts for mobile, tablet, and desktop experiences.
- **Modern Aesthetics**: "Windows 11" inspired abstract 3D visual language and glassmorphism.

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React & React Icons
- **UI Components**: Radix UI (via shadcn/ui)

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (v18+) installed on your machine.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/supto707/portfolio-mine.git
    cd portfolio-mine
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure EmailJS (for contact form)**
    
    To enable the contact form email functionality:
    
    - Copy `.env.example` to `.env.local`
    - Follow the setup guide in [EMAILJS_SETUP.md](./EMAILJS_SETUP.md)
    - Add your EmailJS credentials to `.env.local`

4.  **Start the development server**
    ```bash
    npm run dev
    ```

5.  **Build for production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

- `src/components/sections`: Core page sections (Hero, Work, Skills, Contact, etc.)
- `src/components`: Reusable UI components (MagicCard, GlitchText, Navbar, etc.)
- `src/lib`: Utility functions and configuration.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
*Designed & Developed by Sadman Arefin Supto*
