//迷宫问题 查看有多少条路径
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
    stack[start[0]][start[1]]=true
    let dfs = (posX,posY)=>{
        if(posX<0||posX>=width||posY<0||posY>=height) {return}
        if(posX===end[0]&&posY===end[1]){
            maze_res.push(JSON.parse(JSON.stringify(stack)));
            return
        }
        for(let i in dir){
            let curX = posX
            let curY = posY
            curX+=dir[i][0]
            curY+=dir[i][1]
            if(curX>=0 && curX<width && curY>=0 && curY<height && maze[curX][curY]!==1 && stack[curX][curY]!==true){
                stack[curX][curY]=true
                dfs(curX,curY)
                stack[curX][curY]=false
            }
        }

    }
    let isSafe = (curX, curY, path) =>{
        let isSafe = true
       if(curX<0 || curX>=width || curY<0 || curY>=height || maze[curX][curY]===1 ){
        isSafe = false
       }
       path.forEach((element) => {
        if(element[0] ===curX && element[1] ===curY )
        isSafe = false
       });
       
       return isSafe
    }
    let arr = [{point:[0,0], path:[[0,0],]}]
    let bfs = () =>{
        while(arr.length>0){
            let cur_node = arr.shift()
            if(cur_node.point[0]===end[0]&&cur_node.point[1]===end[1]){
                maze_res.push(JSON.parse(JSON.stringify(cur_node.path)))
                continue
            }
            for(let i in dir){
                let curX = cur_node.point[0]
                let curY = cur_node.point[1]
                curX+=dir[i][0]
                curY+=dir[i][1]

                if(isSafe(curX, curY,JSON.parse(JSON.stringify(cur_node.path)))){
                   let cur_path =cur_node.path.concat([[curX,curY],])
                   arr.push({point:[curX,curY],path:cur_path})
                }
            }

        }

    }
    bfs()

}
let  maze_matrix = [[0,1,0,0,0,0],
                [0,0,0,1,0,0],
                [0,0,1,0,0,1],
                [1,1,0,0,0,0],
                [1,1,0,0,0,0],
                [1,1,0,0,0,0]]

// mazeSearch(maze_matrix,[0,0],[5,5])


//给定一个包含非负整数的 M x N 迷宫，请找出一条从左上角到右下角的路径，使得路径上的数字总和最小。每次只能向下或者向右移动一步
//[1 3 1， 1 5 1， 4 2 1]
// 7
//背包问题
let value_maze = [[1, 3, 1],
                  [1, 5, 1],
                  [4, 2, 1]]
const value_maze_comp = (maze) =>{
    let width = maze[0].length
    let height = maze.length
    let grip = new Array(width).fill('').map((item)=>new Array(height).fill(Number.MAX_VALUE))
    // let dir = [[1,0], [0,1]]

    for(let i = 0; i<height; i++ ){
        for(let j = 0; j<width; j++){
            if(i === 0 && j ===0 ){
                grip[i][j] = maze[i][j]
            }else if (i ===0){
                grip[i][j] = grip[i][j-1] + maze[i][j] 
            }else if(j === 0){
                grip[i][j] = grip[i-1][j] + maze[i][j] 
            }
            else{
            grip[i][j] = Math.min(grip[i-1][j]+ maze[i][j], grip[i][j-1]+maze[i][j]  )
        }
        }

    }
}
value_maze_comp(value_maze)