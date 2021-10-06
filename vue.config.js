module.exports = {
    devServer: {
        progress: true,
        proxy: {
            '^/api/v3': {
                target:'https://api.coingecko.com/',
                changeOrigin: true
            },
        },
    }
};
