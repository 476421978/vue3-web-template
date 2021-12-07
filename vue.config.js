const productionGzipExtensionsc = ['js', 'css'] //压缩的文件类型
const CompressionPlugin = require('compression-webpack-plugin') //引入插件
const TerserPlugin = require('terser-webpack-plugin') // v4构建时去除注释压缩文件，v5自带
const Timestamp = new Date().getTime()
// vue.config.js
module.exports = {
  publicPath: '/',
  filenameHashing: false, // 不用哈希值
  productionSourceMap: false, // 隐藏.map格式定位代码
  transpileDependencies: [
    // 兼容ie
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    output: {
      filename: `[name].${Timestamp}.js`,
      chunkFilename: `[name].${Timestamp}.js`
    },
    resolve: {
      symlinks: false
    },
    plugins: [
      new CompressionPlugin({
        //[file] 会被替换成原始资源。[path] 会被替换成原始资源的路径， [query] 会被替换成查询字符串。默认值是 "[path].gz[query]"。
        filename: '[path].gz[query]', // 提示compression-webpack-plugin@3.0.0的话asset改为filename
        //可以是 function(buf, callback) 或者字符串。对于字符串来说依照 zlib 的算法(或者 zopfli 的算法)。默认值是 "gzip"。
        algorithm: 'gzip',
        //所有匹配该正则的资源都会被处理。默认值是全部资源。
        test: new RegExp('\\.(' + productionGzipExtensionsc.join('|') + ')$'),
        //只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0。
        threshold: 10240,
        //只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
        minRatio: 0.8
      }),
      new TerserPlugin()
    ]
  }
  // 代码分析
  // chainWebpack: (config) => {
  //   config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  // }
}
