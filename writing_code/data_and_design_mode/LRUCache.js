/**
 * @param {number} capacity
 */
const Node = function(key,value){
    this.key = key
    this.value = value
}
const LRU_node = function(pre_node,next_node){
    this.prev = pre_node || null
    this.next = next_node || null
}
const LRUCache = function (capacity){
    this.capacity = capacity
    this.map = new Map()
    this.head = new LRU_node()
    this.tail = new LRU_node(this.head,)
    this.head.next = this.tail
}
/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key,value){
    let node = new Node(key,value)
}
/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key){
    if(this.map.has(key)){

    }
}
const myLRUCache = new LRUCache(5)