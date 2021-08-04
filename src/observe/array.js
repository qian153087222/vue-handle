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
    arrayMethods[method] = function (...args) {
        // 数组新增的属性 要看是不是对象，如果是对象 继续劫持
        // 需要调用数组元生逻辑
        let inserted = null, ob = this.__ob__;
        switch (method) {
            case 'splice'://修改 删除 添加 arr.splice(0,0,100,200,300)
                inserted = args.slice(2); //splice方法从第三个参数期 是添加新数据
                break;
            case 'unshift':
            case 'push':
                inserted = args; //调用unshift push 传递参数就是新增逻辑
                break;
        }
        //inserted[] 遍历数组 看一下是否需要进行劫持
        if(inserted) ob.observeArray(inserted);
        //调用原型上的数组方法
        oldArrayProto[method].call(this,...args);
    }
});

export default arrayMethods;
