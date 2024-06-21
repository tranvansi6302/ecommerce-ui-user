/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}']
export const theme = {
    extend: {
        colors: {
            'text-primary': 'rgba(0,0,0,.87)',
            'text-secondary': 'rgb(0 0 0 / 54%)',
            'bg-primary': '#f5f5f5;',
            orange: {
                100: '#fff3e0',
                200: '#ffe0b2',
                300: '#ffcc80',
                400: '#ffb74d',
                500: '#ffa726',
                600: '#f57224',
                700: '#f57c00',
                800: '#ef6c00',
                900: '#e65100'
            }
        }
    }
}
export const plugins = []
