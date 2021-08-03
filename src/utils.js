//判断是否是函数
export function isFunction(val) {
    return typeof val === 'function';
}

//判断是否是对象
export function isObject(val) {
    return typeof val === 'object' && val !== null;
}

//判断是否是数组
export function isArray(val) {
    return Array.isArray(val);
}