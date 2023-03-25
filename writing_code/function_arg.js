/*科里化 */
const curry = (fn)=>{
    return (...args)=>{
        if(args.length>=fn.length){
            return fn(...args)
        }else{
            return (...args2)=>{
                fn(...args,...args2)
            }
        }
    }
}
const fun=(a,b,c)=>{console.log([a,b,c])}
const curriedFun=curry(fun)
curriedFun(1,2)(3)

//compose化
const compose = function(){
    // 将接收的参数存到一个数组， args == [multiply, add]
    const args = [].slice.apply(arguments);
    return function(x) {
      return args.reduce((res, cb) => cb(res), x);
    }
  }
  
const add = x => x + 10;
const multiply = x => x * 10;
let calculate = compose(multiply, add);
let res = calculate(10);
console.log(res);    // 结果还是200