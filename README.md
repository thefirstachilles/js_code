# 网络
https://juejin.cn/post/6908327746473033741
- 请求与响应
    - 请求行（请求方法 url 协议版本） ｜ 请求头部（字段名 + 值） ｜ 空行 ｜ 请求体（携带的数据）
    - 响应行（协议版本 状态码 状态码原因短语 ） ｜ 响应头 ｜ 空行 ｜ 响应体
    - 请求方法：GET ｜ POST （提交到服务器，服务器资源创建新内容） ｜ PUT （上传文件，服务器资源更新）｜ DELETE （删除服务器上对象）｜ HEAD （获取报文响应头）｜ OPTIONS （在具体资源请求前，1.获取服务器支持的所有HTTP请求方法 2.询问检查访问权限，用来跨域）｜ CONNECT（与代理服务器通信时建立隧道，进行TCP通信）｜TRACE（回显）
    - GET和POST的请求的区别
        - GET简单请求，POST对服务器资源影响 ｜ 浏览器一般对Get缓存 ｜ GET报文实体部分为空 POST请求报文实体为向服务器发送的数据 ｜ Get请求参数在url中不安全 ｜ 浏览器对url长度限制，限制了get的数据｜post参数支持更多类型
    - url：协议｜域名｜端口｜虚拟目录｜文件名｜锚｜参数
    - 协议版本： 见下面http1 http1.1 http2 https叙述
    - 请求头字段：
        - Accept 系列，浏览器能处理的内容类型，包括charset（字符集），encoding（压缩编码），language（语言）
        - Connection：连接的类型（长连接和短连接）
        - Cookie
        - Host（请求的页面的所在域） 与 Referer（请求页面所在url）
        - User-Agen：用户代理字符串
    - 状态码：
        - 
    - 响应头字段：
        - Date：消息发送的时间
        - server：服务器名称
        - connection:浏览器与服务器之间连接的类型
        - cache-control：控制缓存
        - contente-type：后面的文档属于什么类型（application/x-www-form-urlencoded，multipart/form-data，application/json，text/xml）
- HTTP协议特点：
    - 无状态（对于事务处理没有记忆能力，每次客户端和服务端会话完成时，服务端不会保存任何会话信息）=》快速 =》重传麻烦
    - 明文传输 =》不安全
    - 无连接 每次连接只处理一个请求 =》简单
    - 允许传输任意类型数据对象 =》灵活
    - 不验证通信方身份，无法证明报文完整性 =》不安全
- HTTP1 HTTP1.1 HTTP2 的区别异同
    - HTTP1 默认非持久短连接
    - HTTP1.1 
        - 默认长连接 可以使用管道网络传输（同一个TCP中客户端发出多个请求，不等第一个返回就发第二个，但是服务器返回按照原顺序，形成队头堵塞）
        - 引入了range头域支持断点续传（返回码是206）
        - 引入了更多缓存控制如Etag，新增了host字段可以请求发往统一服务器不同网站
        - 新增了put，head，options等请求方法
    - HTTP2 并发连接
        - 二进制帧协议，之前报文请求头必须是文本（ASCAll编码），现在是头信息帧和数据帧，为多路复用铺垫
        - 多路复用，同一个TCP请求内服用，而且不按照顺序发送，避免队头堵塞
        - 数据流， 每个请求和响应的所有数据包称为一个数据流，拥有编号进行区分
        - 请求头信息的压缩，1.gzip和compress压缩后发送 2.客户端和服务器维护一张头信息表，发送索引号
        - 服务器主动推送
    - HTTPS（Secure Sockets Layer, TLS与SSL在传输层与应用层之间对网络连接进行加密）
        连接建立过程，用443端口：
            - 客户端请求（协议版本号，随机数，客户端支持加密方法）
            - 服务器收到返回（确认加密方法、CA证书、服务器生成随机数）
            - 客户端确认服务器证书，生成第三个随机数，用公钥加密第三个，发送给服务器，提供前面所有内容的hash值给服务器检验
            - 服务器使用私钥，解密客户端发送随机数，提供前面所有内容hash值给客户端
            - 客户端和服务器端根据约定加密方法生成对话密钥
        - 对称加密
        - 非对称加密
        - 数字证书
    - HTTP/3基于UDP协议实现了类似于TCP的多路复用数据流、传输可靠性等功能，这套功能被称为QUIC协议
- URL输入到浏览器后发生的动作：
    - 解析url（是否合法）
    - 缓存判断
    - DNS解析（见DNS解析）
    - 获取MAC地址
    - TCP三次握手（或https四次握手）
    - 返回数据
    - 页面渲染（见页面渲染）
    - 四次挥手（见四次挥手）

- 网络模型：
- TCP 与 UDP
- WebSocket
4. HTTP状态码（16）
10. 对keep-alive的理解
11. HTTP请求报文的是什么样的？(4)
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
        - ACK包 acknum = x+1 服务端进入CLOSE_WAIT 客户端收到进入FIN_WAIT_2
        - 服务端发送FIN 随机序列y 准备好关闭连接 进入LAST_ACK状态
        - ACK包 acknum = y+1 客户端进入TIME_WAIT 等待可能出现的要求重传的包 服务端收到后进入CLOSED状态 客户端等待2MSL后没响应后也关闭连接进入closed
    - 对称加密与非对称加密
        - 
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
    - 绝对定位 transform：translate（-50%， -50%）｜ 绝对定位（0000 盒子有宽高）｜ 绝对定位+margin 负值 ｜flex+align和justify 设置center
