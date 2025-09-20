/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // adjust if you have other folders
    ],
    safelist: [
        // Background colors
        "bg-red-500",
        "bg-blue-500",
        "bg-purple-500",
        "bg-green-500",
        "bg-yellow-500",

        // Border colors
        "border-red-500",
        "border-blue-500",
        "border-purple-500",
        "border-green-500",
        "border-yellow-500",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
