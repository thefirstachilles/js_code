// 怎么算不出来？
let num=[1,3,[2,[5,6],4],[3],7,9,[]]
const flatten=(num,prevArr)=>{
    return num.reduce((prev,cur)=>{
        if(Array.isArray(cur)){
            return flatten(cur,prev)
        }else{
            return prev.concat(cur)
        }
    },prevArr)
}
console.log(flatten(num,[]))
