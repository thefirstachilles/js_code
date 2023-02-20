const myInstanceof=(myObj,myClass)=>{
    if(!myObj||!myClass||!myObj.__proto__||!myClass.prototype) return false
    let current=myObj
    while(current.__proto__){
        if(current.__proto__===myClass.prototype) return true
        current=current.__proto__
    }
    return false
}
let a=new Number(3)
console.log(myInstanceof(a,String))