'use strict';

module.exports = {
  modifyWebpackConfig({ env, webpackConfig, options }) {
    const clientOnly = /spa|single-page-application/.test(
      options.razzleOptions.buildType
    );

    if (!clientOnly && !env.dev) return webpackConfig;

    const { pluginOptions } = options;
    const normalizedOptions = Array.isArray(pluginOptions) ? pluginOptions : [pluginOptions || {}];

    const proxyConfig = normalizedOptions.map((proxyOptions) => {
      const context = proxyOptions.clientPath || '/api';

      let target;
      if (pluginOptions.apiUrl) {
        target = pluginOptions.apiUrl;
      } else {
        const apiHost = pluginOptions.apiHost || 'localhost';
        const apiPort = pluginOptions.apiPort || (pluginOptions.apiHost ? null : 8080);
        const useSSL = pluginOptions.useSSL || false;

        target = `${useSSL ? 'https' : 'http'}://${apiHost}${apiPort ? `:${apiPort}` : ''}`;
      }

      return { context, target };
    });

    return {
      ...webpackConfig,
      devServer: {
        ...webpackConfig.devServer,
        proxy: proxyConfig,
      }
    };
  }
};
