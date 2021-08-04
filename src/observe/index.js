import { isArray, isObject } from "../utils";
import arrayMethods from "./array";

class Observe {
    constructor(value) {
        // 不让__ob__被遍历
        // value.__ob__ = this; // 我给对象和数组添加了一个自定义属性
        Object.defineProperty(value,'__ob__',{
            value:this,
            enumerable:false,// 标识这个属性不能被枚举处理 不能没循环
        });
        // 更改数组原型方法，如果是数组 就改写数组的原型链
        if (isArray(value)) {
            // 重写数组方法
            value.__proto__ = arrayMethods;
            // 深度监听数组内参数
            this.observeArray(value);
        } else {
            this.walk(value);//核心就是循环对象
        }
    }
    observeArray(value){
        // 递归遍历数组 对数组内部的对象再次重写[[],{}]
        value.forEach(item=>observe(item));
    }
    walk(data) {
        Object.keys(data).forEach(key => {
            // 要使用defineProperty重新定义
            defineProperty(data, key, data[key]);
        });
    }
}

// vue2 应用了defineProperty需要 加载的时候 就进行递归操作 所以耗性能 如果层次过深会浪费性能
// 1).性能优化原则
// 2).不要写数据的时候 层级过深 尽量扁平化数据
// 3).不要频繁获取数据
// 4).如果数据不需要响应式 可以使用Object.freeze 冻结属性
function defineProperty(obj, key, value) {
    // 递归进行观测数据 不管有多少层 都进行defineProperty
    observe(value);
    Object.defineProperty(obj, key, {
        get() {
            // 闭包 此value 会像上一层的value进行查找
            console.log('获取值',value);
            return value;
        },
        set(newValue) {
            if (value === newValue) return;
            console.log('设置值',newValue);

            observe(newValue);
            value = newValue;
        }
    })
}

export function observe(value) {

    // 1.如果value不是对象，就不用观测了 监测了也不必再监测
    if (!isObject(value) || value.__ob__) return;
    // 需要对对象进行观测(最外层必须是一个{} 不能是数组)

    // 如果一个数据已经备观测过就不必再观测 用类来实现 观察过就增加一个标识 说明观测过了 在观测的时候 可以
    // 先检测是否观测过 如果观测过就跳过检测

    return new Observe(value);
}