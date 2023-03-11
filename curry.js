//curry化
const fun=(a,b,c)=>{console.log([a,b,c])}
const curry=(fn)=>{
    let paramLen=fn.length
    return (...args)=>{
        if(args.length>=paramLen){
            return fn(...args)
        }else return (...args2)=>{
            return fn(...args,...args2)
        }
    }
}
const curriedFun=curry(fun)
curriedFun(1,2)(3)