/*几种异步编程方法：红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？*/
function red() {
    console.log('red',new Date().getSeconds());
}
function green() {
    console.log('green',new Date().getSeconds());
}
function yellow() {
    console.log('yellow',new Date().getSeconds());
}
/*setTimeout+callback*/
const task = (timer, light, callback) => {
        setTimeout(() => {
            if (light === 'red') {
                red()
            }
            else if (light === 'green') {
                green()
            }
            else if (light === 'yellow') {
                yellow()
            }
            callback()
        }, timer)
    }
    const step = () => {
        task(1500, 'red', () => {
            task(1000, 'green', () => {
                task(500, 'yellow', step)
            })
        })
    }
    // step()

    /*promise*/
    const promise1=(light,timer)=>{
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                switch(light){
                    case 'red':
                        red()
                        break
                    case 'yellow':
                        yellow()
                        break
                    case 'green':
                        green()
                        break
                }
                resolve()
            },timer)
        })
    }
   const step2=()=>{promise1('red',3000).then(()=>{promise1('yellow',2000)}).then(()=>{promise1("green",1000)}).then(step2)}
//    step2()
    
   //async await 实现
   const step3=async ()=>{
    await promise1('red',3000)
    await promise1('yellow',2000)
    await promise1('green',1000)
    step3()
   }
//    step3()
