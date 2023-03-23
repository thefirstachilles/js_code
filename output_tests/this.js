Window = {name:'global'};
var obj = {
    name: 'local',
    foo: function() {
        this.name = 'foo';
    }.bind(Window)
};
var bar = new obj.foo();
setTimeout(function() {
    console.log(Window.name);
}, 0);
console.log(bar.name);

var bar3 = bar2 = bar;
bar2.name = 'foo2';
console.log(bar3.name)


function Person (name) {
         this.name = name;
    }
    Person.prototype.greet = function () {
         console.log('Hi, my name is '+ this.name);
    }
    Person.prototype.greetDelay = function (time) {
         var _this = this;
         setTimeout(function () {
              console.log('Hi, my name is ' + _this.name);
         }, time);
    }
person1=new Person('zhouzhou')
console.log('person1',person1.greetDelay())