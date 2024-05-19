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
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    camelcase: "off",
    "i18n-text/no-en": "off",
    "import/no-namespace": "off",
    "import/no-unresolved": "off",
    "no-shadow": "off",
    "prettier/prettier": "off",
  },
  env: {
    es6: true,
    node: true,
  },
};
