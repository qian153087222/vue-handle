import { initMixin } from './init';

//vue 要如何实现 原型模式 所有的功能都通过原型扩展的方式来添加 
function Vue(options) {
    this._init(options); //实现初始化vue
}

// 初始化
initMixin(Vue);

// 导出vue给别人使用
export default Vue;