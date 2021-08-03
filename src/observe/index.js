import { isArray, isObject } from "../utils";
import arrayMethods from "./array";

class Observe {
    constructor(value) {
        if (isArray(value)) {
            value.__proto__ = arrayMethods;
        } else {
            this.walk(value);//核心就是循环对象
        }
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
            return value;
        },
        set(newValue) {
            if (value === newValue) return;
            observe(newValue);
            value = newValue;
        }
    })
}

export function observe(value) {

    // 1.如果value不是对象，就不用观测了
    if (!isObject(value)) return;
    // 需要对对象进行观测(最外层必须是一个{} 不能是数组)

    // 如果一个数据已经备观测过就不必再观测 用类来实现 观察过就增加一个标识 说明观测过了 在观测的时候 可以
    // 先检测是否观测过 如果观测过就跳过检测

    return new Observe(value);
}