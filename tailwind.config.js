module.exports = {
  purge: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        bgalt: "var(--bgalt)",
        default: "var(--default)",
        primary: "var(--primary)",
        tbody: "var(--tbody)",
        tbodyalt: "var(--tbodyalt)",
      },
      fontSize: {
        "8xl": "8rem",
        "16xl": "16rem",
        "24xl": "24rem",
      },
      minHeight: {
        "screen-80": "80vh",
        "screen-85": "85vh",
        "screen-90": "90vh",
        "screen-95": "95vh",
      },
    },
  },
  variants: {},
  plugins: [],
}
