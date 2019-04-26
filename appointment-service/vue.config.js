// const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

// function resolve (dir) {
//   return path.join(__dirname, `src/${dir}`)
// }

module.exports = {
  baseUrl: '/',

  chainWebpack: config => {
    // 自动修复eslint报错
    config.module.rule('eslint')
      .use('eslint-loader')
      .options({
        fix: true
      })

    // 暂时关闭 eslint
    // config.module.rules.delete('eslint');
  },

  // css: {
  //   loaderOptions: {
  //     // 向所有 Sass 样式传入共享的全局变量、mixins
  //     sass: {
  //       data: `
  //         @import "@/styles/_variables.scss";
  //         @import "@/styles/_variables-element.scss";
  //         @import "@/styles/_mixins.scss";
  //       `
  //     }
  //   }
  // },

  devServer: {
    proxy: process.env.VUE_APP_API_URL
  },

  configureWebpack: {
    optimization: {
      minimizer: isProd ? [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true
            }
          }
        })
      ] : []
    }
  }
}
