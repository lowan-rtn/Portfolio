/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b10",
        text: "#e6e6e6",
        muted: "#8e8e8e",
        violet: "#7c2eff",
        violetSoft: "#d66bff"
      },
      boxShadow: {
        neon: "0 0 20px rgba(124,46,255,0.45)",
        neonSoft: "0 0 36px rgba(214,107,255,0.35)"
      }
    },
  },
  plugins: [],
}
