/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        opacity: {
          "0%": { transform: "scale(1) translateY(0)", opacity: 1 },
          "50%": { transform: "scale(1.2) translateY(-10px)", opacity: 0.5 },
          "100%": { transform: "scale(1) translateY(0)", opacity: 1 },
        },
        opacityonly: {
          "0%": { transform: " translateX(-100px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        transition: {
          "0%": { transform: "scale(1) translatex(-200px)", opacity: 1 },
          "50%": { transform: "scale(1.2) ", opacity: 0.5 },
          "100%": { transform: "scale(1) translateX(0)", opacity: 1 },
        },
        transitionleft: {
          "0%": { transform: "scale(1) translatex(200px)", opacity: 1 },
          "50%": { transform: "scale(1.2) ", opacity: 0.5 },
          "100%": { transform: "scale(1) translateX(0)", opacity: 1 },
        },
        sparkle: {
          "0%": { scale: 0.2 },
          "100%": { scale: 1 },
        },
      },
      animation: {
        opacity: "opacity 1s ease ",
        opacityonly: "opacityonly 200ms ease-out ",
        sparkle: "sparkle 1s ease ",
        transition: "transition 1s ease ",
        transitionleft: "transitionleft 1s ease ",
      },
    },
  },
  plugins: [],
};
