import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // .claude/** covers agent worktrees (foreign checkouts with their own dist/
  // node_modules churn) — linting them from this checkout is never meaningful.
  { ignores: ['dist/**', '**/dist/**', '.claude/**'] },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      globals: globals.browser,
    },
  },
)
