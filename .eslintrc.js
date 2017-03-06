module.exports = {
  'env': {
    'es6': true,
    'node': true,
  },
  'extends': ['eslint:recommended', 'google'],
  'parserOptions': {
    'sourceType': 'module',
  },
  'rules': {
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'never',
    ],
    'no-unused-vars': [
      'error',
      {
        'vars': 'all',
        'argsIgnorePattern': '^_',
      },
    ],
    'max-len': [
      'error',
      {
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreRegExpLiterals': true,
      },
    ]
  },
}
