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
    let target = args[0]||window
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
method('a')


//new 
function myNew(fn,...args){
    if(typeof fn !== 'function') return
    let obj={}
    res = fn.myApply(obj, args)
    obj.__proto__=fn.prototype
    return obj

}
let people1 = myNew(Person, 'sun')
people1.say(undefined,'female')

//继承
//组合继承与寄生组合继承
function Child(name,parent){
    Person.call(this,name)
    this.parent = parent || 'Chiang';
  }
  Child.prototype=new Person()
  Child.prototype.constructor = Child
let child1 = new Child('chiangsun','sun')
child1.say('male')

//寄生组合继承
function Parent(name,child){
    Person.call(this,name)
    this.child = child || 'Chiang';
}
Parent.prototype = Object.create(Person.prototype, {
    constructor: {
      value: Parent
    }
  })
  let parent1 = new Parent('sun', 'chiangsun')
  parent1.say('male')



