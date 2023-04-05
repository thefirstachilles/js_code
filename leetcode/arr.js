/*数组滑动窗口*/
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.
const lengthOfLongestSubstring = (str) =>{
    let max_lengh = 0
    let save_map = new Map()
    for(let left = 0,right=0; left < str.length,right<str.length; right++){
        if(save_map.has(str[right])){
            left = save_map.get(str[right])+1

        }
        max_lengh = Math.max(max_lengh, right - left+1)
        save_map.set(str[right],right)
    }
    return max_lengh
}
const str = "abcabcbb"
lengthOfLongestSubstring(str)
/*最长公共子序列*/
//memory法
const longestCommonSubsequence=(text1,text2)=>{
    let comp_arr = new Array (text1.length+1).fill(0).map(()=>new Array(text2.length+1).fill(0))
    // console.log("comp_arr",comp_arr[1][0])
    for( let i = 1; i< text1.length+1; i++){
        for(let j =1; j< text2.length+1; j++){
            if(text1[i-1]===text2[j-1]){
                comp_arr[i][j]=comp_arr[i-1][j-1]+1
            }else{
                
                comp_arr[i][j]=Math.max(comp_arr[i-1][j],comp_arr[i][j-1])
            }
        }
    }
    return comp_arr[text1.length][text2.length]
}
console.log(longestCommonSubsequence("1A2C3D4B56","B1D23A456AM"))

/*最长公共子字符串*/
const longestCommonSubstring=(text1,text2)=>{
    let comp_arr = new Array (text1.length+1).fill(0).map(()=>new Array(text2.length+1).fill(0))
    // console.log("comp_arr",comp_arr[1][0])
    for( let i = 1; i< text1.length+1; i++){
        for(let j =1; j< text2.length+1; j++){
            if(text1[i-1]===text2[j-1]){
                comp_arr[i][j]=comp_arr[i-1][j-1]+1
            }else{
                comp_arr[i][j]= comp_arr[i-1][j-1]
            }
        }
    }
    return comp_arr[text1.length][text2.length]
}
console.log(longestCommonSubstring("1A2C3D4B56","B1D23A456AM"))

//单调栈


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


//广度遍历
//迷宫问题
// 输入 1: 迷宫由以下二维数组表示

// 0 0 1 0 0
// 0 0 0 0 0
// 0 0 0 1 0
// 1 1 0 1 1
// 0 0 0 0 0

// 输入 2: 起始位置坐标 (rowStart, colStart) = (0, 4)
// 输入 3: 目的地坐标 (rowDest, colDest) = (4, 4)

// 输出: true

let mazeSearch = function(maze, start, end){
    console.log('maze',maze)
    let maze_res = []
    let dir=[[-1,0],[+1,0],[0,+1],[0,-1]]
    let width = maze[0].length
    let height = maze.length
    let stack=new Array(width).fill('').map((item)=>new Array(height).fill(false))

    
    let dfs = (posX,posY)=>{
        console.log(posX,posY)
        console.log('stack',stack)
        console.log('maze',maze)
        if(posX<0||posX>width||posY<0||posY>height) {return}
        if(posX===end[0]&&posY===end[1]){maze_res.push(stack);return}
        for(let i in dir){
            let curX = posX
            let curY = posY
            // console.log(dir[i])
            curX+=dir[i][0]
            curY+=dir[i][1]
            // console.log(curX,curY)
            if(curX>=0 && curX<width && curY>=0 && curY<height && maze[curX][curY]!==1 && stack[curX][curY]!==true){
                stack[curX][curY]=true
                dfs(curX,curY)
                stack[curX][curY]=false
            }
        }

    }

    let bfs = () =>{

    }
    stack[start[0]][start[1]]=true
    dfs(start[0],start[1])
    console.log('res',maze_res.length)
}
let  maze_matrix = [[0,1,0,0,0,0],
                [0,0,0,1,0,0],
                [0,0,1,0,0,1],
                [1,1,0,0,0,0],
                [1,1,0,0,0,0],
                [1,1,0,0,0,0]]

mazeSearch(maze_matrix,[0,0],[5,5])

/*背包问题*/


/*去重*/
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