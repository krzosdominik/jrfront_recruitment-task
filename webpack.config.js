var webpack = require("webpack");
const path = require("path");
const fs = require('fs');

const TerserPlugin = require('terser-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const HTMLWebpackPlugin = require("html-webpack-plugin");
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map(item => {
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]
    return new HTMLWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
    })
  })
}

const htmlPlugins = generateHtmlPlugins('./src/pages')

module.exports = {
  entry: ["./src/js/index.js", "./src/scss/main.scss"],
  output: {
    filename: "js/bundle.js",
    path: path.join(__dirname, "./dist/")
  },
  devServer: {
    contentBase: "./dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(svg|png|jpe?g)/i,
        use: [{
          loader: "url-loader",
          options: {
            name: "./images/[name].[ext]",
            limit: 5000
          }
        },
        {
          loader: "img-loader"
        }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/main.css"
    }),
    new CopyWebpackPlugin([{
      from: 'src/images',
      to: 'images'
    }]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
    .concat(htmlPlugins)
    .concat(new HtmlBeautifyPlugin({
      config: {
        html: {
          end_with_newline: true,
          indent_size: 2,
          indent_with_tabs: true,
          indent_inner_html: true,
          preserve_newlines: true,
          unformatted: ['p', 'i', 'b', 'span']
        }
      }
    })),
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  resolve: {
    alias: {
      jquery: "jquery/src/jquery"
    }
  }
};