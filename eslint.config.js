import globals from 'globals';

import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat(
  {
    baseDirectory: __dirname,
    recommendedConfig: pluginJs.configs.recommended 
  }
);

export default [
  { 
    languageOptions: { 
      globals: { 
        ...globals.node,
        ...globals.jest
      }
    }
  },
  ...compat.extends('airbnb'),
  {
    plugins: {
      jest: {
        rules: {
          'jest/consistent-test-it': ['error', { fn: 'test' }],
          'jest/no-identical-title': 'error',
          'jest/no-focused-tests': 'error',
          'jest/no-test-prefixes': 'error',
          'jest/no-done-callback': 'warn',
          'jest/valid-expect': 'error',
          'jest/valid-expect-in-promise': 'warn',
          'jest/no-duplicate-hooks': 'error',
        }
      }
    }
  }
];
