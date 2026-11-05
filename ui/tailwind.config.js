/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        meadow: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        sunlight: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        dew: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
        },
        forest: {
          950: "#052e16",
          900: "#064e3b",
          850: "#0b3d26",
          800: "#0f5132",
          700: "#157347",
          600: "#198754",
        },
        surface: {
          base: "#f4fbf6",
          card: "rgba(255, 255, 255, 0.82)",
          glass: "rgba(255, 255, 255, 0.72)",
          elevated: "rgba(255, 255, 255, 0.94)",
          border: "rgba(16, 185, 129, 0.22)",
          borderHover: "rgba(16, 185, 129, 0.45)",
          highlight: "rgba(52, 211, 153, 0.4)",
        },
        emerald: {
          glow: "#10b981",
          bright: "#059669",
          deep: "#064e3b",
        },
        moss: {
          leaf: "#16a34a",
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
        'glow-emerald': '0 0 25px rgba(16, 185, 129, 0.25)',
        'glow-emerald-lg': '0 0 45px rgba(16, 185, 129, 0.35)',
        'glow-gold': '0 0 25px rgba(245, 158, 11, 0.25)',
        'glow-gold-lg': '0 0 45px rgba(245, 158, 11, 0.35)',
        'nature-sm': '0 4px 16px -2px rgba(22, 101, 52, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'nature': '0 10px 30px -4px rgba(22, 101, 52, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'nature-lg': '0 20px 40px -8px rgba(22, 101, 52, 0.12), 0 8px 16px -4px rgba(16, 185, 129, 0.08)',
        'inner-glow': 'inset 0 0 16px rgba(16, 185, 129, 0.12)',
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
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
