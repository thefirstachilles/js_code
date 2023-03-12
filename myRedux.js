//观察者模式
class Subject{
   
    constructor(){
        this.observers=[]
    }
     add=(observer)=>{
        this.observers.push(observer)
        this.observers=[...new Set(this.observers)]
    }
     remove=(observer)=>{
        let observers=this.observers
        for(let i=0;i<observers.length;i++){
            if(observers[i]===observer){
                observers.splice(i,1)
            }
        }
    }
     notify=(...args)=>{
        this.observers.forEach(observer=>observer.update(args))
    }
}
class Observer{
    update(...args){
        console.log(...args)
    }

}
let observer_1 = new Observer() // 创建观察者
let observer_2 = new Observer()
let sub = new Subject() // 创建主体
sub.add(observer_1) // 添加观察者
sub.add(observer_2)
sub.notify('send msg')



//基于发布订阅模式的redux

//redux-thunk

//redux-soga