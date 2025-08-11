// eslint.config.js
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["node_modules", "dist"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  ...tseslint.configs.recommended,
];
