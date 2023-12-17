/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:github/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 9,
    project: "tsconfig.eslint.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "jest"],
  rules: {
    camelcase: "off",
    "i18n-text/no-en": "off",
    "import/no-namespace": "off",
    "no-shadow": "off",
    "prettier/prettier": "off",
  },
  env: {
    es6: true,
    "jest/globals": true,
    node: true,
  },
};
