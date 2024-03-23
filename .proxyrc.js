const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://moviesappbackend.onrender.com/api",
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
