module.exports = {
  purge: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#111",
        bgalt: "#222",
        default: "#eee",
        tbody: "#1a1a1a",
        tbodyalt: "#1e1e1e"
      },
      fontSize: {
        "8xl": "8rem",
        "16xl": "16rem",
        "24xl": "24rem"
      },
      minHeight: {
        "screen-80": "80vh",
        "screen-85": "85vh",
        "screen-90": "90vh",
        "screen-95": "95vh"
      }
    }
  },
  variants: {},
  plugins: []
}
