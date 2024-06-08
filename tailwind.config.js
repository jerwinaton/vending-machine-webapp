/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0080FF",
      },
      backgroundImage: {
        "vm-header": "url('./src/assets/images/skin_header.png')",
        "vm-footer": "url('./src/assets/images/skin_footer.png')",
      },
    },
  },
  plugins: [],
};
