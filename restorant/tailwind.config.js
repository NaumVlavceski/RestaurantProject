/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'menu-bg': "url('/menu-bg-small.jpg')",
                'order-bg': "url('/order-bg-small.jpg')",
            },
        },
    },
    plugins: [],
}
