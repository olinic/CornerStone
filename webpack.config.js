var packagejson = require("./package.json");
function createConfig(target) {
   var name = packagejson.name;
   var version = packagejson.version;
   var filenameExtension = (process.argv.indexOf('--optimize-minimize') !== -1) ? ".min.js" : ".js";
   return {
      target: target,
      entry: "./src/index.ts",
      mode: "production",
      output: {
         filename: name + "-" + version + "." + target + filenameExtension,
         path: __dirname + "/dist/CornerStone-" + version,
         library: 'CornerStone',
         libraryTarget: 'umd'
      },

      // Enable sourcemaps for debugging webpack's output.
      devtool: "inline-source-map",

      resolve: {
         // Add '.ts' and '.tsx' as resolvable extensions.
         extensions: [".ts", ".tsx", ".js", ".json"]
      },

      module: {
         rules: [
            {
               test: /\.tsx?$/,
               use: "ts-loader",
               exclude: /node_modules/
            }
         ]
      }
   };
}
webConfig = createConfig("web");
nodeConfig = createConfig("node");

module.exports = [webConfig, nodeConfig];
