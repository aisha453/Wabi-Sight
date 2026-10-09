/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#060a08",
        surface: {
          base: "#0c140f",
          elevated: "#132018",
          glass: "rgba(14, 26, 19, 0.72)"
        },
        emerald: {
          glow: "#2dd4bf"
        },
        moss: {
          leaf: "#4ade80"
        },
        firefly: {
          gold: "#f59e0b"
        }
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "Inter", "sans-serif"]
      },
      boxShadow: {
        'glow-emerald': '0 0 35px rgba(45, 212, 191, 0.35)',
        'glow-gold': '0 0 35px rgba(245, 158, 11, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    },
  },
  plugins: [],
}
