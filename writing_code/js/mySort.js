//排序
nums = [3,2,1,4,5,2,6,7,8,6,3]
// 冒泡排序
let swap_num = 0
function bubleSort (nums){
    let len = nums.length
    for(let i =0; i< len; i++){
        for(let j=0; j< len -i-1; j++){
            if(nums[j] > nums[j+1]){
                let temp = nums[j]
                nums[j] = nums[j+1]
                nums[j+1] = temp
                swap_num++
            }
        }
    }
    return nums
}
// bubleSort(nums)

// 改良冒泡排序
function bubleSort2 (nums){
    let len = nums.length
    for(let i =0; i< len; i++){
        let swap = false
        for(let j=0; j< len -i-1; j++){
            if(nums[j] > nums[j+1]){
                [nums[j], nums[j+1]] = [nums[j+1], nums[j]]
                swap_num++
            }
            swap = true
        }
        if(!swap){
            break
        }
    
    }
    return nums
}
// bubleSort2(nums)

//选择排序
function selectSort(nums){
    let len = nums.length
    for(let i =0; i<len; i++){
        let minIndex = i
        for(let j = i+1; j<len; j++){
            if(nums[minIndex] > nums[j]){
                minIndex = j
            }
        }
        if(minIndex != i){
            [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]]
            swap_num++
        }
    }
    return nums

}
// selectSort(nums)
//插入排序
function insertSort(nums){
    let len = nums.length
    for(let i = 1; i< len; i++){
        let target = nums[i]
        let j = i
        while(  j>0 && nums[j-1] > target ){
            nums[j] = nums[j-1]
            j--
        }
        nums[j] = target
    }
    return nums
}
// insertSort(nums)

//快速排序
function quicksort1(){
    
}

const quicksort2=(nums)=>{
let res=[]
    const help=(nums)=>{
        // console.log("nums",nums)
        if(nums.length===1||nums.length===0) return nums
        let start = nums[0]
        let i =nums.length-1
        let j=0
        while(i>j){
            // console.log(i,j)
            while(i>j && nums[i]>=start){
                i--
            }
            nums[j]=nums[i]
            while(i>j && nums[j]<=start){
                j++
            }
            nums[i]=nums[j]
        }
        nums[j]=start
       let left=help(nums.slice(0,j))
       let right=help(nums.slice(j+1))
       return left.concat(start,right)
    }
    res=help(nums)
    console.log(res)

}
quicksort2(nums)

//堆排序
const heapSort=(nums)=>{

    buildHeap(nums)
    for(let i=nums.length-1;i>=0;i--){
        let temp = nums[i]
        nums[i] = nums[0]
        nums[0] = temp 
        heapAdjust(nums, 0, i-1);
    }
    console.log(nums)

}
const buildHeap=(nums)=>{
    for(let i=Math.floor(nums.length/2);i>=0;i--){
        heapAdjust(nums,i,nums.length)
    }
}
const heapAdjust=(nums,i,len)=>{
    let child=2*i+1
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
heapSort([4,8,2,7,2,6,3])


