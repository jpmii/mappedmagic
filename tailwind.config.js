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
                magicpurple: '#2a1177',
                magicgold: '#f4ab35',
                magicwhite: '#eff2f0',
                magiclightpurple: '#4a2c7e',
                magicblue: '#8ea2c5',
            },
        },
    },

    plugins: [forms],
};
