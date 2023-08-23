/*类数组转化为数组*/
let arr_like={0: 1, 1: 2, 2: 3, length:3}
// const arr_like = document.querySelectorAll('div')
function fun(){
    // 扩展运算符
    console.log([...arr_like])
    //prototype
    console.log(Array.prototype.slice.call(arr_like))
    console.log(Array.prototype.concat.apply([],arr_like))
    console.log(Array.apply(null,arr_like))
    // Array.from
    console.log(Array.from(arr_like))

}

/** dom转json */
// const dom = document.getElementById('model')
function dom2json (dom){
    let res = {}
    res.name = dom.tagName
    res.children = []
    dom.childNodes.forEach((element)=>res.children.push(dom2json(element)))
    return res
}
// dom2json(dom)

/** json 转 dom*/
const json = {
    tag: 'div',
    attrs:{
        id:'app',
        className:'root'
    },
    children:[{
        tag:'ul',
        children:[
        {tag:'li', children: ['list1']},
        {tag:'li', children: ['list2']},
        {tag:'li', children: ['list3']},
        {tag:'li', children: ['list4']},
        {tag:'li', children: ['list5']},
        ]}]
}
function json2dom (vnode){
    if(typeof vnode ==='string' || typeof vnode ==='number'){
        return document.createTextNode(String(vnode))
    }else{
        const __dom = document.createElement(vnode.tag)
        if(vnode.attrs){
            Object.entries(vnode.attrs).forEach(([key, value])=>{
                __dom.setAttribute(key, value)
            })
        }
    vnode.children.forEach((element)=>{ __dom.appendChild(json2dom(element))})
    return __dom
    }
}
// json2dom(json)


/*树转数组*/
const tree = [{
    id:1,
    text:'根节点',
    children:[{   
        id: 2,
        text:'一级节点1',
        parentId:1},
        {
        id: 3,
        text:'一级节点2',
        parentId:1,
        children:[{
        id: 4,
        text:'二级节点2-1',
        parentId:3}]
        }
    ]
}]
function tree2list(root){
    let res = []
    const dfs = (node) =>{
        node.forEach((element)=>{
            if(element.children){
                dfs(element.children)
                delete element.children
            }
            res.push(element)
        })
    }

    dfs(root)
    return res

}
tree2list(tree)

/* 数组转树 */
const list = [
    {
      id: 2,
      text: "一级节点1",
      parentId: 1,
    },
    {
      id: 4,
      text: "二级节点2-1",
      parentId: 3,
    },
    {
      id: 3,
      text: "一级节点2",
      parentId: 1,
    },
    {
      id: 1,
      text: "根节点",
    },
  ]
function list2tree(list){
    let deps = {}
    let res = []
    list.forEach((element)=> {
        deps[element.id] = element
    })
    for(let i in deps){
        if(deps[i].hasOwnProperty('parentId')){
            if(!deps[deps[i].parentId].children){
                deps[deps[i].parentId].children = []
            }
            deps[deps[i].parentId].children.push(deps[i])

        }else{
            res.push(deps[i])
        }

    }
    return res
}
// list2tree(list)
/*数组拍平*/
//reduce法
let arr=[1,3,[2,[5,6],4],[3],7,6,[]]
const flatten=(nums)=>{
    return nums.reduce((pre,item)=>{
        if(Array.isArray(item)){
            return [...pre, ...flatten(item)]
        }else{
            return pre.concat(item)
        }
    },[])
}
console.log(flatten(arr))
/*ES6方法*/
function flatten1(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
console.log(flatten1(arr));
//toString+Split
console.log(arr.toString().replace(' ','').split(',').map((item)=>Number(item)))//有问题
//ES6接口
console.log(arr.flat(Infinity))
/*实现对象拍平*/
let obj = {'a.b':1,'b.c':{'c.a':3, 'd.c':4,'e.i':5 }}
function flatObj(obj){
    if(typeof obj !== 'object'){
        return
    }
    let res = {}
    const dfs = (cur, prefix) =>{
        if(typeof cur==='object' && cur!==null ){
            for(let k in cur){
                dfs(cur[k], `${prefix? prefix: ''}${prefix? '.': ''}${k}`)
            }
        }else{
            res[prefix] = cur
        }
       
    }
    dfs(obj)

}
flatObj(obj)

/*实现数组去重*/
//ES6
let arr_repeat=[1,3,2,5,6,4,3,7,6]
console.log(Array.from(new Set(arr_repeat)))
//map方法

//filter方法
console.log(arr_repeat.filter((item,index)=>arr_repeat.indexOf(item) ===index))



