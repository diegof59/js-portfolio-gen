const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')
//const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@templates': path.resolve(__dirname, 'src/templates'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$|\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]'
        }
      },
      {
        test: /\.woff$|\.woff2$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin(),
    /* Plugin to copy files from a dir to another
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets/images'),
          to: 'assets/images'
        }
      ]
    }) */
  ],
  optimization: {
    minimizer: ['...', new CSSMinimizerPlugin()] // ... to extend default minimizer values
  }
}