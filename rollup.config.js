import babel from 'rollup-plugin-babel';
// 压缩代码
import { uglify } from 'rollup-plugin-uglify';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

export default {
    input: './src/index.js',
    output: {
        file: 'dist/vue.js',//打包出口
        format: 'umd',//常见格式 IIFE ESM CJS UMD
        name:'Vue',//umd模块需要配置name，会降导出的模块放到window上，如果nnode中使用cjs 如果只是打包webpack里面导入 esm模块 前端 script iife umd
        sourcemap: true,// 可以进行源码调试
    },
    plugins: [
        babel({
            exclude: 'node_modules/**' //glob写法 去掉node_modules下所有文件
        }),
        // 压缩代码
        uglify(),
        // 热更新 默认监听根文件夹
        livereload(),
        // 本地服务器
        serve({
            open: true, // 自动打开页面
            port: 10086,
            openPage: '/public/index.html', // 打开的页面
            contentBase: ''
        })
    ]
}