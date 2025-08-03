/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensures Tailwind scans all components
  theme: {
    extend: {
      colors: {
        neonBlue: "#00eaff",
        darkBg: "#0b0f29",
        cyberPink: "#ff0099",
        glowYellow: "#FFD700",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-in-out",
        "fade-down": "fadeDown 0.8s ease-in-out",
        "zoom-in": "zoomIn 0.8s ease-in-out",
        "slide-in-left": "slideInLeft 1s ease-in-out",
        "pulse-glow": "pulseGlow 1.5s infinite alternate ease-in-out",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeDown: {
          "0%": { opacity: 0, transform: "translateY(-20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        zoomIn: {
          "0%": { opacity: 0, transform: "scale(0.5)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        slideInLeft: {
          "0%": { opacity: 0, transform: "translateX(-50px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        pulseGlow: {
          "0%": { textShadow: "0 0 5px #00eaff, 0 0 10px #00eaff" },
          "100%": { textShadow: "0 0 15px #00eaff, 0 0 30px #00eaff" },
        },
      },
    },
  },
  plugins: [],
};
