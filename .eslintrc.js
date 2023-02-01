module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: 2020
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/no-mutating-props': 'off',
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
    'space-before-blocks': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-trailing-spaces': 'off',
    'indent': 'off',
    'comma-dangle': 'off',
    'no-trailing-spaces': 'off',
    'no-multiple-empty-lines': 'off',
    'eol-last': 'off',
    'key-spacing': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'quotes': 'off',
    'semi': 'off',
    'comma-spacing': 'off',
    'arrow-spacing': 'off',
    'space-infix-ops': 'off',
    'keyword-spacing': 'off',
    'prefer-const': 'off',
    'no-multi-spaces': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
}