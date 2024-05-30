import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        normalBlue: "var(--normalBlue)",
        hoverBlue: "var(--hoverBlue)",
        darkerBlue: "var(--darkerBlue)",
        darkBlue: "var(--darkBlue)",
        normalViolet: "var(--normalViolet)",
        normalLigthBlue: "var(--normalLigthBlue)",
        lightGray: "var(--lightGray)",
        mediumGray: "var(--mediumGray)",
        darkGray: "var(--darkGray)",
        // Adicione outras cores conforme necessário, usando as variáveis globais
      },

      fontSize: {
        'h1-lg': 'var(--h1-size-lg)',
        'h1-md': 'var(--h1-size-md)',
        'h1-sm': 'var(--h1-size-sm)',

        'h2-lg': 'var(--h2-size-lg)',
        'h2-md': 'var(--h2-size-md)',
        'h2-sm': 'var(--h2-size-sm)',

        'h3-lg': 'var(--h3-size-lg)',

        'h4': 'var(--h4-size)',

        'p-lg': 'var(--p-size-lg)',
        'p-sm': 'var(--p-size-sm)',
      },
    },
  },
  plugins: [],
};
export default config;
