module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['@nuxtjs/eslint-config-typescript'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [],
  rules: {
    // 'no-undef': 'off',
    // 'no-unused-vars': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
