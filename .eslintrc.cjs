require("@rushstack/eslint-patch/modern-module-resolution");

/** @type {import('eslint/lib/options.js').ParsedCLIOptions}*/
module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
  ],
  /** @type {import('@typescript-eslint/types').ParserOptions}*/
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "vue/multi-word-component-names": false,
  },
};
