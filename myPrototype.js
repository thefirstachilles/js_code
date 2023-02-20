//手写call
Function.prototype.myCall=function myCall(...args){
    if(typeof this!=="function"){
        throw new Error("must call with a function")
    }
    const realObj= args[0]||window
    const realArgs=args.slice(1)
    const funcSymbol=Symbol('fun')
    realObj[funcSymbol]=this
    const res=realObj[funcSymbol](...realArgs)
    delete realObj[funcSymbol]
    return res

}
//手写apply
Function.prototype.myApply=function myCall(...args){
    if(typeof this!=="function"){
        throw new Error("must call with a function")
    }
    const realObj= args[0]||window
    const realArgs=args[1]
    const funcSymbol=Symbol('fun')
    realObj[funcSymbol]=this
    const res=realObj[funcSymbol](...realArgs)
    delete realObj[funcSymbol]
    return res

}
//手写bind
Function.prototype.myCall=function myCall(...args){
    if(typeof this!=="function"){
        throw new Error("must call with a function")
    }
    const realObj= args[0]||window
    const realArgs=args.slice(1)
    const func=this
    return function (...args2){
        return func.myApply(realObj,[...realArgs,...args2])
    }

}
//手写new
function Person(name){
 this.name=name
 this.listen=function(){
    console.log(`听到了我的${name}`)
 }
 return console.log("successful")
}
Person.prototype.say=function(){
    console.log(`你好我叫${this.name}`)
}
function myNew(fn,...args){
const obj={}
obj.__proto__=fn.prototype
res=fn.call(obj,...args)
if(res) return res
else return obj
}
let myPerson= myNew(Person,"zhouzhou")
// console.log("myPerson")
myPerson.say()
myPerson.listen()

//手写继承
