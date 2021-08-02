import babel from 'rollup-plugin-babel';

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
        })
    ]
}