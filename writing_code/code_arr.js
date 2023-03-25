/*数组拍平*/
//reduce法
let nums=[1,3,[2,[5,6],4],[3],7,6,[]]
const flatten=(res,nums)=>{
    return nums.reduce((pre,item)=>{
        if(typeof item == 'object'){
            return flatten(pre,item)
        }else{
            return pre.concat(item)
        }
    },res)
}
console.log(flatten([],nums))
/*ES6方法*/
function flatten1(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
console.log(flatten1(nums));
//toString+Split
console.log(nums.toString().split(','))
//ES6接口
console.log(nums.flat(Infinity))
/*实现数组去重*/
//ES6
let arr_repeat=[1,3,2,5,6,4,3,7,6]
console.log(Array.from(new Set(arr_repeat)))
//map方法

/*实现数组filter*/

/*类数组转化为数组*/
let like_arr={0: 1, 1: 2, 2: 3, length:3}
console.log(Array.prototype.slice.call(like_arr))
console.log(Array.from(like_arr))
//扩展运算符必须有iterator接口才能用