



/*排序*/
//快速排序
order_num=[6,3,5,9,5,9,2,3,5,8,7,6]
const handler = (nums,start,end) =>{
    let base_number=nums[start]
    while(start<end){
       
        while(start<end && nums[end]>=base_number){
            end--
        }
        if(start<end){
        nums[start]=nums[end]
        }
        while(start<end && nums[start]<=base_number){
            start++
        }
        if(start<end){
       nums[end]=nums[start]
        }
    }
    nums[start] = base_number
    return start
   }

const rank = (nums,left,right) => {
    if(left>right) return
    let start = left || 0
    let end = right || nums.length-1
    if(start<end) {
    next = handler(nums,start,end)
    rank(nums, start, next-1)
    rank(nums, next+1, end)
    }
}
rank(order_num)
console.log(order_num)

//堆排序

//堆化
function heapify(nums,i,len) {
    let child = 2*i+1
    while(child<len){
        if(child+1<nums.length && nums[child+1]>nums[child])
        child=child+1
        if(nums[i]<nums[child]){
           let tmp=nums[i]
            nums[i]=nums[child]
            nums[child]=tmp
            i=child
            child=2*i+1
        }else{ break}
    }
}
//建堆
function buildHeap(order_nums) {
    for(let i = Math.floor(order_nums.length/2);i>=0;i--){
        heapify(order_nums, i, order_nums.length)
    }
    // return order_nums
}
let heap_num=[8,3,3,7,4,5,6]
buildHeap(heap_num)
console.log(heap_num)


//堆排序的衍生问题=》中位数问题和最高频率 https://github.com/sisterAn/JavaScript-Algorithms/issues/60
