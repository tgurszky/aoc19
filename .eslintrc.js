module.exports = {
  extends: ["plugin:jest/recommended"],
  plugins: ["import", "jest"],
  env: {
    node: true,
    es6: true,
    "jest/globals": true
  },
  parserOptions: {
    sourceType: "module"
  }
};
