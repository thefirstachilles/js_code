const LRUCache = function(capacity){
    this.capacity = capacity
    this.cacheQueue = new Map()
}
LRUCache.prototype.get = function(key){
    if(this.cacheQueue.has(key)){
        const result = this.cacheQueue.get(key)
        this.cacheQueue.delete(key)
        this.cacheQueue.set(key,result)
    }
    console.log(this.cacheQueue)
    return -1
}
LRUCache.prototype.put = function(key,value){
    if(this.cacheQueue.size < this.capacity ){
        this.cacheQueue.set(key,value)
    }else{
        this.cacheQueue.set(key,value)
        this.cacheQueue.delete(this.cacheQueue.keys().next().value)
    }
    console.log(this.cacheQueue)
}
const lru = new LRUCache(2)

lru.put(1,1)
lru.put(2,2)
lru.get(1)

lru.put(3, 3)
lru.get(2)
lru.put(4,4)
lru.get(1)
