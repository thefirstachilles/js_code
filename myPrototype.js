function Person(name){
    this.name=name
    this.listen=function(){
       console.log(`听到了我的${this.name}`)
    }
    return console.log("successful")
   }
   Person.prototype.say=function(age=1,sex){
       console.log(`你好我叫${this.name},${age},${sex}`)
   }

let person_z={
    name:'zhouzhou'
}

//手写call
Function.prototype.myCall=function myCall(...args){
    if(typeof this!=="function"){
        throw new Error("must call with a function")
    }
    let target = args[0]||whindow
    let fun_name=Symbol('fun')
    target[fun_name] = this
    let newargs = args.slice(1)
    let res=target[fun_name](...newargs)
  
    return res

}

console.log('*********myCall function*******')
let person1=new Person('zhangsan')
person1.listen.myCall(person_z)

//手写apply
Function.prototype.myApply=function myApply(...args){
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
console.log('*********myApply function*******')
let person2=new Person('zhangsan')
person2.say.myApply(person_z,[12,'male'])

// //手写bind
Function.prototype.myBind=function myBind(...args){
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
console.log('*********myBind function*******')
let person3=new Person('zhangsan')
let method=person3.say.myBind(person_z,[12,'male'])
method()
// //手写new

// function myNew(fn,...args){
// const obj={}
// obj.__proto__=fn.prototype
// res=fn.call(obj,...args)
// if(res) return res
// else return obj
// }
// let myPerson= myNew(Person,"zhouzhou")
// // console.log("myPerson")
// myPerson.say()
// myPerson.listen()

// //手写继承
