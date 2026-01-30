import js from '@eslint/js'
import react from 'eslint-plugin-react'
import globals from 'globals'
import prettier from 'eslint-config-prettier'

export default [
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,

      // Modern React (no need to import React in JSX)
      'react/react-in-jsx-scope': 'off',
    },
  },
  prettier,
]
