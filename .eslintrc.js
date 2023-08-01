const dev = require("@actions-kit/dev");

module.exports = dev.createEslintConfig({
  rules: {
    "prettier/prettier": "off",
  },
});
