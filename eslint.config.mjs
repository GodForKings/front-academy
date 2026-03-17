import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig, globalIgnores } from 'eslint/config'

import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

import prettier from 'eslint-config-prettier/flat'

import boundaries from 'eslint-plugin-boundaries'
import effector from 'eslint-plugin-effector'
import { importX } from 'eslint-plugin-import-x'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** effector.flatConfigs.recommended бывает объектом или массивом*/
const effectorRecommended = Array.isArray(effector.flatConfigs.recommended)
  ? effector.flatConfigs.recommended
  : [effector.flatConfigs.recommended]

export default defineConfig([
  globalIgnores([
    '.next/**',
    'out/**',
    'dist/**',
    'coverage/**',
    'node_modules/**',
    'next-env.d.ts',
    '**/*.d.ts',
    'eslint.config.*',
  ]),
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
  },

  ...effectorRecommended.map((cfg) => ({
    ...cfg,
    files: ['src/**/*.{ts,tsx}'],
  })),

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      boundaries,
      'import-x': importX,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },

    settings: {
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json'],
        },
        node: true,
      },

      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'widgets', pattern: 'src/widgets/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'entities', pattern: 'src/entities/**' },
        { type: 'shared', pattern: 'src/shared/**' },
      ],
    },

    rules: {
      'react-hooks/set-state-in-effect': 'warn',
      /* Неиспользуемые + сортировка */
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import-x/no-unresolved': 'off',
      'import-x/no-internal-modules': 'off',
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['@/widgets/*/*', '@/widgets/*/*/**'],
              message: 'Импортируй widgets через public API: "@/widgets/<slice>" (index.ts).',
            },
            {
              group: ['@/features/*/*', '@/features/*/*/**'],
              message: 'Импортируй features через public API: "@/features/<slice>" (index.ts).',
            },
            {
              group: ['@/entities/*/*', '@/entities/*/*/**'],
              message: 'Импортируй entities через public API: "@/entities/<slice>" (index.ts).',
            },
            {
              group: ['@/shared/*/*', '@/shared/*/*/**'],
              message: 'Импортируй shared через public API: "@/shared/<segment>" или "@/shared".',
            },
          ],
        },
      ],
      /* FSD */
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: 'app',
              allow: ['app', 'widgets', 'features', 'entities', 'shared'],
            },
            {
              from: 'widgets',
              allow: ['widgets', 'features', 'entities', 'shared'],
            },
            { from: 'features', allow: ['features', 'entities', 'shared'] },
            { from: 'entities', allow: ['entities', 'shared'] },
            { from: 'shared', allow: ['shared'] },
          ],
        },
      ],
    },
  },
  {
    files: ['src/shared/api/**/*.{ts,tsx}', 'src/shared/utils/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
    },
  },
  {
    files: ['**/*.config.*', '**/scripts/**'],
    rules: { 'no-restricted-imports': 'off' },
  },
])
