// 被观察者
class Subject {
    name: string; 
    state: string;
    observers: any[];
    constructor(name:string) {
      this.name = name;
      this.observers = [];
      this.state = "";
    }
    attach(o:object) {
      //传入观察者
      this.observers.push(o);
    }
    setState(newState:string) {
      this.state = newState;
      this.observers.forEach((o) => o.update(this));
    }
  }
  // 观察者
  class Observer {
    name: string;
    constructor(name:string) {
      this.name = name;
    }
    update(interviewee:any) {
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
  