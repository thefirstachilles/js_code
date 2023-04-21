# 网络
https://juejin.cn/post/6908327746473033741
1. GET和POST的请求的区别 （6点）
2. POST和PUT请求的区别 （2点） （？）
3. 常见的HTTP请求头和响应头 （9 5 4）（？） 
4. HTTP状态码（16）
5. HTTP请求方法（8）（？）
6. Options (3 2)
7. HTTP 1.0 与 HTTP 1.1(5) HTTP 2.0 HTTPS（5）
8. HTTP和HTTPS协议的区别 (4)
9. 当在浏览器中输入 Google.com 并且按下回车之后发生了什么？(9)
10. 对keep-alive的理解
11. HTTP请求报文的是什么样的？(4)
12. HTTP协议的优点和缺点(5 3)
13. URL有哪些组成部分(7)
14. 与缓存相关的HTTP请求头有哪些 (2 2)
15. 什么是HTTPS协议？TLS/SSL的工作原理(3)  数字证书是什么？
16. HTTP状态码304是多好还是少好
- TCP三次握手和四次挥手 [参考资料](https://hit-alibaba.github.io/interview/basic/network/TCP.html)
    - 三次握手
        - SYN 初始随机序列x 发送完进入SYN_SEND状态
        - SYN和ACK包 随机序列y acknum=x+1 进入SYN_RCVD状态 
        - 发送ACK确认包 acknum = y+1 进入ESTABLISHED状态 服务器接收到后也Established
        - SYN攻击 半连接 ddos攻击 
    - 四次挥手
        - 客户端发送FIN 初始随机序列x 客户端发送完进入FIN_WAIT_1状态
        - ACK包 acknum = x+1 服务端进入CLOSE_WAIT 客户端进入FIN_WAIT_2
        - 服务端发送FIN 随机序列y 准备好关闭连接 进入LAST_ACK状态
        - ACK包 acknum = y+1 客户端进入TIME_WAIT 等待可能出现的要求重传的包 服务端收到后进入CLOSED状态 酷护短等待2MSL后没响应后也关闭连接进入closed
    - HTTPs
        - 客户端请求（协议版本号，随机数，客户端支持加密方法）
        - 服务器收到返回（确认加密方法、证书、服务器生成随机数）
        - 客户端确认服务器证书，生成第三个随机数，用公钥加密第三个，发送给服务器，提供前面所有内容的hash值给服务器检验
        - 服务器使用私钥，解密客户端发送随机数，提供前面所有内容hash值给客户端
        - 客户端和服务器端根据约定加密方法生成对话密钥
18. HTTP状态码304是多好还是少好 (1)
20. 对keep-alive的理解？ Keep-Alive的建立过程（4）服务端自动断开过程（也就是没有keep-alive）（4） 客户端请求断开连接过程 （4） 开启Keep-Alive的优点 （5）
21. 子网掩码、mac地址、网关 https://www.zhihu.com/question/56895036

# CSS
[参考](https://juejin.cn/post/6905539198107942919)
-  CSS选择器及其优先级 
    - 内联 > id > 类、伪类、属性 > 标签、伪元素
    - ～是前 +是后
- CSS中可继承与不可继承属性有哪些 
    - 不可继承的：display 、 盒子模型属性、 定位属性
    - 可继承：字体font、line-height
- display的属性值及其作用 
    - none、 inline、 block、inline-block、list-item、table、inherit
- position
    - absolute（相对于static以外的一个父元素定位）｜ relative（相对原位置定位）｜ fixed （相对屏幕视口定位）｜static（默认 无定位）｜inherit
- 隐藏元素的方法有哪些 
    - visiable ｜ display：none ｜ opacity：0  | trans
- 水平居中方法
    - text-align｜absolute｜flex 
- 两栏布局
    - 浮动+margin｜浮动+overflow｜flex｜绝对定位
- 三栏布局
    - 绝对定位 ｜ flex ｜浮动+margin（中间一栏必须放在最后）｜ 圣杯布局 （父元素paadding预留左右两栏，中间一列在最前，margin负值使其在同一行）｜双飞翼布局（中间栏的margin预留）
- 垂直居中方法
    - 绝对定位 transform：translate（-50%， -50%）｜ 绝对定位（0000 盒子有宽高）｜绝对定位+margin 负值 ｜flex+align和justify 设置center
- flex定位
    - direction 方向｜ wrap 换行｜ justif-content｜ align-items｜
    - grow shrink basis order（排序） 
- 浮动
    - 父元素的高度无法被撑开，影响与父元素同级的元素｜与浮动元素同级的非浮动元素会跟随其后｜若浮动的元素不是第一个元素，则该元素之前的元素也要浮动，否则会影响页面的显示结构
    - 使用clear属性清除浮动
- BFC
    - box formatting context生成块级盒子
    - body float(除none以外) position（absolute，fixed），display（inline-block，flex） overflow（hidden auto scroll）
    - 解决margin和高度塌陷问题以及创造自适应两栏布局
6. 伪元素和伪类的区别和作用？
7. 为什么有时候⽤translate来改变位置⽽不是定位？（2）
8. CSS3中有哪些新特性 （9）

# HTML
[参考资料](https://juejin.cn/post/6905294475539513352)


# 性能优化
https://juejin.cn/post/6941278592215515143
1. CDN的概念 (3)
2. CDN的作用 (4)
3. CDN的原理 (7) DNS的解析域名过程(5 3)
4. 懒加载 懒加载的特点 (3) 懒加载的实现原理 ()
5. 服务器端渲染 https://juejin.cn/post/6844903943902855176

# 打包工具
[webpack 常见面试题参考](https://juejin.cn/post/6844904094281236487)
- import 和 require [参考资料](https://blog.csdn.net/weixin_38633659/article/details/124373875)
- webpack常用loader [参考](https://vue3js.cn/interview/webpack/Loader.html)
    - 样式loader：style.* less.* sass.* css.*
    -  file-*（识别出资源模块，移动到指定输出⽬录，输出目录地址） url-*(图片转化为base64) html-minify-* babel loader



# 浏览器篇
https://juejin.cn/post/6916157109906341902/
- 什么是 XSS 攻击？
    - 跨站脚本攻击
    - 存储型（数据库）、反射型（url）、dom型（dom里的url有恶意代码）， 前2是服务器端拼接，后一种是浏览器漏洞
- 如何防御 XSS 攻击？
    - 纯前端，不使用服务端拼接
    - 白名单
    - 敏感信息保护
- 什么是 CSRF 攻击？
    - 跨站请求伪造攻击，cookie在同源请求中自动发送
    - Get类型（图片链接自动请求） POST类型（表单） a类型（诱导）
    - 预防
        - 进行同源检测｜使用CSRF Token进行验证（随机数拼在请求里）｜对cookie双重验证（把cookie内容放在请求里） ｜ 设置samesite
- 中间人攻击
    - 截获公钥
- 引起安全问题
    - 以上列举｜iframe｜ 
- 进程之前的通信方式 
    - 管道通信｜消息队列通信｜信号量通信｜信号通信｜共享内存通信｜套接字通信
- 如何实现浏览器内多个标签页之间的通信?
    - websocket ｜ shareWorker｜localstorage｜postmessage
- 对Service Worker的理解 
    独立线程 HTTPS 用于缓存 热更新
- 浏览器缓存的全过程 
    - 强制缓存 expires（根据绝对值） >>> cache-control （时间之外其他的值精确到秒）
    - 协商缓存 Etag Last-Modified
    - 缓存过程：发送请求，先看expire和cache-control本地是否过期，命中强制缓存，使用本地缓存资源，没命中就看etag和last-modified，命中的话就分别发送if- none-match和if modified 给服务器判断， 命中协商缓存就返回304，从缓存读数据，没命中就继续请求 
- 对浏览器的理解 （3）
- 浏览器渲染原理：1. 浏览器的渲染过程 （5） 2. 渲染优化 （4 8）
- 浏览器本地存储
    - cookie 使用http-only使得脚本无法获取
    - cookie 、localStorage sessionStorage （3） 
10. 什么是同源策略
11. 浏览器线程与进程 https://juejin.cn/post/6854573217655291918
12. hash标识和history api
- 浏览器进程与线程
    - 进程代表了一个程序，线程是进程里执行一段指令的时间
    - 浏览器主线程｜网络进程｜GPU进程｜渲染进程｜插件进程
    - 渲染进程：GUI渲染线程｜JS引擎线程｜事件触发线程｜定时器触发线程｜异步http请求线程（GUI与JS互斥）
    - dom树 cssom树 构建树 绘制 重绘 回流
    - 一个Tab页中无论什么时候都只有一个JS引擎线程在运行JS程序
    - 时间触发线程属于浏览器而不是JS引擎，用来控制事件循环
    - 因此使用单独线程来计时并触发定时器
    - XMLHttpRequest连接后通过浏览器新开一个线程请求，回调函数在事件队列中

- 进程间通信：

# React
[参考资料一](https://juejin.cn/post/7182382408807743548)
[参考资料二](https://juejin.cn/post/6844903806715559943)
-  React 事件机制
-  React 高阶组件、Render props、hooks 有什么区别，为什么要不断迭代
-  哪些方法会触发 React 重新渲染？重新渲染 render 会做些什么？ 
    - 本组件state或props 改变 ｜ 父组件重新渲染 ｜
    - 会与旧虚拟树对比，重新渲染
- JSX本质
    - jsx本质就是React.createElement
-  类组件与函数组件有什么异同？
    - constructor this 生命周期 是否有状态 继承 class和函数编程
-  React setState 调用之后发生了什么？（3） 是同步还是异步？（2） 
6. React组件的state和props有什么区别？ （3，3）
-  React组件间通信常见的几种情况
    - 父组件向子组件通信 
        - props
    - 子组件向父组件通信 
        - 回调函数、事件冒泡、Ref
    - 兄弟组件通信
    - 父组件向后代组件通信
        - context
    - 无关组件通信
        - Redux
9. React 组件中怎么做事件代理？它的原理是什么？
10. React 16中新生命周期有哪些?
https://juejin.cn/post/7182382408807743548
9. React18有哪些更新？
10. JSX是什么，它和JS有什么区别
11. React组件为什么不能返回多个元素 (2) 
- react 生命周期 
    - 初始渲染 更新 卸载 错误捕获
    - 7种生命周期方法 will did will should will did will
- 几个hook
    - useState
        - 在函数组件一次执行上下文中，state 的值是固定不变的
        - 如果传入与原有的相同的地址值，则不会更新
        - setState，放入任务队列，批量异步更新
    - useReducer
        - 无状态api
    - useEffect
        - callback, 返回的函数作为下一次callback执行之前调用，用于清除上一次 callback 产生的副作用
        - 异步调用 等到主线程任务完成，DOM 更新，js 执行完成，视图绘制完毕，才执行
    - usememo
        - 包裹变量 
    - usecallback 包裹函数
    - useRef 返回的ref对象在整个生命周期保持不变
- redux  [面试相关](https://vue3js.cn/interview/React/redux.html)
    - action：一些函数，返回一个对象，对象包含了type和数据值
    - reducer：根据action对象的type，规定对应的处理方式
    - redux：创造一个传递给store，store使用reducer处理包裹的state,dispatch 帮助派发 action, getState 这个方法可以帮助获取 store 里边所有的数据内容,subscrible 方法订阅 store 的改变，只要 store 发生改变, 回调函数就会被执行
# JS
https://juejin.cn/post/6941194115392634888
https://blog.csdn.net/RunLovelace/article/details/127767470
- instanceof [手写instanceof](./writing_code/instanceOf.js)
- 异步编程的实现方式？及区别(4 3)
-  this 绑定的优先级

    默认<隐式（2）<显式<new [参考资料](https://juejin.cn/post/6844903953969184776) [输出题](https://juejin.cn/post/6959043611161952269) 第二部分 this题
- Js几种数据类型

    （7种基本类型+一个对象 基本类型在栈区 对象在堆区）NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 x === x 不成立）的值
- ES5 和 ES6 的异同
- 类型转换
    - 到数字转化
        - 对象调用toString（）
    - 到字符串转化
    - 到bool转化
        - 假值undefined • null • false • +0、-0 和 NaN • ""
        - 真值
- 变量提升
- 原型链 
    - proto == prototype constructor是指向类函数本身
    - JS中定义一个静态方法更简单，直接将它作为类函数的属性就行
- 深拷贝与浅拷贝
    - 浅拷贝：直接赋给另一个变量是浅拷贝，Object.assign和...扩展运算符是一层浅拷贝
    - 深拷贝：JSON方法（不能将方法和undefined属性转化） 递归遍历（Reflect.ownKeys会返回对象的所有自有属性，包括Symbol属性和不可枚举属性）

# 设计模式
[参考资料]()
- 常见设计模式：
    - 单例模式｜工厂模式｜策略模式｜代理模式｜中介者模式｜装饰者模式
- 发布订阅者模式[参考资料](https://vue3js.cn/interview/design/Observer%20%20Pattern.html) [代码](./design_mode/Sub-Pub.js)

- 观察者模式 [代码](./design_mode/myObserve.js)

# 输出题
https://juejin.cn/post/6959043611161952269 （看到第三题）

# 面试算法题 
https://labuladong.github.io/algo/di-yi-zhan-da78c/shou-ba-sh-48c1d/wo-xie-le--f7a92/
https://juejin.cn/post/6987320619394138148

# 手写js代码
https://juejin.cn/post/6946136940164939813
1. 使用Promise封装AJAX请求
2. 实现日期格式化函数
3. 实现数组的扁平化 （6）
4. 实现数组去重（2）
5. 实现数组的map方法
6. 实现数组的filter方法
7. 实现非负大整数相加
8. 实现类数组转化为数组
9. 将js对象转化为树形结构
10. 使用ES5和ES6求函数参数的和
11. 解析 URL Params 为对象
12. 循环打印红黄绿
13. 实现每隔一秒打印 1,2,3,4
14. 小孩报数问题
15. 用Promise实现图片的异步加载
16. 实现发布-订阅模式[url](./design_mode/mySub.ts)
17. 查找文章中出现频率最高的单词
18. 封装异步的fetch，使用async await方式来使用
19. 手写继承
20. 实现双向数据绑定
21. 实现简单路由
22. 使用 setTimeout 实现 setInterval
23. 实现 jsonp
24. 判断对象是否存在循环引用
25. 查找有序二维数组的目标值
26. 二维数组斜向打印
27. eventBus

# 笔试题 手写算法 手写页面组件css等
https://blog.51cto.com/u_13961087/5328610
https://juejin.cn/post/7023271065392513038
https://developer.aliyun.com/article/1163425
https://juejin.cn/post/7203277707755896869

[手写redux参考](https://juejin.cn/post/6844904074433789959)
手写react常用hook：
[count hook](https://stackblitz.com/edit/react-ts-6vdpuv?file=App.tsx)
[手写react事件监听]





