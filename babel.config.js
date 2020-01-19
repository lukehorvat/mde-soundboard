module.exports = {
  presets: [
    ["@babel/preset-env", { useBuiltIns: "usage", corejs: { version: 3 } }]
  ],
  plugins: [
    "transform-inline-environment-variables"
  ]
};
