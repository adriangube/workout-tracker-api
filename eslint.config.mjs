import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'


export default [
  { files: [ '**/*.{js,mjs,cjs,ts}' ] },
  { files: [ '**/*.js' ], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'indent': [ 'error', 2 ],
      'no-console': [ 'error', { 'allow': [ 'warn', 'error', 'info' ] } ],
      'semi': [ 'error', 'never' ],
      'quotes': [ 'error', 'single' ],
      'max-len': [ 'error', { 'code': 120 } ],
      '@typescript-eslint/no-unused-vars': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-require-imports': [ 'error' ],
      'object-curly-spacing': [ 'error', 'always' ],
      'array-bracket-spacing': [ 'error', 'always' ],
    }
  },
  {
    files: [ '**/*.js' ],
    rules: {
      '@typescript-eslint/no-require-imports': [ 'off' ]
    }
  },
  {
    files: [ 'migrations/**/*.js' ],
    rules: {
      '@typescript-eslint/no-require-imports': [ 'off' ],
      '@typescript-eslint/no-unused-vars': [ 'off' ],
      'no-console': [ 'off' ],
    }
  }
]