/**
 * Execute via
 *   webpack --config ./spec/webpack.config.js
 * in the project directory
 */
module.exports = {
   entry: "./spec/SpecBrowserTests.js",
   output: {
      filename: "SpecBundle.js",
      path: __dirname
   },

   resolve: {
      // resolvable extensions.
      extensions: [".js"]
   }
};
