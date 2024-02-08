import reactAriaComponents from "tailwindcss-react-aria-components";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssGridAreas from "@savvywombat/tailwindcss-grid-areas";
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      "heading-xl": [
        "96px",
        {
          fontWeight: "800",
          letterSpacing: "0.05em",
        },
      ],
    },
    extend: {
      colors: {},
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
