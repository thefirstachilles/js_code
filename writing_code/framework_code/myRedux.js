//基于发布订阅模式的redux
class createStore{
    constructor(reducer, initState){
        this.state = initState          // state记录所有状态
        this.listeners = [];     // 保存所有注册的回调
     
    }

    subscribe(callback) {
      this.listeners.push(callback);       // subscribe就是将回调保存下来
    }
  
    dispatch(action) {
    this.state = reducer(this.state, action);  
    for (let i = 0; i < this.listeners.length; i++) {
        const listener = this.listeners[i];
        listener();
      }
    }
  
    // getState直接返回state
    getState() {
      return this.state;
    }
  
    // store包装一下前面的方法直接返回
  }

//使用
const initState = {milk: 0};
  
function reducer(state, action) {
    switch (action.type) {
      case 'PUT_MILK':
        return {...state, milk: state.milk + action.count};
      case 'TAKE_MILK':
        return {...state, milk: state.milk - action.count};
      default:
        return state;
    }
  }
  
  let store = new createStore(reducer, initState);
  
  // subscribe其实就是订阅store的变化，一旦store发生了变化，传入的回调函数就会被调用
  // 如果是结合页面更新，更新的操作就是在这里执行
  store.subscribe(() => console.log(store.getState()));
  
  // 将action发出去要用dispatch
  store.dispatch({ type: 'PUT_MILK', count:1 });    // milk: 1
  store.dispatch({ type: 'PUT_MILK',count:1 });    // milk: 2
  store.dispatch({ type: 'TAKE_MILK',count:1 });   // milk: 1


//redux-thunk

//redux-soga