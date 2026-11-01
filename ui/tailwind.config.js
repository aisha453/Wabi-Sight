/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#030705",
        forest: {
          950: "#040a06",
          900: "#07130b",
          850: "#0b1c11",
          800: "#0f2617",
          700: "#163a23",
          600: "#1e4d30",
        },
        surface: {
          base: "#07120a",
          elevated: "#0d2013",
          card: "rgba(11, 28, 17, 0.65)",
          glass: "rgba(14, 34, 21, 0.55)",
          border: "rgba(45, 212, 191, 0.18)",
          highlight: "rgba(45, 212, 191, 0.35)",
        },
        emerald: {
          glow: "#2dd4bf",
          bright: "#10b981",
          deep: "#064e3b",
        },
        moss: {
          leaf: "#4ade80",
          soft: "#86efac",
        },
        firefly: {
          gold: "#f59e0b",
          warm: "#fbbf24",
          amber: "#d97706",
        }
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "Inter", "-apple-system", "sans-serif"]
      },
      boxShadow: {
        'glow-emerald': '0 0 35px rgba(45, 212, 191, 0.35)',
        'glow-emerald-lg': '0 0 60px rgba(45, 212, 191, 0.45)',
        'glow-gold': '0 0 35px rgba(245, 158, 11, 0.35)',
        'glow-gold-lg': '0 0 60px rgba(245, 158, 11, 0.45)',
        'glass': '0 12px 40px 0 rgba(0, 0, 0, 0.55)',
        'glass-sm': '0 6px 24px 0 rgba(0, 0, 0, 0.45)',
        'inner-glow': 'inset 0 0 20px rgba(45, 212, 191, 0.15)',
      },
      backdropBlur: {
        xs: '2px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 24s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
