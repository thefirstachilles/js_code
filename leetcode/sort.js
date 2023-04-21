/*排序*/
//快速排序
order_num=[6,3,5,9,5,9,2,3,5,8,7,6]
const handler = (nums, start, end) =>{
    let base_number = nums[start]
    let left = start
    let right = end
    while(left < right){
        while(left < right && nums[right]>= base_number){
            right --
        }
        nums[left] = nums[right] 

        while(left < right && nums[left]<= base_number){
            left ++
        }
        nums[right] = nums[left] 
    }
    nums[left] = base_number 
    return left


}
const QuickSort =(nums)=>{

   const dp = (nums, start=0, end = nums.length-1) =>{
    if(start >= end) return
   let outputNum = handler(nums, start ,end)
   dp(nums, start, outputNum-1)
   dp(nums, outputNum+1, end)

   }
   dp(nums)
}
// QuickSort(order_num)



//堆排序
let heapify = (nums, i, size) =>{
    while(true){
        let max_index = i
        if(2*i+1<=size && nums[2*i+1]>nums[i] && nums[2*i+1]>nums[2*i]  ){
            max_index = 2 *i+1
        }
        if(2*i+1<=size && nums[2*i]>nums[i] && nums[2*i]>nums[2*i+1]  ){
            max_index = 2 *i
        }
        if(2*i<=size&&2*i+1>size && nums[2*i]>nums[i] ){
            max_index = 2 *i
        }
        if(i===max_index){break}
        let temp = nums[i]
        nums[i] = nums[max_index]
        nums[max_index] = temp
        i = max_index
       
    }
   
}
let buildHeap = (nums) =>{
    let len = nums.length-1
    for(let i = Math.floor(len/2); i >0; i--){
        heapify(nums, i, len)
    }
}
let heapSort = (nums) =>{ 
    nums.unshift(undefined)
    buildHeap(nums)
    num_len =  nums.length -1
    for(let i = num_len; i>1; i-- ){
        let temp = nums[1]
        nums[1] = nums[i]
        nums[i] = temp
        heapify(nums, 1, i-1)
    }
}

// 测试
var items = [1, 2, 3, 4, 5, 6, 7, 8, 9]
heapSort(items)
// [empty, 1, 2, 3, 4, 5, 6, 7, 8, 9]


//堆排序的衍生问题=》中位数问题和最高频率 https://github.com/sisterAn/JavaScript-Algorithms/issues/60
//