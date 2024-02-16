// webpack.config.js
module.exports = {
    //... otras configuraciones existentes

    resolve: {
    fallback: {
        "zlib": require.resolve("browserify-zlib"),
        "querystring": require.resolve("querystring-es3"),
        "path": require.resolve("path-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify")
    },
    },

    //... otras configuraciones existentes
};
