module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.medusa/',
    'build/',
    '.cache/',
    'coverage/',
    '*.config.js',
    '*.config.ts',
    'integration-tests/',
  ],
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    
    // General rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',
    'prefer-const': 'warn',
    'no-var': 'error',
    
    // Code quality
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    'no-throw-literal': 'error',
    'no-return-await': 'error',
    
    // Async/await
    'require-await': 'warn',
    'no-async-promise-executor': 'error',
  },
  overrides: [
    {
      // Relax rules for test files
      files: ['**/__tests__/**/*.ts', '**/*.spec.ts', '**/*.test.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off',
      },
    },
    {
      // Relax rules for scripts
      files: ['src/scripts/**/*.ts'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
}

