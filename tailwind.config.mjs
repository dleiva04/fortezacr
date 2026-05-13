import withMT from "@material-tailwind/react/utils/withMT.js";

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        forteza: {
          green:  '#1B4332',
          'green-light': '#2D6A4F',
          cement: '#4A5568',
          gold:   '#C8973A',
          'gold-light': '#E0B05A',
          light:  '#F7F7F7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
});
