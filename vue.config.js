module.exports = {
  productionSourceMap: false,
  devServer: {
    port: 9988, // 端口
    proxy: {
      '/api': { //请求路径关键字
        target: 'http://api.vikingship.xyz/api', //对应自己的接口
        changeOrigin: true,//是否允许跨域,在本地会创建一个虚拟服务端，然后发送请求的数据，
        // 并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        ws: true,
        pathRewrite: {
          '^/api': ''      //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替
          // 比如我要调用'http://api.vikingship.xyz/api/user/add'，直接写‘/api/user/add’即可
        }
      }
    }
  },
  configureWebpack(config) {
    if (process.env.NODE_ENV === 'production') {
      // eslint-disable-next-line @typescript-eslint/camelcase
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  }
  // lintOnSave: false // 取消 eslint 验证
}