- flex定位
    - direction 方向｜ wrap 换行｜ justif-content｜ align-items｜
    - grow shrink basis order（排序） 
- 浮动
    - 父元素的高度无法被撑开，影响与父元素同级的元素｜与浮动元素同级的非浮动元素会跟随其后｜若浮动的元素不是第一个元素，则该元素之前的元素也要浮动，否则会影响页面的显示结构
    - 最后一个浮动标签末尾添加一个空标签，使用clear属性清除浮动
    - 使用父元素添加overflow属性清除浮动
    - 给浮动元素容器添加浮动（不推荐）
    - 使用：after伪元素，在浮动元素容器后添加一个看不见的div清理浮动
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
    - import，ES6标准发布后，module成为标准，编译时执行，写在顶部
    - require，CommonJs，运行时执行，任何地方
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
    - 缓存过程：发送请求，先看expire和cache-control本地是否过期，命中强制缓存，使用本地缓存资源，没命中就看etag和last-modified，命中的话就分别发送if- none-match和if modified since给服务器判断， 命中协商缓存就返回304，从缓存读数据，没命中就继续请求 
- 对浏览器的理解 （3）
- 浏览器渲染原理：1. 浏览器的渲染过程 （5） 2. 渲染优化 （4 8）
- 浏览器本地存储
    - cookie 使用http-only使得脚本无法获取
    - cookie 、localStorage sessionStorage session
    - [鉴权方式](https://juejin.cn/post/7129298214959710244) 
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
- ES5 和 ES6 的异同 [参考资料](https://www.cnblogs.com/angel648/articles/13256535.html)
    - 引入了一种新的原始数据类型symbol以支持唯一值
    - let和const变量 
        - let 不允许在相同作用域内重复声明同一个变量.
        - 不存在变量提升
        - 如果区块中存在 let 和 const ，这个区块从一开始就形成了封闭作用域。凡是在声明之前使用这些变量就会报错。称为 “暂时性死区”。
        - 如果真的想将对象冻结，应该使用Object.freeze方法
        -  let，const，class 命令声明的全局变量，不属于顶层对象的属性
    - 解构赋值
        - 数组解构赋值几种情况
        - 如果解构不成功，变量的值就等于 undefined 或者 []
        - 如果等号的右边不是数组，那么将会报错。
        - 解构赋值允许指定默认值
        - 只有当一个数组成员严格等于 undefined ，默认值才会生效
        - 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
        - 对象的解构，{},变量名与属性同名，才能取到正确的值。
        - 对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者
        - 对象的解构也可以指定默认值
        - 字符串也可以解构赋值。字符串被转换成了一个类似数组的对象
        - 数值和布尔值的解构赋值, 解构赋值时，如果等号右边是数值和布尔值，则会先转化为对象
        - 由于 undefined 和 null 无法转化为对象，所以对他们进行解构赋值都会报错
        - 函数参数的解构赋值
        - 解构的用途 交换变量的值 | 从函数返回多个值 | 函数参数的定义 | 提取JSON数据 | 遍历Map解构
        - 模板字符串
        - 箭头函数
        - 所以如果箭头函数直接返回一个对象，就必须在对象外面加上括号
        - ES5中 this 的指向是可变的，但是箭头函数中 this 指向固定化
        -  不可以当构造函数，即不可以使用 new 命令，因为它没有 this，否则会抛出一个错误。｜ 箭头函数没有自己的 this，所以不能使用 call()、apply()、bind() 这些方法去改变 this 指向。｜ 不可以使用arguments 对象，该对象在函数体内不存在。如果要用，可以使用rest参数代替。
    - 箭头功能
    - ES6 增加了import命令和class命令。ES6 一共有 6 种声明变量的方法
    - Babel和Traceur，用于在构建过程中将ES6代码转换为ES5代码
    - Rest 参数与 Spread 语法 [参考资料](https://zh.javascript.info/rest-parameters-spread)
    - 对象的扩展
    - 数组的扩展
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
- 类数组转化为数组[参考资料](https://juejin.cn/post/6844904151680286734)
    - slice [].slice.call(arguments)能将具有length属性的对象转成数组
    - var arr = Array.from(arguments);
    - var args = [...arguments];
    - var arr = $.makeArray(arguments);
- 事件捕获与事件冒泡
    - 


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
- 异步类
    - [使用Promise封装AJAX请求](./writing_code_promise/request.js)
    - [循环打印红黄绿](./writing_code_promise/red_green_light.js)
    - [用Promise实现图片的异步加载](./writing_code_promise/Image_load.js)
- react类
    - [count hook](https://stackblitz.com/edit/react-ts-6vdpuv?file=App.tsx)
- js类
    - [手写InstanceOf](./writing_code_js/instanceOf.js)
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
13. 实现每隔一秒打印 1,2,3,4
14. 小孩报数问题
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

[手写react事件监听]





