module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: 'typescript-eslint-parser'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    //'plugin:prettier/recommended',
    'typescript'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    //'prettier'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //'prettier/prettier': ['error', {semi: true, singleQuote: true}],
    "vue/max-attributes-per-line": "off"
    // "semi": true,
    // 'singleQuote': false
  }
}
