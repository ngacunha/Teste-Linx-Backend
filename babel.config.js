module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: '14' } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@errors': './src/errors',
        '@services': './src/services',
        '@routes': './src/routes',
        '@config': './src/config',
        '@repositories': './src/repositories',
        '@models': './src/models',
        '@middlewares': './src/middlewares',
        '@utils': './src/utils',
        '@controllers': './src/controllers'
      }

    }],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose': true }]
  ],
}
