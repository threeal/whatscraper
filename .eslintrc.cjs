/* eslint-env node */
module.exports = {
  root: true,
  extends: ["eslint:recommended"],
  overrides: [
    {
      files: ["**/*.ts"],
      extends: ["plugin:@typescript-eslint/recommended"],
    },
  ],
};
