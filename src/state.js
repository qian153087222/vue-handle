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

function proxy(obj, key, source) {
    // 取值的时候做代理 不是暴力把_data属性赋予给vm 而且直接赋值会命名冲突问题
    Object.defineProperty(obj, key, {
        get() {
            return obj[source][key];
        },
        set(newValue) {
            obj[source][key] = newValue;
        }
    })
}

function initData(vm) {
    //用户传入数据
    let data = vm.$options.data;

    // 如果用户传递的是一个函数 则取函数的返回值作为对象，对象则是对象
    // 只有根实例data可以是一个对象

    // data和vm._data 是同一个对象 引用的是同一个人 -> data被劫持了 vm._data也被劫持
    data = vm._data = isFunction(data) ? data.call(vm) : data; //_data已经是响应式了

    // 初始化数据
    // 需要将data变成响应式Objetct.defineProperty 重写data中的数据
    observe(data);
    for (const key in data) {
        proxy(vm, key, '_data')
    }
}

