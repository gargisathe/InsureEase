// tailwind.config.js
module.exports = {
    darkMode: "class",
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          smoke: "#FAFAFA",
          slate: "#E0E0E0",
          "slate-dark": "#424242",
          "slate-soft": "#616161",
          teal: "#607D8B",
        },
        fontFamily: { 
          sans: ["ui-sans-serif", "system-ui"] 
        },
      },
    },
    plugins: [],
  };