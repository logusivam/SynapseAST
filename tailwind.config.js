/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A0A12",
        secondary: "#12121F",
        surface: "#1C1C2E",
        border: "#2A2A45",
        purple: {
          DEFAULT: "#7C3AED",
          light: "#A855F7",
        },
        cyan: {
          DEFAULT: "#06B6D4",
        },
        green: {
          DEFAULT: "#10B981",
        },
        red: {
          DEFAULT: "#EF4444",
        },
        amber: {
          DEFAULT: "#F59E0B",
        },
        textPrimary: "#F1F5F9",
        textSecondary: "#94A3B8",
        textCode: "#E2E8F0",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
