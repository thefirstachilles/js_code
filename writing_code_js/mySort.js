//排序
//快速排序
const quicksort=(nums)=>{
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
            // console.log(nums)
        }
        nums[j]=start
       let left=help(nums.slice(0,j))
    //    console.log("left",left)
       let right=help(nums.slice(j+1))
    //    console.log("right",right)
       return left.concat(start,right)
    }
    res=help(nums)
    console.log(res)

}
quicksort([4,8,2,7,2,6,3])

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