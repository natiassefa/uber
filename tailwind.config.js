/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    fontFamily: {
      display: 'Gilroy',
      body: 'Graphik',
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
    },
    extend: {
      colors: {
        cyan: '#9cdbff',
      },
      spacing: {
        '96': '24rem',
        '128': '32rem',
      }
    }
  }
}