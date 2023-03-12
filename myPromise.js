class myPromise{
    constructor(executor){
      this.state = 'pending';
      this.value = undefined;
      this.reason = undefined;
      this.onResolvedCallbacks = [];
      this.onRejectedCallbacks = [];
      let resolve = value => {
        if (this.state === 'pending') {
          this.state = 'fulfilled';
          this.value = value;
          this.onResolvedCallbacks.forEach(fn=>fn());
        }
      };
      let reject = reason => {
        if (this.state === 'pending') {
          this.state = 'rejected';
          this.reason = reason;
          this.onRejectedCallbacks.forEach(fn=>fn());
        }
      };
      try{
        executor(resolve, reject);
      } catch (err) {
        reject(err);
      }
    }
    then(onFulfilled,onRejected) {
      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
      onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
      let myPromise2 = new myPromise((resolve, reject) => {
        if (this.state === 'fulfilled') {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvemyPromise(myPromise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        };
        if (this.state === 'rejected') {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvemyPromise(myPromise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        };
        if (this.state === 'pending') {
          this.onResolvedCallbacks.push(() => {
            setTimeout(() => {
              try {
                let x = onFulfilled(this.value);
                resolvemyPromise(myPromise2, x, resolve, reject);
              } catch (e) {
                reject(e);
              }
            }, 0);
          });
          this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              try {
                let x = onRejected(this.reason);
                resolvemyPromise(myPromise2, x, resolve, reject);
              } catch (e) {
                reject(e);
              }
            }, 0)
          });
        };
      });
      return myPromise2;
    }
    catch(fn){
      return this.then(null,fn);
    }
  }
  function resolvemyPromise(myPromise2, x, resolve, reject){
    if(x === myPromise2){
      return reject(new TypeError('Chaining cycle detected for myPromise'));
    }
    let called;
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        let then = x.then;
        if (typeof then === 'function') { 
          then.call(x, y => {
            if(called)return;
            called = true;
            resolvemyPromise(myPromise2, y, resolve, reject);
          }, err => {
            if(called)return;
            called = true;
            reject(err);
          })
        } else {
          resolve(x);
        }
      } catch (e) {
        if(called)return;
        called = true;
        reject(e); 
      }
    } else {
      resolve(x);
    }
  }
  //resolve方法
  myPromise.resolve = function(val){
    return new myPromise((resolve,reject)=>{
      resolve(val)
    });
  }
  //reject方法
  myPromise.reject = function(val){
    return new myPromise((resolve,reject)=>{
      reject(val)
    });
  }
  //race方法 
  myPromise.race = function(myPromises){
    return new myPromise((resolve,reject)=>{
      for(let i=0;i<myPromises.length;i++){
        MyPromise.resolve(myPromises[i]).then(res => {
          resolve(res)  //某一promise完成后直接返回其值
        }).catch(e => {
          reject(e)  //如果有错误则直接结束循环，并返回错误
        })
      }
    })
  }
  //all方法(获取所有的myPromise，都执行then，把结果放到数组，一起返回)
  myPromise.all = function(myPromises){
    let resPromise = new MyPromise((resolve,reject)=>{
      let length=myPromises.length
      let result = []
      if (length ===0 ){
        return resolve(res)
      }
      myPromises.forEach((promise,index)=>{
          MyPromise.resolve(promise).then((val)=>{
            count++
            result[index]=val
            if(count===length){
              resolve(result)
            }
          },(reason)=>{reject(reason)})
      })
    })
    // let arr = [];
    // let i = 0;
    // function processData(index,data){
    //   arr[index] = data;
    //   i++;
    //   if(i == myPromises.length){
    //     resolve(arr);
    //   };
    // };
    // return new myPromise((resolve,reject)=>{
    //   for(let i=0;i<myPromises.length;i++){
    //     myPromises[i].then(data=>{
    //       processData(i,data);
    //     },reject);
    //   };
    // });
  }

  //手写promise方法
 const promise1=()=>{
  const promise= new myPromise((resolve)=>{
    console.log('a')
    resolve('a')})

return promise
}
  promise1().then((data)=>{console.log(data)})
  // console.log(promise1().state)