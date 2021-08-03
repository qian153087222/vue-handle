import { initMixin } from './init';

//vue 要如何实现 原型模式 所有的功能都通过原型扩展的方式来添加 
function Vue(options) {
    this._init(options); //实现初始化vue
}

// 初始化
initMixin(Vue);

// 导出vue给别人使用
export default Vue;

// 1.new Vue 会调用_init方法进行初始化操作
// 2.会将用户的选项放在vm.$options上
// 3.会对当前属性上搜索有没有data数据 initState
// 4.有data判断data是不是一个函数 如果是函数取返回值 initData
// 5.observe取观测data中的数据
// 6.vm上取值也能取到data中的数据 vm._data = data 这样用户能取到data了 vm._data
// 7.用户觉得有点麻烦vm.xxx =>vm._data

// 如果el需要挂载在页面上