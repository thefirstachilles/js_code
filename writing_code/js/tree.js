const tree = {
    val:3,
    left:{
        val:5,
        left:{
            val:8,
            left:null,
            right:{
                val:9,
                left:null,
                right:null
            }
        },
        right:{
            val:7,
            left:{
                val:4,
                left:null,
                right:null
            },
            right:null
        }

    },
    right:{
        val:0,
        left:null,
        right:null
    }

}
//前序
const pre_order = function(node){
    if(node){
        console.log(node.val)
        pre_order(node.left)
        pre_order(node.right)
    }
}
// pre_order(tree)


//中序
const in_order = function(node){
    if(node){
        in_order(node.left)
        console.log(node.val)
        in_order(node.right)
    }
}
// in_order(tree)

//后序
const back_order = function(node){
    if(node){
        back_order(node.left)
        back_order(node.right)
        console.log(node.val)
    }
}
// back_order(tree)

//层序
const level_order = function(root){
    let res = []
    let queue = [root]
    while(queue.length){
        let temp_res = []
        let len = queue.length
        for(let i = 0; i < len; i++){
            let node = queue.shift()
            temp_res.push(node.val)
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        } 
        res.push(temp_res)
    }
}
// level_order(tree)

//二叉树深度
const maxDepth = function (node){
    if(node){
        return Math.max(maxDepth(node.left), maxDepth(node.right))+1
    }
    return -1
}
let res = maxDepth(tree)+1
res