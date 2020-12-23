module.exports = {
  pluginOptions: {
      proxy: {
          enabled: true,
          context: ['/auth', '/v1'],
          options: {
              target: 'http://localhost:8081',
              ws: true,
              changeOrigin: true,
              secure: true
          }
      }
  }
}