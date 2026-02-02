import js from '@eslint/js'
import jest from 'eslint-plugin-jest'
import globals from 'globals'

export default [
  js.configs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node
      }
    }
  },

  {
    files: ['**/*.test.js', '**/__tests__/**/*.js'],
    plugins: {
      jest
    },
    languageOptions: {
      globals: {
        ...globals.jest
      }
    },
    rules: {
      'no-undef': 'off'
    }
  }
]
