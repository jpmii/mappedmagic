import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'magicpurple': {
                    DEFAULT: '#240046',
                    50: '#BE79FF',
                    100: '#B465FF',
                    200: '#A03CFF',
                    300: '#8C13FF',
                    400: '#7800E9',
                    500: '#6300C0',
                    600: '#4E0098',
                    700: '#39006F',
                    800: '#240046',
                    900: '#07000E',
                    950: '#000000'
                },
                magicgold: '#FFBA08',
                magicwhite: '#F7F4F3',
                'magicblack': {
                    DEFAULT: '#0C0014',
                    50: '#A51EFF',
                    100: '#9D0AFF',
                    200: '#8600E0',
                    300: '#6E00B7',
                    400: '#55008E',
                    500: '#310052',
                    600: '#180029',
                    700: '#0C0014',
                    800: '#06000A',
                    900: '#030005',
                    950: '#000000'
                },
                magicgrey: '#8D99AE',
            },
        },
    },

    plugins: [forms],
};
