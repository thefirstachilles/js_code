const myInstanceof=(my_var,myClass)=>{
    if(!my_var||my_var.__proto__||!myClass||!myClass.prototype) return false
    let temp_var=my_var
    while(temp_var.__proto__){
        if(temp_var.__proto__=== myClass.prototype ) return true
        temp_var = temp_var.__proto__
    }
    return false
}

console.log(myInstanceof('',String))
console.log(myInstanceof('','"'))
console.log(myInstanceof(null,'"'))
console.log(myInstanceof('"'))

