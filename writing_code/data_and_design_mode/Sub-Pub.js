class PubSub{
  constructor(){
    this.message = {}
    this.listener = {}
  }
  publish(type, content){
    if(!this.message[type]){
      this.message[type] = []
    }
    this.message[type].push(content)
  }
  subscribe(type, cb){
    if(!this.listener[type]){
      this.listener[type] = []
    }
    this.listener[type].push(cb)
  }
  notify(type){
    let listen_arr = this.listener[type]
    let message_arr = this.message[type]
    listen_arr.forEach((element, index) => {
      element(message_arr[index])
    });

  }

}
class Publisher{
  constructor(name, context) {
    this.name = name
    this.context = context
  }
  publish(type, content){
    this.context.publish(type, content)
  }
}
class Subscriber {
  constructor(name, context) {
    this.name = name
    this.context = context
  }
  subscribe(type, cb) {
    this.context.subscribe(type, cb)
  }
}
const TYPE_A = 'music';
const TYPE_B = 'movie';
const TYPE_C = 'novel';

const pubsub = new PubSub();

const publisherA = new Publisher('publisherA', pubsub);
publisherA.publish(TYPE_A, 'we are young');
publisherA.publish(TYPE_A, 'the silicon valley');
const publisherB = new Publisher('publisherB', pubsub);
publisherB.publish(TYPE_B, 'stronger');
const publisherC = new Publisher('publisherC', pubsub);
publisherC.publish(TYPE_C, 'a brief history of time');

const subscriberA = new Subscriber('subscriberA', pubsub);
subscriberA.subscribe(TYPE_A, res => {
  console.log('subscriberA received', res)
});
const subscriberB = new Subscriber('subscriberB', pubsub);
subscriberB.subscribe(TYPE_B, res => {
  console.log('subscriberB received', res)
});
const subscriberC = new Subscriber('subscriberC', pubsub);
subscriberC.subscribe(TYPE_C, res => {
  console.log('subscriberC received', res)
});

pubsub.notify(TYPE_A);
pubsub.notify(TYPE_B);
pubsub.notify(TYPE_C);
