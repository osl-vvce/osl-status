module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        bgalt: "var(--bgalt)",
        default: "var(--default)",
        primary: "var(--primary)",
        tbody: "var(--tbody)",
        tbodyalt: "var(--tbodyalt)"
      }
    }
  },
  plugins: []
}
