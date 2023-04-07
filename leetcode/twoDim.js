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