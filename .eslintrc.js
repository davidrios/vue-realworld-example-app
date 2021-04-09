module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/strongly-recommended", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/max-attributes-per-line": [
      "warn",
      {
        singleline: 3
      }
    ]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
