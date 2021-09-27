# razzle-plugin-spa-api-proxy

This module contains a plugin to proxy API requests for SPA build type using Webpack dev server proxy with Razzle.

# Usage in Razzle Projects

```
yarn add razzle-plugin-spa-api-proxy --dev
```

## With default options

```javascript
// razzle.config.js

module.exports = {
  plugins: ['spa-api-proxy'],
};
```

All request with path starting with `/api` will be directed to `http://localhost:8080/api`.

## With custom config

```javascript
// razzle.config.js

module.exports = {
  plugins: [
    {
      name: 'spa-api-proxy',
      options: {
        clientPath: '/custom-api',
        apiUrl: 'https://my-api.example.com'
      },
    },
  ],
};
```

# Options
Object with fields below or array of such objects if you need to proxy sever paths.

## clientPath
default: `/api`

Path that will be directed to API server

## apiHost
default: `localhost`

API server host

## apiPort
default: `8080`

API server port

## useSSL
default: `false`

Use HTTPS connection

## apiUrl
default: `http://localhost:8080`

Shorthand for `apiHost`, `apiPort` and `useSSL` options. Will override former if both are present.