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
QuickSort(order_num)



//堆排序

function heapSort(items) {
    // 构建大顶堆
    buildHeap(items, items.length-1)
    // 设置堆的初始有效序列长度为 items.length - 1
    let heapSize = items.length - 1
    for (var i = items.length - 1; i > 1; i--) {
        // 交换堆顶元素与最后一个有效子元素
        swap(items, 1, i);
        // 有效序列长度减 1
        heapSize --;
        // 堆化有效序列(有效序列长度为 currentHeapSize，抛除了最后一个元素)
        heapify(items, heapSize, 1);
    }
    return items;
}

// 原地建堆
// items: 原始序列
// heapSize: 有效序列长度
function buildHeap(items, heapSize) {
    // 从最后一个非叶子节点开始，自上而下式堆化
    for (let i = Math.floor(heapSize/2); i >= 1; --i) {    
        heapify(items, heapSize, i);  
    }
}
function heapify(items, heapSize, i) {
    // 自上而下式堆化
    while (true) {
        var maxIndex = i;
        if(2*i <= heapSize && items[i] < items[i*2] ) {
            maxIndex = i*2;
        }
        if(2*i+1 <= heapSize && items[maxIndex] < items[i*2+1] ) {
            maxIndex = i*2+1;
        }
        if (maxIndex === i) break;
        swap(items, i, maxIndex); // 交换 
        i = maxIndex; 
    }
}  
function swap(items, i, j) {
    let temp = items[i]
    items[i] = items[j]
    items[j] = temp
}

// 测试
var items = [,1, 9, 2, 8, 3, 7, 4, 6, 5]
heapSort(items)
// [empty, 1, 2, 3, 4, 5, 6, 7, 8, 9]


//堆排序的衍生问题=》中位数问题和最高频率 https://github.com/sisterAn/JavaScript-Algorithms/issues/60
//