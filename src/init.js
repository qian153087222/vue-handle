import { initState } from "./state";

export function initMixin(Vue){
    // 后续组件化开发的时候 Vue.extend 可以创造一个子组件 子组件可以继承Vue,子组件也可以调用_init方法
    Vue.prototype._init = function(options){
        const vm = this;
        
        //把用户的选项放在 vm上,这样在其他方法中都可以获取到options
        vm.$options = options;//为了后续扩展的方法 都可以获取到$optios

        // options 中用户传入数据el ，data
        initState(vm);
        if(vm.$options.el){
            // 要降数据挂载到页面上
            console.log('页面要挂载')
        }
        console.log(options,3443);
    }
}