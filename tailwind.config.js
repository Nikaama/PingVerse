module.exports = {
  content: [
    './views/**/*.ejs', // Include all EJS templates
    './public/**/*.html', // Any static HTML in public
    './src/**/*.js', // Source JavaScript files
  ],
  theme: {
    extend: {}, // Extend default Tailwind themes if needed
  },
  plugins: [],
};