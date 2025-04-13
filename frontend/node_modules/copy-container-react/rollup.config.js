const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const babel = require("@rollup/plugin-babel");
const postcss = require("rollup-plugin-postcss");
const resolve = require("@rollup/plugin-node-resolve").default; // .default might be needed for ESM exports
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");

module.exports= {
  input: "src/CopyContainer.jsx",
  output: [
    {
      file: "src/rollup_output.js",
      format: "cjs",
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    postcss({
      plugins: [
        require("tailwindcss"),
        require("autoprefixer")
      ],
      extract: false, // Inline styles to the JS file
      modules: false,  // Use CSS modules
      use: ["sass"]   // Use Sass as preprocessor
    }),
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/env", "@babel/preset-react"]
    }),
    resolve(),
    commonjs(),
    json()
  ]
};
