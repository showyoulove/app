'use strict'
const path = require('path')


// // 是否为生产环境
// const isProduction = process.env.NODE_ENV !== 'development'
// // 本地环境是否需要使用cdn
// const devNeedCdn = false
// // cdn链接
// const vueJS = isProduction ? '//cdn.staticfile.org/vue/2.6.11/vue.min.js' : '//cdn.staticfile.org/vue/2.6.11/vue.js'
// const vuexJS = isProduction ? '//cdn.staticfile.org/vuex/3.5.1/vuex.min.js' : '//cdn.staticfile.org/vuex/3.5.1/vuex.js'
// const vueRouterJS = isProduction ? '//cdn.staticfile.org/vue-router/3.4.3/vue-router.min.js' : '//cdn.staticfile.org/vue-router/3.4.3/vue-router.js'
// const uiJS = isProduction ? '//cdn.staticfile.org/element-ui/2.14.0/index.min.js' : '//cdn.staticfile.org/element-ui/2.14.0/index.js'
// const axiosJS = isProduction ? '//cdn.staticfile.org/axios/0.19.2/axios.min.js' : '//cdn.staticfile.org/axios/0.19.2/axios.js'
// const cdn = {
//   // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
//   externals: {
//     vue: 'Vue',
//     vuex: 'Vuex',
//     'vue-router': 'VueRouter',
//     'element-ui': 'ELEMENT',
//     'axios': 'axios'
//   },
//   // cdn的css链接
//   css: [
//     '//cdn.staticfile.org/element-ui/2.14.0/theme-chalk/index.css',
//   ],
//   // cdn的js链接
//   js: [
//     vueJS,vuexJS,vueRouterJS,uiJS,axiosJS
//   ]
// }

module.exports = {
  publicPath: './',   //基本路径
  outputDir: 'dist',  //打包输出目录
  assetsDir: 'static',    // 静态资源放置目录
  // indexPath: 'index.html',    //html输出路径
  filenameHashing: false,    //文件名hash
  productionSourceMap: false,  //删除.map文件
  lintOnSave: true,   // 保存时使用 ‘eslint-loader’ 进行检查
  runtimeCompiler: true,
  devServer: {
    port: 9999,
    host: '0.0.0.0',
    open: true,
    hot: true,  // 是否启用模块的热替换功能，开启hot后，将在不刷新整个页面的情况下通过新模块替换老模块来做到实时预览
  },
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        /*sass-loader V8.0语法 */
        prependData: '@import "~@/style/variables.scss";',

        /*sass-loader V9.0写法*/
        // additionalData(content, loaderContext) {
        //   const { resourcePath, rootContext } = loaderContext
        //   const relativePath = path.relative(rootContext, resourcePath)
        //   if (
        //     relativePath.replace(/\\/g, '/') !== 'src/style/variables.scss'
        //   ) {
        //     return '@import "~@/style/variables.scss";' + content
        //   }
        //   return content
        // },
      },
    },
  },
}
