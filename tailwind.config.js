/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                teal: {
                    DEFAULT: '#1CA7C7',
                    400: '#38bdf8',
                    500: '#1CA7C7',
                    600: '#0e8fa8',
                },
                purple: {
                    DEFAULT: '#8E44FF',
                    400: '#a855f7',
                    500: '#8E44FF',
                    600: '#7c3aed',
                },
                navy: {
                    DEFAULT: '#0F172A',
                    800: '#1e293b',
                    900: '#0F172A',
                },
                pink: {
                    DEFAULT: '#FF4FD8',
                    400: '#f472b6',
                    500: '#FF4FD8',
                    600: '#db2777',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Space Grotesk', 'Inter', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-brand': 'linear-gradient(135deg, #1CA7C7, #8E44FF)',
                'gradient-brand-reverse': 'linear-gradient(135deg, #8E44FF, #1CA7C7)',
                'gradient-glow': 'linear-gradient(135deg, #1CA7C7, #8E44FF, #FF4FD8)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 2s infinite',
                'float-slow': 'float 8s ease-in-out 1s infinite',
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
                'gradient-shift': 'gradient-shift 4s ease infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'spin-slow': 'spin 8s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'glow-pulse': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(255, 79, 216, 0.4)' },
                    '50%': { boxShadow: '0 0 40px rgba(255, 79, 216, 0.8), 0 0 80px rgba(255, 79, 216, 0.3)' },
                },
                'gradient-shift': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            boxShadow: {
                'glow-teal': '0 0 20px rgba(28, 167, 199, 0.5)',
                'glow-purple': '0 0 20px rgba(142, 68, 255, 0.5)',
                'glow-pink': '0 0 20px rgba(255, 79, 216, 0.5)',
                'glow-pink-lg': '0 0 40px rgba(255, 79, 216, 0.6), 0 0 80px rgba(255, 79, 216, 0.2)',
            },
        },
    },
    plugins: [],
}
