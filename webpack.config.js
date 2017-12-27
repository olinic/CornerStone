var packagejson = require("./package.json");
var name = packagejson.name;
var version = packagejson.version;
var filenameExtension = (process.argv.indexOf('--optimize-minimize') !== -1) ? ".min.js" : ".js";
module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: name + "-" + version + filenameExtension,
        path: __dirname + "/dist/CornerStone-" + version,
        library: 'CornerStone',
        libraryTarget: 'umd'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};
