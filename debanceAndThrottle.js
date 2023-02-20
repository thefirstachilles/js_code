const debunce=(fn,delay)={
    const timer=null
    return (...args)=>{
        if(timer){
        clearTimeout(timer)
        }
    timer=setTimeout(()=>{
        return fn.call(this,...args)
    },delay)
    }
}

const throttle=(fn,delay)=>{
    const runner=null
    return (...args)=>{
        if(runner){
            
        }else{

        }
    }
}