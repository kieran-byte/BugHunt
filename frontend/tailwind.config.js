const { withAnimations } = require("animated-tailwindcss");

module.exports = withAnimations({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["light", "dark"],
  },
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height'
      }
    },
  },
  variants: {
    extend: {
      margin: ['first', 'last'],
      height: ['responsive', 'hover', 'focus'],
      display: ["group-hover"]
    }   
    
  },
  plugins: [require("daisyui"), require("tailwindcss-animated")],
});