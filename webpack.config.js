const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  context: __dirname,
  entry: {
    main: "./src/main.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    publicPath: "/",
    chunkFilename: "js/[name].js",
  },
  devServer: {
    host: "127.0.0.1",
    port: 8080,
    contentBase: path.resolve(__dirname, "dist"),
    quiet: false, // webpack打包时不输出错误日志(friendly-errors-webpack-plugin添加的配置)
  },
  node: {
    setImmediate: false,
    process: "mock",
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".mjs", ".js", ".jsx", ".vue", ".json", ".wasm"],
    modules: ["node_modules", path.resolve(__dirname, "node_modules")],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: "chunk-vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "initial",
        },
        common: {
          name: "chunk-common",
          minChunks: 2,
          priority: -20,
          chunks: "initial",
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            arrows: false,
            collapse_vars: false,
            comparisons: false,
            computed_props: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false,
            typeofs: false,
            booleans: true,
            if_return: true,
            sequences: true,
            unused: true,
            conditionals: true,
            dead_code: true,
            evaluate: true,
          },
          mangle: {
            safari10: true,
          },
        },
        sourceMap: true,
        cache: true,
        parallel: true,
        extractComments: false,
      }),
    ],
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* 处理vue模块 */
      {
        test: /\.vue$/,
        use: [
          {
            loader: "cache-loader",
            options: {
              cacheDirectory: path.resolve(
                __dirname,
                "node_modules/.cache/vue-loader"
              ),
            },
          },
          /* config.module.rule('vue').use('vue-loader') */
          {
            loader: "vue-loader",
            options: {
              compilerOptions: {
                whitespace: "condense",
              },
              cacheDirectory: path.resolve(
                __dirname,
                "node_modules/.cache/vue-loader"
              ),
            },
          },
        ],
      },
      /* 处理js模块 */
      {
        test: /\.m?jsx?$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        use: [
          {
            loader: "cache-loader",
            options: {
              cacheDirectory: path.resolve(
                __dirname,
                "node_modules/.cache/babel-loader"
              ),
            },
          },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: path.resolve(
                __dirname,
                "node_modules/.cache/babel-loader"
              ),
            },
          },
        ],
      },
      /* 处理css样式 */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: "[name]_[local]_[hash:base64:5]",
                  },
                },
              },
              "postcss-loader",
            ],
          },
          /* config.module.rule('css').oneOf('normal') */
          {
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                },
              },
              "postcss-loader",
            ],
          },
        ],
      },
      /* 处理图片模块 */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4096,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "img/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
      /* 处理svg模块 */
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[hash:8].[ext]",
            },
          },
        ],
      },
      /* 处理影音视频模块 */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4096,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "media/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
      /* 处理字体图标模块 */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4096,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "fonts/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "vue-webpack",
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new CleanWebpackPlugin(),
    new CaseSensitivePathsPlugin(),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, "public"),
        to: path.resolve(__dirname, "dist"),
        toType: "dir",
        ignore: [
          ".DS_Store",
          {
            glob: "index.html",
            matchBase: false,
          },
        ],
      },
    ]),
    new FriendlyErrorsWebpackPlugin(),
  ],
};
