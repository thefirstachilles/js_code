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
//深度优先遍历

//前序遍历
let res=[]
const before_fs=(root)=>{
res.push(root?root.val:null)
root&&before_fs(root.left)
root&&before_fs(root.right)
}
before_fs(testTree)
console.log('前序遍历',res.splice(0))
//中序遍历
const middel_fs=(root)=>{
root&&middel_fs(root.left)
res.push(root?root.val:null)
root&&middel_fs(root.right)
}
middel_fs(testTree)
console.log('中序遍历',res.splice(0))
//后序遍历
const behind_fs=(root)=>{
root&&behind_fs(root.left)
root&&behind_fs(root.right)
res.push(root?root.val:null)
}
behind_fs(testTree)
console.log('后序遍历',res.splice(0))
//搜索二叉树
