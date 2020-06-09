const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        "/data", createProxyMiddleware({
            target: "https://api.openweathermap.org",
            changeOrigin: true,
            secure: true
        })
    )
};