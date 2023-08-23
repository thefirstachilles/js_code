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
  myPromise.all = function(promiseList){
     return new myPromise(function(resolve, reject) {
      var count = 0;
      var result = [];
      var length = promiseList.length;
      if(length === 0) {
        return resolve(result);
      }
      promiseList.forEach(function(promise, index) {
        myPromise.resolve(promise).then(function(value){
          count++;
          result[index] = value;
          if(count === length) {
            resolve(result);
          }
        }, function(reason){
          reject(reason);
        });
      });
    });
  
  
  }

  //手写promise方法
  const request1 = function() {
    const promise = new myPromise((resolve) => {
      setTimeout(()=>{console.log('a');resolve('a')}, 2000)
    });
  
    return promise;
  }
  
  const request2 = function() {
    const promise = new myPromise((resolve) => {
      setTimeout(()=>{console.log('b');resolve('c')}, 2000)
    });
    return promise;
  }
  
  const request3 = function() {
    const promise = new myPromise((resolve) => {
      setTimeout(()=>{console.log('b');resolve('c')}, 300000)
    });
    return promise;
  }
  // Promise.all([request1(),request2(),request3()])
  myPromise.all([request1(),request2(),request3()])