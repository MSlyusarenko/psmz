/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      spacing: {
        '120': '40rem',
        '122': '40.5rem',
        '124': '41rem',
        '126': '41.5rem',
        '128': '42rem',
        '130': '42.5rem',
      },
    },
  },
  plugins: [],
}
