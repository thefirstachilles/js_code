/*链表题 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

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

//链表排序