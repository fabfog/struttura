module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'eslint:recommended'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx']
      }
    }
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: ['react', 'import'],
  rules: {
    'import/order': [
      'warn',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: [['builtin', 'external'], 'parent', 'sibling', 'index']
      }
    ],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'no-empty-pattern': 'off',
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          /* COMMON "SILOS" */
          // Business logics
          {
            target: './src/common/business-logics',
            from: './src/common/stores'
          },
          {
            target: './src/common/business-logics',
            from: './src/common/ui'
          },
          // Helpers
          {
            target: './src/common/helpers',
            from: './src/common/business-logics'
          },
          {
            target: './src/common/helpers',
            from: './src/common/stores'
          },
          {
            target: './src/common/helpers',
            from: './src/common/ui'
          },
          // Stores
          {
            target: './src/common/stores',
            from: './src/common/business-logics'
          },
          {
            target: './src/common/stores',
            from: './src/common/ui'
          },
          // UI
          {
            target: './src/common/ui',
            from: './src/common/business-logics'
          },
          {
            target: './src/common/ui',
            from: './src/common/stores'
          },
          /* Atomic design rules */
          // Atoms
          {
            target: './src/common/ui/atoms',
            from: './src/common/ui/molecules'
          },
          {
            target: './src/common/ui/atoms',
            from: './src/common/ui/organisms'
          },
          {
            target: './src/common/ui/atoms',
            from: './src/common/ui/templates'
          },
          // Molecules
          {
            target: './src/common/ui/molecules',
            from: './src/common/ui/organisms'
          },
          {
            target: './src/common/ui/molecules',
            from: './src/common/ui/templates'
          },
          // Organisms
          {
            target: './src/common/ui/organisms',
            from: './src/common/ui/templates'
          },
          // Templates
          {
            target: './src/common/ui/templates',
            from: './src/common/ui/atoms'
          },
          {
            target: './src/common/ui/templates',
            from: './src/common/ui/molecules'
          },
          {
            target: './src/common/ui/templates',
            from: './src/common/ui/organisms'
          },
          /* restrict import Features from Common */
          {
            target: './src/common',
            from: './src/features'
          },
          /* restrict import common from App */
          {
            target: './src/App.tsx',
            from: './src/common'
          }
        ]
      }
    ]
  }
}
