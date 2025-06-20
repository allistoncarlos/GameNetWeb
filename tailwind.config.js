/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Habilita o modo escuro baseado na classe 'dark'
  theme: {
    extend: {
      colors: {
        // Cores baseadas nas telas do iOS
        primary: "#8A2BE2", // Um tom de roxo para elementos principais
        secondary: "#6A5ACD", // Um tom de roxo mais claro
        background: "#000000", // Fundo preto para o modo escuro
        card: "#1C1C1E", // Cor de fundo dos cards no modo escuro
        text: "#FFFFFF", // Cor do texto principal no modo escuro
        muted: "#AEAEB2", // Cor do texto secundário/neutro
        accent: "#FFD700", // Cor de destaque (amarelo/dourado)
        blue: "#0A84FF", // Azul para cards de informação
        green: "#30D158", // Verde para indicadores positivos
        red: "#FF453A", // Vermelho para indicadores negativos
      },
      fontFamily: {
        sans: ["SF Pro Display", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif"],
        // Adicionar outras fontes se necessário
      },
      boxShadow: {
        // Sombras para elementos como cards, se necessário
        'ios': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};

