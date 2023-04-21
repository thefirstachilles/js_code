   /* 用Promise实现图片的异步加载*/
   const imageAsync=(url)=>{
    return new Promise((resolve,reject)=>{
        let new_image = new Image()
        new_image.src = url
        new_image.onload=()=>{
            resolve(new_image)
        }
        new_image.onerror=(err)=>{
            reject(err)
        }
    })

}
//    imageAsync('a').then(()=>{},(err)=>{console.log(err)})