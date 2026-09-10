import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "playwright-report/**", "test-results/**", "data/**", ".impeccable/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.js", "scripts/**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        document: "readonly",
        window: "readonly",
        localStorage: "readonly",
        console: "readonly",
        process: "readonly",
        fetch: "readonly",
        FormData: "readonly",
        performance: "readonly",
        requestAnimationFrame: "readonly",
        IntersectionObserver: "readonly",
      },
    },
    rules: {
      // A meglévő kódstílus szándékosan üresen hagyja a catch(error)-t
      // (privát böngészés / letiltott storage esetén), kommenttel jelezve.
      "@typescript-eslint/no-unused-vars": ["error", { caughtErrors: "none" }],
    },
  },
  eslintConfigPrettier
);
