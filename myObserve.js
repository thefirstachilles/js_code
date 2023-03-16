// 被观察者
class Subject {
    name: string; //实例上定义一个name属性
    state: string;
    observers: any[];
    constructor(name:string) {
      this.name = name;
      this.observers = [];
      this.state = "";
    }
    attach(o) {
      //传入观察者
      this.observers.push(o);
    }
    setState(newState) {
      this.state = newState;
      this.observers.forEach((o) => o.update(this));
    }
  }
  // 观察者
  class Observer {
    name: string;
    constructor(name) {
      this.name = name;
    }
    update(interviewee) {
      console.log(`${interviewee.name} say to: ${this.name} ZOE的${interviewee.state}`);
    }
  }
  let hr = new Subject("HR");
  let observer1 = new Observer("内推者");
  let observer2 = new Observer("面试者");
  hr.attach(observer1);
  hr.attach(observer2);
  hr.setState("面试通过了");
  // baby.setState("面试没通过");
  