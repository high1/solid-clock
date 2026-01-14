import { type Config } from 'prettier';

export default {
  plugins: ['prettier-plugin-tailwindcss'],
  singleQuote: true,
  tailwindStylesheet: 'src/index.css',
} satisfies Config;
