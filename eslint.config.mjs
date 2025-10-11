import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
  {
    rules: {
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'never'],
    },
  },
  {
    files: ['src/shared/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app/*'],
              message: 'Shared слой не может импортировать из app слоя (FSD)',
            },
            {
              group: ['@/pages/*'],
              message: 'Shared слой не может импортировать из pages слоя (FSD)',
            },
            {
              group: ['@/widgets/*'],
              message:
                'Shared слой не может импортировать из widgets слоя (FSD)',
            },
            {
              group: ['@/features/*'],
              message:
                'Shared слой не может импортировать из features слоя (FSD)',
            },
            {
              group: ['@/entities/*'],
              message:
                'Shared слой не может импортировать из entities слоя (FSD)',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/entities/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app/*'],
              message:
                'Entities слой не может импортировать из app слоя (FSD)',
            },
            {
              group: ['@/pages/*'],
              message:
                'Entities слой не может импортировать из pages слоя (FSD)',
            },
            {
              group: ['@/widgets/*'],
              message:
                'Entities слой не может импортировать из widgets слоя (FSD)',
            },
            {
              group: ['@/features/*'],
              message:
                'Entities слой не может импортировать из features слоя (FSD)',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app/*'],
              message:
                'Features слой не может импортировать из app слоя (FSD)',
            },
            {
              group: ['@/pages/*'],
              message:
                'Features слой не может импортировать из pages слоя (FSD)',
            },
            {
              group: ['@/widgets/*'],
              message:
                'Features слой не может импортировать из widgets слоя (FSD)',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/widgets/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app/*'],
              message:
                'Widgets слой не может импортировать из app слоя (FSD)',
            },
            {
              group: ['@/pages/*'],
              message:
                'Widgets слой не может импортировать из pages слоя (FSD)',
            },
          ],
        },
      ],
    },
  },
]

export default eslintConfig
