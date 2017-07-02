/**
 * Execute via
 *    webpack --config ./spec/webpack.config.js
 * in the project directory
 */
module.exports = {
    entry: "./spec/SpecBrowserTests.js",
    output: {
        filename: "SpecBundle.js",
        path: __dirname
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".js"]
    }
};
