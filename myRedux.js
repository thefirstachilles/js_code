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

//发布订阅模式 
interface CacheProps{
    [key:string]:Array<(data?:unknown)=>void>
}
class EventHub{
    private cache:CacheProps={}
    on(eventName:String,fn:(data?:unknown)=>void){
        this.cache[eventName]=this.cache[eventName]||[]
        this.cache[eventName].push(fn)
    }
    emit(eventName: string, data?: unknown){
        (this.cache[eventName] || []).forEach((fn: (data?: unknown) => void) => fn(data));
    }
    off(eventName: string, fn: (data?: unknown) => void){
        if (!this.cache[eventName]) return;
        const index = indexOf(this.cache[eventName], fn);
        if (index === -1) return;
        this.cache[eventName].splice(index, 1);
    }
    const indexOf = (array: any[], item: any) => {
        for (let i = 0; i < array.length; i++) {
          if (item === array[i]) {
            return i;
          }
        }
        return -1;
      };
}

//基于发布订阅模式的redux

//redux-thunk

//redux-soga