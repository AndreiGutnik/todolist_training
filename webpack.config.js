const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = __dirname;
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'public');
const modulesDir = path.resolve(rootDir, 'node_modules');

module.exports = env => {
  return {
    mode: env.mode ?? 'development',
    devtool: 'inline-source-map',
    devServer: {
      port: 3000,
      open: true,
    },

    entry: path.resolve(rootDir, 'src', 'App.tsx'),

    output: {
      path: distDir,
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Timers',
        template: path.resolve(publicDir, 'index.html'),
        module: true,
        lang: 'en',
      }),
    ],
    module: {
      rules: [
        //css loader
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
          ],
        },
        //ts loader
        {
          test: /\.tsx?$/,
          exclude: modulesDir,
          use: {
            loader: 'ts-loader',
          },
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  };
};
