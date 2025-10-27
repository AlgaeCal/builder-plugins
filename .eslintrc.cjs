/**
 * @type {import("@types/eslint").Linter.BaseConfig}
 */
module.exports = {
  ignorePatterns: ["node_modules/**", "dist/**"],
  // parser: '@typescript-eslint/parser',
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/naming-convention": "off",
    "hydrogen/prefer-image-component": "off",
    "no-useless-escape": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    "no-case-declarations": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "@typescript-eslint/no-empty-object-type": "off",
  },
};
