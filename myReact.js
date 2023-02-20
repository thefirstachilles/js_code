class myReact{

}

function createElement(type,props,...children){
    return {
        type,
        props:[
            children:children.map(child=>typeof child==="object"?child:createTextElement(child))
        ]
    }
}
function createTextElement(text){
    return {
        type:"Text_Element",
        promps:{
            nodeValue:text,
            children:[],
        }
    }
}
function render(element,container){
    wipRoot={
        dom:container,
        props:{
            children:[element]
        },


    }
    deletions=[]
    rootFiber={
        dom:container,
        props:{
            children:[element],
        }
        alternate:currentRoot
    }
    nextUnitOfWork=rootFiber

    const dom="TEXT_ELEMENT"?document.createTextElement(""):document.createElement(element.type) 
    const isProperty=key=>key!=="children"
    Object.keys(element.props).filter(isProperty).forEach(name=>dom[name]=element.props[name])
    element.props.children.forEach(child=>render(child,dom))
    container.appendChild(dom)
   
}

let nextUnitOfWork=null
function workLoop(deadline){
    let canWork=false
    while(nextUnitOfWork && !canWork){
        nextUnitOfWork=performUnitOfWork(nextUnitOfWork)

        canWork=deadline.timeRemaing()<1
    }
    if(!nextUnitOfWork && rootFiber){
        commitRoot()
    }

    requestIdleCallback(workLoop)
}
function commitRoot(rootFiber){
    deletions.forEach(commitWork)
    commitWork(rootFiber.child)
    currentRoot=rootFiber
    rootFiber=null
    

}

function commitWork(fiber){
if(!fiber){
    return
}
const domParent=fiber.parent.dom
if(fiber.effectTag==="PLACEMENT" &&fiber.dom!=null){
    domParent.appendChild(fiber.dom)
}else if(fiber.effectTag==="DELETION"){
    domParent.removeChild(fiber.dom)
}
commitWork(fiber.child)
commitWork(fiber.sibling)
}

function performUnitOfWork(fiber){
    if(!fiber.dom){
        fiber.dom=createDom(fiber)
    }
   
    const elements=fiber.props.children
    
    if(fiber.child){
        return fiber.child
    }
    let nextFiber=fiber
    while(nextFiber){
        if(nextFiber.sibling){
            return nextFiber.sibling
        }
        nextFiber=nextFiber.parent
    }
}

function updateDom(dom, prevProps, nextProps) {
    //删除旧的或者改变的节点
    Object.keys(prevProps)
      .filter(isEvent)
      .filter(
        key =>
          !(key in nextProps) ||
          isNew(prevProps, nextProps)(key)
      )
      .forEach(name => {
        const eventType = name
          .toLowerCase()
          .substring(2)
        dom.removeEventListener(
          eventType,
          prevProps[name]
        )
      })
  ​
    // 删除旧的属性
    Object.keys(prevProps)
      .filter(isProperty)
      .filter(isGone(prevProps, nextProps))
      .forEach(name => {
        dom[name] = ""
      })
  ​
    // 添加新的属性或者修改的属性
    Object.keys(nextProps)
      .filter(isProperty)
      .filter(isNew(prevProps, nextProps))
      .forEach(name => {
        dom[name] = nextProps[name]
      })
  ​
    // 添加新的事件
    Object.keys(nextProps)
      .filter(isEvent)
      .filter(isNew(prevProps, nextProps))
      .forEach(name => {
        const eventType = name
          .toLowerCase()
          .substring(2)
        dom.addEventListener(
          eventType,
          nextProps[name]
        )
      })
  }

function reconcileChildren(fiber,elements){
    let index=0
    let prevSibing=null
    while(index<elements.length){
        const element=elements[index]
        let newFiber=null
        if(sameType){ 
            newFiber={
            type:oldFiber.type
            props:element.props
            dom:oldFiber.dom
            parent:wipFiber
            alternate:oldFiber
            effectTag:"UPDATE"
        }
    }
    if(element && !sameType){
        newFiber={
            type:element.type,
            props:element.props,
            dom:null
            parent:wipFiber
            alternate:null
            effectTag:"PLACEMENT"

        }

    }
    if(oldFiber && !sameType){
        oldFiber.effectTag="DELETION"
        deletions.push(oldFiber)
    }
    if(oldFiber){
        oldFiber=oldFiber.sibling
    }

        if(index===0){
            fiber.child=newFiber
        }else{
            prevSibing.sibling=newFiber
        }
        prevSibing=newFiber
        index++
    }
}