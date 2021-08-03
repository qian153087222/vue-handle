// import { observe } from "index.js";

const oldArrayProto = Array.prototype; // 获取数组的老的原型方法

const arrayMethods = Object.create(oldArrayProto); // 让arrayMethods通过__proto__ 能获取数组方法

// 只有这七个方法 可以导致数组发生变化
const methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'reverse',
    'splice'
];

methods.forEach(method => {
    arrayMethods[method] = function () {
        console.log('观测了数组')
    }
});

export default arrayMethods;
