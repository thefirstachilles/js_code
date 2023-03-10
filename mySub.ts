//发布订阅模式 
interface CacheProps{
    [key:string]:Array<(data?:unknown)=>void>
}
class EventHub{
    private cache:CacheProps={}
    on(eventName:string,fn:(data?:unknown)=>void){
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