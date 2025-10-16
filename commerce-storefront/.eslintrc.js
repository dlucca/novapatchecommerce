module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    
    '@typescript-eslint/no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_' 
    }],
    
    'no-console': ['warn', { 
      allow: ['warn', 'error'] 
    }],
    
    'react-hooks/exhaustive-deps': 'warn',
    
    'prefer-const': 'warn',
    
    'no-unused-imports/no-unused-imports': 'off', 
  },
  overrides: [
    {
      files: ['src/**/*.{ts,tsx}'],
      excludeFiles: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'error',
      }
    }
  ]
}
