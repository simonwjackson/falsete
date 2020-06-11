module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    'graphql'
  ],
  'rules': {
    "graphql/template-strings": ['error', {
      'env': 'apollo',
      'schemaJson': require('./src/schema.json')
    }], 
    'space-infix-ops': 'error',
    'object-curly-spacing': ['error', 'always'],
    'curly': ['error', 'multi', 'consistent'],
    'quote-props': ['error', 'as-needed'],
    'no-multiple-empty-lines': ['error', {
      'max': 1,
      'maxBOF': 1
    }],
    'brace-style': ['error', 'stroustrup'],
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}
