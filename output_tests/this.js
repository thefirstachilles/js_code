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

var id = 'Global';

function fun1() {
    console.log(this)
    // setTimeout中使用普通函数
    setTimeout(function(){
        console.log(this.id);
    }, 2000);
}

function fun2() {
    console.log(this)
    // setTimeout中使用箭头函数
    setTimeout(() => {
        console.log(this.id);
    }, 2000)
}

fun1.call({id: 'Obj'});     // 'Global'

fun2.call({id: 'Obj'});     // 'Obj'
