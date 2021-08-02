(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    //判断是否是函数
    function isFunction(val) {
      return typeof val === 'function';
    } //判断是否是对象

    function isObject(val) {
      return typeof val === 'object' && val !== null;
    }

    function observe(value) {
      // 1.如果value不是对象，就不用观测了
      console.log(isObject(value));
    }

    function initState(vm) {
      const ops = vm.$options;

      if (ops.data) {
        initData(vm);
      }
    }

    function initData(vm) {
      //用户传入数据
      let data = vm.$options.data; // 如果用户传递的是一个函数 则取函数的返回值作为对象，对象则是对象
      // 只有根实例data可以是一个对象

      data = isFunction(data) ? data.call(vm) : data;
      observe(data);
      console.log('初始化数据');
    }

    function initMixin(Vue) {
      // 后续组件化开发的时候 Vue.extend 可以创造一个子组件 子组件可以继承Vue,子组件也可以调用_init方法
      Vue.prototype._init = function (options) {
        const vm = this; //把用户的选项放在 vm上,这样在其他方法中都可以获取到options

        vm.$options = options; //为了后续扩展的方法 都可以获取到$optios
        // options 中用户传入数据el ，data

        initState(vm);

        if (vm.$options.el) {
          // 要降数据挂载到页面上
          console.log('页面要挂载');
        }
      };
    }

    function Vue(options) {
      this._init(options); //实现初始化vue

    } // 初始化


    initMixin(Vue); // 导出vue给别人使用
    // 2.会将用户的选项放在vm.$options上
    // 3.会对当前属性上搜索有没有data数据 initState
    // 4.有data判断data是不是一个函数 如果是函数取返回值 initData
    // 5.observe取观测data中的数据
    // 如果el需要挂载在页面上

    return Vue;

})));
//# sourceMappingURL=vue.js.map
