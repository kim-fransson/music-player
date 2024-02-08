import reactAriaComponents from "tailwindcss-react-aria-components";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssGridAreas from "@savvywombat/tailwindcss-grid-areas";
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      "header-1": [
        "56px",
        {
          fontWeight: "600",
        },
      ],
      "header-2": [
        "24px",
        {
          fontWeight: "500",
        },
      ],
      subtext: [
        "14px",
        {
          fontWeight: "500",
        },
      ],
      body: ["16px"],
    },

    extend: {
      colors: {
        black: {
          100: "#000000",
          64: "#191919",
          32: "#2f2f2f",
        },
        green: {
          100: "#43a047",
          16: "#545c55",
        },
        gray: "#939393",
        "light-gray": "#bebebe",
      },
      opacity: {},
      boxShadow: {},
      gridTemplateAreas: {},
      gridTemplateColumns: {},
      gridTemplateRows: {},
    },
  },
  plugins: [
    reactAriaComponents,
    tailwindcssAnimate,
    daisyui,
    // https://github.com/tailwindlabs/tailwindcss-intellisense/issues/227#issuecomment-1139895799
    ({ addUtilities }) => {
      addUtilities({
        ".absolute-center": {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      });
    },
    tailwindcssGridAreas,
  ],
  daisyui: {
    themes: ["dark"],
  },
};
