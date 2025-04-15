// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enable dark mode based on class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure all JSX/TSX files are considered for content
  ],
  theme: {
    extend: {
      // You can extend Tailwind's default theme here if needed
      colors: {
        primary: "#1E40AF", // Example: Define a custom color
        secondary: "#10B981", // Example: Another custom color
      },
      fontFamily: {
        // You can define your custom fonts here if needed
        sans: ['Outfit', 'sans-serif'],
      },
      // Add more theme extensions as needed
    },
  },
  plugins: [],
}
