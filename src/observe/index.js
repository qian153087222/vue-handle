import { isObject } from "../utils";

export function observe(value) {
    // 1.如果value不是对象，就不用观测了
    console.log(isObject(value));
}