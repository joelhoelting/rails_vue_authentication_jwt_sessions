module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'arrow-parens': [2, 'always'],
    'no-param-reassign': ['error', { props: false }],
    'comma-dangle': ['error', 'never'],
    'space-before-function-paren': ['error', 'never'],
    'func-names': ['error', 'never'],
    'max-len': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
