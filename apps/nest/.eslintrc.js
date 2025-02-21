module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json', // ✅ Ensure ESLint knows about tsconfig
  },
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-unsafe-assignment': 'warn', // ✅ Warn instead of error
    '@typescript-eslint/no-unsafe-member-access': 'warn',
  },
};
