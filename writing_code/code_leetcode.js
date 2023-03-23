/*排列组合 */
const combination=(num)=>{
    let stack=[]
    const bt=(index)=>{
        if(index>=num){console.log(stack);return}
        for(let i=index;i<num;i++){
            stack.push(i)
            bt(i+1)
            stack.pop()
        }
    }
    bt(0)
}
// combination(15)

/*顺序组合*/

/*树 */
/*广度优先遍历 */
// Input: root = [3,9,20,null,null,15,7]
// Output: [[3],[20,9],[15,7]]

 function TreeNode(val, left, right) {
         this.val = (val===undefined ? 0 : val)
         this.left = (left===undefined ? null : left)
         this.right = (right===undefined ? null : right)
     }
testTree =  {val:3,
             left:{
                val:9,
                left:null,
                right:null
             },
            right:{
                val:20,
                left:{
                    val:15,
                    left:null,
                    right:null
                },
                right:{
                    val:7,
                    left:null,
                    right:null
                }
            }}
const zigzagLevelOrder=(root)=>{
    let res=[]
    const bfs=(stack,order)=>{
        if(stack.length==0) return
        let next_row=[]
        if(order%2===1){stack.reverse()}
        while(stack.length>0){
            let node=stack.shift()
            node&&res.push(node.val)
            node.left&&next_row.push(node.left)
            node.right&&next_row.push(node.right)
        }
        bfs(next_row,order+1)
    }
    bfs(root,0)
    console.log(res)
    
}
zigzagLevelOrder([testTree])

/*排序*/
//快速排序

//堆排序

/*
用map统计频率
示例 1:
输入: s = "anagram", t = "nagaram"
输出: true
示例 2:
输入: s = "rat", t = "car"
输出: false
 */
const freqWord=(str,fn,map)=>{
    for(let i of str){
        if(map.has(i)){
            let num = map.get(i)
            map.set(i,fn(num))
        }else{
            map.set(i,1)
        }
    }
    return map
}
const compWord=(s,t)=>{
    let map=new Map()
    let res=true
    freqWord(s,(num)=>++num,map)
    freqWord(t,(num)=>--num,map)
    map.forEach((value,key)=>{
        if(value!=0) res=false
    })
    return res
}
console.log(compWord('hppolio','pholio'))

/*链表题 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/*几个数之和*/
/*两数之和*/
// 示例 1：

// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
// 示例 2：

// 输入：nums = [3,2,4], target = 6
// 输出：[1,2]
// 示例 3：

// 输入：nums = [3,3], target = 6
// 输出：[0,1]

const twoSum=(nums,target)=>{
    let res=[]
    let numMap = new Map()
    for(let i=0;i<nums.length;i++){
        if(numMap.has(nums[i])) res.push([numMap.get(nums[i]),i])
        numMap.set(target-nums[i],i)
    }
    console.log(res)

}
twoSum([2,7,11,15],9)

/*输入一个正数N，输出所有和为N的连续正数序列
例如：输入15
结果：[[1,2,3,4,5],[4,5,6],[7,8]]*/

//暴力拆解
const addSerias1=(num)=>{
    let res=[]
    for(let i=1;i<num+1;i++){
        let sum=i
        let stack=[i]
        for(let j=i+1;j<num+2;j++){
            if(sum===num){res.push(stack);break}
            sum+=j
            stack.push(j)
        }
    }
    console.log(res)
    return res
}
addSerias1(15)
// 数学求和公式
const addSerias2=(num)=>{
    let res=[]
    for(let i=1;2*num/i-i>=1;i++){
        let start=(2*num/i-i+1)/2
        Number.isInteger(start) && res.push(new Array(i).fill(start).map((item,index)=>item+index))
    }
    console.log(res)
}
addSerias2(15)

/*链表*/
 function ListNode(val, next) {
         this.val = (val===undefined ? 0 : val)
         this.next = (next===undefined ? null : next)
     }
// Input: head = [1,2,3,4,5]
// Output: [5,4,3,2,1]
testLink={
    val:1,
    next:{
        val:2,
        next:{
            val:3,
            next:{
                val:4,
                next:{
                    val:5,
                    next:null
                }
            }
        }
    }
}
//解链法
const reverseList11=(head)=>{
    if(!head)return
let pre = null
let cur = head
while(cur){
    let temp = cur.next
    cur.next = pre
    pre=cur
    cur=temp
    
}
console.log(pre)
}
reverseList11(testLink)
//递归法  ??不对劲
const reverseList12=(head)=>{
    if(!head || !head.next) return head
    let next = head.next
    // 递归反转
    let reverseHead = reverseList12(next)
    // 变更指针
    reverseHead.next = head
    head.next = null
    return reverseHead
}
console.log(reverseList12(testLink))