import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default [
  // CommonJS
  {
    input: "src/index.js",
    output: {
      file: "lib/cjs.js",
      format: "cjs",
      indent: false
    },
    plugins: [
      resolve(),
      babel({
        exclude: "node_modules/**" // only transpile our source code
      })
    ]
  },
  // ES
  {
    input: "src/index.js",
    output: {
      file: "lib/es.js",
      format: "es",
      indent: false
    },
    plugins: [
      resolve(),
      babel({
        exclude: "node_modules/**" // only transpile our source code
      })
    ]
  }
];
