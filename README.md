# 手撕Vue CLI #手写vue项目webpack配置文件#

## 摘要
当Vue CLI提供的工具链不足以满足当前项目的需求时，我们需要自己搭配vue编写合适的webpack配置。本篇将分析Vue CLI生成的配置文件，了解Vue的打包过程，给出Vue核心的依赖，并模仿着构建一个简单的基于webpack的vue项目。

## 准备
首先我们看下Vue CLI生成的`webpack`配置文件到底长啥样<br/>
先随便创建一个项目
```javascript
vue create vue-demo
```
下面是我选择的配置

![demo(vue[2] babel,router,vuex,eslint)](https://note.youdao.com/yws/public/resource/273d63d95668d0005a9eaa0e1b598350/WEBRESOURCE8a5187336479031df8aecbc08cff9748?ynotemdtimestamp=1628918857154)

我们使用审查命令看看最终的输出结果
```javascript
vue inspect --mode development > output.js
```
这超过1000行的配置，是不是看着很头疼，但其实大部分我们都接触过（这里默认你已具备了基础的[`webpack`](https://v4.webpack.docschina.org/concepts/)相关知识）,这里我只列出不一样的地方
```javascript
# output.js
{
  mode: '',
  context: '',
  node: {},
  entry: {},
  output: {},
  resolve: {},
  resolveLoader: {},
  optimization: {},
  ...
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          /* config.module.rule('vue').use('cache-loader') */
          {
            loader: '/Users/yifanwang/Desktop/Personal/workspace_github/blog/参考资料/vue-demo/node_modules/cache-loader/dist/cjs.js',
            options: {
              cacheDirectory: '/Users/yifanwang/Desktop/Personal/workspace_github/blog/参考资料/vue-demo/node_modules/.cache/vue-loader',
              cacheIdentifier: '09abebe4'
            }
          },
          /* config.module.rule('vue').use('vue-loader') */
          {
            loader: '/Users/yifanwang/Desktop/Personal/workspace_github/blog/参考资料/vue-demo/node_modules/vue-loader/lib/index.js',
            options: {
              compilerOptions: {
                whitespace: 'condense'
              },
              cacheDirectory: '/Users/yifanwang/Desktop/Personal/workspace_github/blog/参考资料/vue-demo/node_modules/.cache/vue-loader',
              cacheIdentifier: '09abebe4'
            }
          }
        ]
      },
      ...
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('css').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: '/Users/yifanwang/Desktop/Personal/workspace_github/blog/参考资料/vue-demo/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('css-loader') */
              {
                loader: '/Users/yifanwang/Desktop/Personal/workspace_github/blog/参考资料/vue-demo/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: '/Users/yifanwang/Desktop/Personal/workspace_github/blog/参考资料/vue-demo/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('css').oneOf('vue').use('vue-style-loader') */
              {
                loader: '/Users/yifanwang/Desktop/Personal/workspace_github/blog/参考资料/vue-demo/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue').use('css-loader') */
              {
                loader: '/Users/yifanwang/Desktop/Personal/workspace_github/blog/参考资料/vue-demo/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('vue').use('postcss-loader') */
              {
                loader: '/Users/yifanwang/Desktop/Personal/workspace_github/blog/参考资料/vue-demo/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('css').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: '/Users/yifanwang/Desktop/Personal/workspace_github/blog/参考资料/vue-demo/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('css-loader') */
              {
                loader: '/Users/yifanwang/Desktop/Personal/workspace_github/blog/参考资料/vue-demo/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: '/Users/yifanwang/Desktop/Personal/workspace_github/blog/参考资料/vue-demo/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal') */
          {
            use: [
              /* config.module.rule('css').oneOf('normal').use('vue-style-loader') */
              {
                loader: '/Users/yifanwang/Desktop/Personal/workspace_github/blog/参考资料/vue-demo/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal').use('css-loader') */
              {
                loader: '/Users/yifanwang/Desktop/Personal/workspace_github/blog/参考资料/vue-demo/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('normal').use('postcss-loader') */
              {
                loader: '/Users/yifanwang/Desktop/Personal/workspace_github/blog/参考资料/vue-demo/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          }
        ]
      },
      ...
    ]A
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    ...
  ],
}
```
稍微观察一下，你可能会有这些疑惑
1. `vue-loader`是干什么的？
2. 为什么有4个匹配css的不同打包规则？里面的`resourceQuery`是什么意思？
3. 为什么打包css的最后一项，使用的都是`vue-style-loader`？和`style-loader`有什么区别？
4. `vue-loader-plugin`是干什么的？与`vue-loader`是什么关系？

## .vue文件是如何打包的
`vue-loader`猜一下，应该就是用于打包.vue文件的，看一下官网的描述，也不难发现，上述问题其实也都和vue打包过程相关，其实**构建vue项目webpack配置的核心就是配置.vue文件的打包**，所以我们得先明白.vue文件是如何打包的

> #### Tip<br/>
> 这里建议看完npm官网里面关于[`vue-loader`](https://www.npmjs.com/package/vue-loader)的描述，包括How It Works部分，内容不多，而且能让你很清晰的了解.vue文件是如何被打包的

首先，`vue-loader`允许你以一种名为单文件组件 (SFCs)的格式撰写 Vue 组件，像下面这样
```javascript
# source.vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>
```
它能够打包.vue文件但是并不直接转换源代码，而是使用自己的专用加载器链处理 SFC 内的每个语言块，最后将这些块组装在一起成为最终模块，比如经过`vue-loader`打包的上面组件可能长这样子:
```javascript
// code returned from the main loader for 'source.vue'

// import the <template> block
import render from 'source.vue?vue&type=template'
// import the <script> block
import script from 'source.vue?vue&type=script'
export * from 'source.vue?vue&type=script'
// import <style> blocks
import 'source.vue?vue&type=style&index=1'

script.render = render
export default script
```
注意代码是如何导入 source.vue 本身的，每个块都有不同的请求查询。<br/>
我们希望对于上面引入的`source.vue?vue&type=script`模块能够像被.js模块那样打包，同理其他块，这就是`vue-loader-plugin`要做的事：**对于 webpack 配置中的每个模块规则，它会创建一个修改后的克隆，以对应的 Vue 语言块请求为目标** (还记得之前的第二个问题吗，==关于css其中的两个打包规则，其实就是`vue-loader-plugin`生成的, 所以之后写配置的时候就不用自己添加了==)。<br/>

假设我们已经为所有 *.js 文件配置了 babel-loader。
该规则也将被克隆并应用于 Vue SFC,在webpack内部，像下面代码
```javascript
import 'source.vue?vue&type=script'
```
将扩展成：
```javascript
import script from 'babel-loader!vue-loader!source.vue?vue&type=script'
```
在处理扩展请求时 **(babel-loader!vue-loader!)**，`vue-loader` 将再次被调用。
不过这一次，加载器注意到请求有查询并且仅针对特定块。
因此它选择将目标块的内部内容传递给与其匹配的loader

#### 小结：.vue文件打包的流程

```
graph TD
A[vue-loader-plugin根据webpack配置,创建一个修改后的克隆] --> B[vue-loader解析.vue文件,转为三个导入模块,并添加请求查询]
    B --> C[vue-loader-plugin给三个导入模块添加扩展请求]
    C --> D[vue-loader再次处理,并根据请求查询交由匹配的loader]
```

## vue核心依赖
有了上面的铺垫，我们知道需要`vue-loader`和`vue-loader-plugin`来处理.vue文件，并且知道.vue文件中的块会交给相应的loader处理。结合导出的配置来看，`<script>`块是交给了`babel-loader`和`cache-loader`,`<style>`块是交给`postcss-loader`,`css-loader`和`vue-style-loader`，`<template>`块比较特殊，在配置中找不到类似`template-loader`的存在，这是需要注意的一点:<br/>
==在.vue文件打包中，<template>块交由 vue-template-compiler 处理， vue-loader会自动调用，虽然不需要写在配置中，但是需要安装==
#### 补充：vue-style-loader与style-loader的区别
`style-loader` 和 `vue-style-loader` 都可以加载样式模块，通过 `<style>` 标签把样式挂载到页面上，不同的是 `vue-style-loader` 还做了一些服务端渲染的支持，所以如果你的 vue 项目是需要支持服务端渲染的时候，就需要用到 `vue-style-loader` 了

#### 小节：.vue所需依赖
```javascript
# vue核心
vue

# 处理.vue文件
vue-loader
vue-loader-plugin

# 处理<template>
vue-template-compiler

# 处理<script>
babel-loader
cache-loader

# 处理<style>
postcss-loader
css-loader
vue-style-loader

# 其中我们需要关注的只有
vue
vue-loader
vue-loader-plugin
vue-template-compiler
vue-style-loader
```

## 手写基于webpack的vue项目
最难的一部分理解了以后，剩下就是<del>写</del>抄配置了，
> #### Tip
> 接下来的包安装我都会使用指定的版本，确保不会出现稀奇古怪的报错，反过来说，如果你出现了看不懂的报错，很有可能是安装包的版本不匹配
### 通用webpack配置
创建项目目录
```javascript
|- vue-webpack
   |- public
      - favicon.ico
      - index.html
   |- src  
      |- assets
      |- components
      |- router
      |- store
      |- views
      - main.js
```
创建`package.json`
```javascript
npm init -y
```
安装`wbepack`,`webpack-cli`
```javascript
npm i -D webpack@^4.46.0 webpack-cli@^4.7.2
```
安装`webpack-dev-server`
```javascript
npm i -D webpack-dev-server@^3.11.2
```
在`packag.json`中添加一条自定义指令
```javascript
"scripts": {
  ...
  "start": "webpack serve --open"
},
```

配置babel
```javascript
# 安装babel
npm i -D @babel/core @babel/cli @babel/preset-env
npm i -S @babel/polyfill

# 配置babel.config.json
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```
配置postcss
```javascript
# 安装
npm i -D postcss
npm i -D autoprefixer

# 配置postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```
通用webpack配置
```javascript
# 安装plugin
npm i -D html-webpack-plugin@^3.2.0 
npm i -D copy-webpack-plugin@^5.1.2 
npm i -D clean-webpack-plugin@^4.0.0-alpha.0
npm i -D terser-webpack-plugin@^4.0.0
npm i -D friendly-errors-webpack-plugin
npm i -D case-sensitive-paths-webpack-plugin

# 安装loader
npm i -D babel-loader
npm i -D cache-loader@^4.1.0
npm i -D url-loader@^2.3.0
npm i -D file-loader@^4.3.0
npm i -D style-loader@^2.0.0
npm i -D css-loader@^3.6.0
npm i -D postcss-loader@^4.3.0

# 配置webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

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
    host: "0.0.0.0",
    port: 8080,
    contentBase: path.resolve(__dirname, 'dist'),
    quiet: true, // webpack打包时不输出错误日志(friendly-errors-webpack-plugin添加的配置)
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
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new TerserPlugin(
        {
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
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          },
          sourceMap: true,
          cache: true,
          parallel: true,
          extractComments: false
        }
      )
    ]
  },
  module: {
    rules: [
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
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* 处理svg模块 */
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      /* 处理影音视频模块 */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* 处理字体图标模块 */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
    ]
  },
  plugins: [
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
  ]
}

```
此时，运行`npx webpack`命令，你可能会看到如下报错
> #### ERROR in Template execution failed: ReferenceError: BASE_URL is not defined
> 解决方案：将public/index.html中的 BASE_URL 替换为 htmlWebpackPlugin.options.url

### 添加vue相关配置
```javascript
# 安装
npm i -S vue@^2.6.14
npm i -D vue-loader@^15.9.8
npm i -D vue-style-loader@^4.1.3 
npm i -D vue-template-compiler@^2.6.14

# 配置webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  ...
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* 处理vue模块 */
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/vue-loader'),
            }
          },
          /* config.module.rule('vue').use('vue-loader') */
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                whitespace: 'condense'
              },
              cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/vue-loader'),
            }
          }
        ]
      },
      ...
    ]
    ...
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
  ...
}
```
现在已经可以打包.vue文件了

### 完善工具链
安装vue-router
```javascript
npm i -S vue-router
```
安装vuex
```javascript
npm i -S vuex
```
复制main.js
```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```
复制App.vue（其余内容如router配置，store目录以及组件请自行复制）
```javascript
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
```

### 补充
项目地址：https://github.com/stone4321/vue-webpack
