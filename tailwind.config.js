/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      display: ["EB Garamond", "serif"],
      "display-mono": ["PT Mono", "monospace"],
      mono: ["monospace"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      colors: {
        beige: "#FFFCF9",
        "light-blue": require("tailwindcss/colors").sky,
      },
      maxWidth: {
        text: "67ch",
        "text-12": "12ch",
        "text-24": "24ch",
        "text-32": "32ch",
      },
      height: (theme) => {
        const output = {};

        for (let i = 1; i < 100; i++) {
          output["screen-" + i] = i + "vh";
        }

        return output;
      },
    },
  },
  plugins: [],
};
