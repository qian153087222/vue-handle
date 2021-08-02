export function initState(vm){
    const ops = vm.$options;
    if(ops.data){
        initData(vm);
    }
}

function initData(vm){
    console.log('初始化数据')
}