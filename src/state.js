import {
    observe
} from "./observe/index";
import {
    isFunction
} from "./utils";

export function initState(vm) {
    const ops = vm.$options;
    if (ops.data) {
        initData(vm);
    }
}

function initData(vm) {
    //用户传入数据
    let data = vm.$options.data;

    // 如果用户传递的是一个函数 则取函数的返回值作为对象，对象则是对象
    // 只有根实例data可以是一个对象
    data = isFunction(data) ? data.call(vm) : data;

    observe(data);
    console.log('初始化数据')
}