const PROXY_CONFIG = [
    {
      context: ['/api'] ,
      target: 'http://localhost:3000/api',
      sucere: false,
      logLevel: 'debug',
      pathRewrite: { '^/api': '' }
    }
  ];
  module.exports = PROXY_CONFIG; 