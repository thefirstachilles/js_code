let source={
    a:1,
    then:()=>{
        console.log('a')
    },
    [Symbol('name')]:'john',
    'another':{
        m:'world'
    }
}
source.__proto__.b='hi'
const deepCopyObj=(target,source)=>{
    Reflect.ownKeys(source).forEach((ele)=>{
        if(source.hasOwnProperty(ele)){
        if(typeof source[ele]==='object'){
            target[ele] = Array.isArray(source[ele])?[]:{}
            deepCopyObj(target[ele],source[ele])
        }else{
            target[ele]=source[ele]

        }
    }
    })
}
let target={}
deepCopyObj(target,source)
target.a=2
target.another.m='hello'
console.log('target',target,'source',source,target.b,source.b)


