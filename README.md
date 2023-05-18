# 网络
[参考资料](https://juejin.cn/post/6908327746473033741)
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
        - 1xx 接受的请求正在处理
        - 2xx 200 OK ｜ 204 已经处理 无返回内容（no content）｜206 执行部分请求 包含 content-range指定范围的实体内容 Partial content
        - 3xx 301 永久重定向 ｜ 302 临时重定向 ｜ 303 类似临时重定向，采用get方法获取资源 see other ｜ 307 不会从post变成get的临时重定向
        - 4xx 400 报文中语法错误 bad request ｜ 401 需要有http认证性unauthorized｜403 永久禁止，被服务器拒绝，没有详尽理由 forbidden ｜ 404 服务器上无法找到请求的资源 not found ｜ 405 虽然被识别但是使用，get 和 head options 方法预检查看服务器允许的方法 method not allowed
        - 5xx 500 服务器端在执行请求时发生了 Internal server error｜ 502 网关或代理角色服务器从上游接受响应无效 Bad gateway ｜ 503 超负载停机维护 无法处理请求 service unavailable ｜ 504 表示网关或代理服务器无法在规定时间获得响应 http1.1新加入 Gateway timeout
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
        - 数据流，每个请求和响应的所有数据包称为一个数据流，拥有编号进行区分
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
    - 应用层：为应用程序服务 http https ftp pop3 dns
    - 表示层：数据格式转化、数据加密
    - 会话层：建立、管理和维护会话
    - 传输层：建立、管理和维护端到端的连接 TCP/UDP
    - 网络层：IP选址及路由选择 IP
    - 数据链路层：提及介质访问和链路管理 MAC 差错控制
    - 物理层：物理层 

- TCP 与 UDP
    - UDP 
        - 无连接。增加头部标识直接给网络层，去除ip报文头直接给应用层。无连接协议。
        - 单播、多播、广播
        - 面向报文（不处理大小，必须大小合适）
        - 不可靠不重传不备份不控制
        - 头部开销小
    - TCP
        - 面向连接三次握手
        - 单播传输点对点
        - 字节流
        - 可靠传输（包的序号，重传）
        - 拥塞控制（慢启动、拥塞避免、快速重传、快速恢复）
        - 全双工通信

- WebSocket [参考资料](https://juejin.cn/post/7020964728386093093)
    - WebSocket 是一种在单个TCP连接上进行全双工通信的协议 ｜ 与 HTTP 协议有着良好的兼容性 80 和 443 ｜ 数据格式轻量 ｜ 发送文本和二进制｜ 无同源限制 ｜ 协议标识符ws（如果加密则为wss）
    - 单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。我们只能使用"轮询"：每隔一段时候，就发出一个询问。缺点：服务端被迫维持来自每个客户端的大量不同的连接｜ 大量的轮询请求会造成高开销，比如会带上多余的header，造成了无用的数据传输。
    - WebSocket在建立握手时，数据是通过HTTP传输的。但是建立之后，在真正传输时候是不需要HTTP协议的
    - 首先，客户端发起http请求，经过3次握手后，建立起TCP连接: http请求里存放WebSocket支持的版本号等信息，如：Upgrade、Connection、WebSocket-Version等 | 然后，服务器收到客户端的握手请求后，同样采用HTTP协议回馈数据 | 最后，客户端收到连接成功的消息后，开始借助于TCP传输信道进行全双工通信。
    - WebSocket协议一旦建议后，互相沟通所消耗的请求头是很小的;服务器可以向客户端推送消息了 少部分浏览器不支持，浏览器支持的程度与方式有区别（IE10）
    - 心跳包机制:心跳包之所以叫心跳包是因为：它像心跳一样每隔固定时间发一次，以此来告诉服务器，这个客户端还活着。事实上这是为了保持长连接
    - 客户端每隔一个时间间隔发生一个探测包给服务器｜客户端发包时启动一个超时定时器｜服务器端接收到检测包，应该回应一个包｜如果客户机收到服务器的应答包，则说明服务器正常，删除超时定时器｜如果客户端的超时定时器超时，依然没有收到应答包，则说明服务器挂了

- 对keep-alive的理解
    - 

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
- margin的应用 [参考资料](https://segmentfault.com/a/1190000007184954)
    - 元素没有设置浮动且没有设置定位或者 position 为 static。当设置负值的 margin 的方向为 top 或者 left 的时候，元素会按照设置的方向移动相应的距离。当设置负值的 margin 的方向为 bottom 或者 right 的时候，元素本身并不会移动，元素后面的其他元素会往该元素的方向移动相应的距离，并且覆盖在该元素上面
    - 如果元素没有设置浮动，但是设置了相对定位。当设置负值的 margin 的方向为 top 或者 left 的时候，元素也会按照设置的方向移动相应的距离。 当设置 margin-bottom/left 的时候，元素本身也不会移动，元素后面的其他元素也会往该元素的方向移动相应的距离，但是，该元素会覆盖在后面的元素上面
    - 如果元素没有设置浮动，但是设置了绝对定位，设置 margin 为负值的时候，表现如下：设置的 margin 的方向为 top 或者 left。当设置负值的 margin 的方向为 top 或者 left 的时候，元素也会按照设置的方向移动相应的距离。设置的 margin 的方向为 bottom 或者 right。由于设置绝对定位的元素已经脱离了标准文档流，所以，设置 margin-right/bottom 对后面的元素并没有影响。
    - 对于设置了浮动的元素，设置 margin 为负值的时候，表现如下：如果设置的 margin 的方向与浮动的方向相同，那么，元素会往对应的方向移动对应的距离。如果设置 margin 的方向与浮动的方向相反，则元素本身不动，元素之前或者之后的元素会向该元素的方向移动相应的距离（并且覆盖）
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
    - box-sizeing: content-box表示标准盒模型（默认值）｜ box-sizeing: border-box表示IE盒模型（怪异盒模型）
- link引入和@import引入
    - link属于html标签，@import是css提供，只能加载css
    - link在页面加载时被加载，@import在页面加载完之后加载
    -
    - import和link权重取决于代码加载顺序，后面样式覆盖前面

6. 伪元素和伪类的区别和作用？
7. 为什么有时候⽤translate来改变位置⽽不是定位？（2）
8. CSS3中有哪些新特性 （9）

# HTML
[参考资料](https://juejin.cn/post/6905294475539513352)
- meta标签
    - charset 编码类型 ｜ kywords 页面关键词 ｜ description 页面描述 ｜refresh 页面重定向和刷新 ｜ viewport 移动端适配，视口比例大小（宽度 高度 初始缩放比例 最大缩放比例 最小缩放比例 是否允许缩放）｜ 搜索引擎索引方式

- src与href
    - src 对资源的引用， 请求时暂停其他资源下载处理，直到该资源加载编译执行完毕
    - href 超文本引用，指向网络资源。并行下载资源
- html5语义化
    - SEO 开发者友好
    - 常用标签：
- DOCTYPE作用
- html5更新内容
- web worker 
    - 运行在后台的js，不影响页面性能，通过postMessage将结果传回主线程

- iframe的优点与缺点
    - 优点：



# 性能优化
https://juejin.cn/post/6941278592215515143
1. CDN的概念 (3)
2. CDN的作用 (4)
3. CDN的原理 (7) DNS的解析域名过程(5 3)
4. 懒加载 懒加载的特点 (3) 懒加载的实现原理 ()
5. 服务器端渲染 https://juejin.cn/post/6844903943902855176

# 打包工具
[webpack 常见面试题参考](https://juejin.cn/post/6844904094281236487)
- import 和 require [参考资料](https://segmentfault.com/a/1190000021911869)
    - CommonJs 规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的 exports属性（即module.exports）是对外的接口，加载某个模块，其实是加载该模块的module.exports属性。
    - 实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”
    - 所有代码运行在模块作用域，不会污染全局作用域
    - 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
    - 模块加载的顺序，按照其在代码中出现的顺序
    - 如果一个模块的对外接口，就是一个单一的值，最好不要使用exports输出，最好使用module.exports输出
    - 如果想要多次执行某个模块，可以让该模块输出一个函数，然后每次require这个模块的时候，重新执行一下输出的函数。所有缓存的模块保存在require.cache之中
    - ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。
    - 代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象
    - export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系
    - import命令输入的变量都是只读的 |import命令具有提升效果|import是静态执行，所以不能使用表达式和变量|import语句是 Singleton 模式
- export[参考资料](https://blog.duhbb.com/2023/04/46468.html)
    - export与export default均可用于导出常量、函数、文件、模块等
    - 使用 export default 导出时，不能使用大括号 {} 将多个声明同时导出
    - 在一个文件或模块中，export、import可以有多个，export default仅有一个
    - export default 用于规定模块的默认对外接口，只能有一个，所以 export default 在同一个模块中只能出现一次。
    - 通过export方式导出，在导入时要加{ }，export default则不需要，因为它本身只能有一个
    - export 可以直接导出或者先定义后导出都可以，export default只能先定义后导出（并且不加花括号）
- webpack常用loader [参考](https://vue3js.cn/interview/webpack/Loader.html)
    - 样式loader：style.* less.* sass.* css.*
    -  file-*（识别出资源模块，移动到指定输出⽬录，输出目录地址） url-*(图片转化为base64) html-minify-* babel loader()
- webpack 常用plugin [参考]()
    - 



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
- 死锁产生
    - 是指多个进程在运行过程中因争夺资源而造成的一种僵局
    - 竞争临时资源，消息通信顺序进行不当，则会产生死锁
- 如何实现浏览器内多个标签页之间的通信?
    - websocket ｜ shareWorker｜localstorage｜postmessage
- 对Service Worker的理解 
    - 独立线程 HTTPS 用于缓存 热更新
    - 首先需要注册service worker ｜ 监听到install事件缓存文件 ｜ 通过拦截请求查询是否存在缓存
- 浏览器缓存的全过程 
    - 强制缓存 expires（根据绝对值） >>> cache-control （时间之外其他的值精确到秒）
    - 协商缓存 Etag Last-Modified
    - 缓存过程：发送请求，先看expire和cache-control本地是否过期，命中强制缓存，使用本地缓存资源，没命中就看etag和last-modified，命中的话就分别发送if- none-match和if modified since给服务器判断， 命中协商缓存就返回304，从缓存读数据，没命中就继续请求 
- 对浏览器的理解 （3）

- 浏览器本地存储
    - cookie 使用http-only使得脚本无法获取
    - cookie 、localStorage sessionStorage session
    - [鉴权方式](https://juejin.cn/post/7129298214959710244) 
- 浏览器跨域[参考资料](https://juejin.cn/post/6844903767226351623)
    - 浏览器同源策略：如果协议、域名或者端口有一个不同就是跨域，Ajax 请求会失败，为来防止CSRF攻击
    - JSONP：就是利用 script 标签没有跨域限制的漏洞。指向一个需要访问的地址并提供一个回调函数来接收数据当需要通讯时
    - CORS [参考资料](https://www.ruanyifeng.com/blog/2016/04/cors.html)：浏览器和后端同时支持。IE 8 和 9 需要通过 XDomainRequest 来实现。
        - 对于简单请求，浏览器直接发出CORS请求。在头信息中增加一个Origin字段，服务器根据这个值决定是否同意这次请求。如果在许可范围内，服务器返回的响应，会多出几个头信息字段.Access-Control+(Allow-Origin/Allow-Credentials/Expose-Headers)
        - 对于非简单请求。请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求。Access-Control+(Request-Method/Request-Headers) 和 Access-Control+(allow-Method/allow-Headers/Allow-Credentials/Max-Age)
    - websocket：WebSocket和HTTP都是应用层协议，都基于 TCP 协议。但是 WebSocket 是一种双向通信协议，在建立连接之后，WebSocket 的 server 与 client 都能主动向对方发送或接收数据
    - Node中间件代理 createServer 在转发、webpack配置proxyTable设置开发环境跨域、nginx代理跨域
    - postMessage。postMessage是HTML5 XMLHttpRequest Level 2中的API，且是为数不多可以跨域操作的window属性之一，它可用于解决以下方面的问题：页面和其打开的新窗口的数据传递、多窗口之间消息传递、页面与嵌套的iframe消息传递、上面三个场景的跨域数据传递。写明目标窗口的协议、主机地址或端口就可以发信息给它。
    - iframe跨域
        - window.name + iframe 通过iframe的src属性由外域转向本地域，跨域数据即由iframe的window.name从外域传递到本地域。这个就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作
        - location.hash + iframe
        - document.domain + iframe document.domain作用是获取/设置当前文档的原始域部分，同源策略会判断两个文档的原始域是否相同来判断是否跨域。这意味着只要把这个值设置成一样就可以解决跨域问题了。只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式。
11. 浏览器线程与进程 https://juejin.cn/post/6854573217655291918
- hash标识和history api
    - 改变hash不会触发页面跳转，因为hash链接是当前页面中的某个片段，所以如果hash有变化，那么页面将会滚动到hash所连接的位置。但是页面中如果不存在hash对应的片段，则没有任何效果。href = protocol + host(hostname+port) + pathname + search + hash 通过hashchange事件可以监听到hash值的变化。
    - history pushstate 和 replacestate如果服务端没有配置新更新的 url ，一刷新浏览器就会报错，因为刷新浏览器会真实地向服务器发送一个 http 的请求
- 浏览器进程与线程
    - 进程代表了一个程序，线程是进程里执行一段指令的时间
    - 浏览器主线程｜网络进程｜GPU进程｜渲染进程｜插件进程
    - 渲染进程：GUI渲染线程｜JS引擎线程｜事件触发线程｜定时器触发线程｜异步http请求线程（GUI与JS互斥）
    - dom树 cssom树 构建树 绘制 重绘 回流
    - 一个Tab页中无论什么时候都只有一个JS引擎线程在运行JS程序
    - 时间触发线程属于浏览器而不是JS引擎，用来控制事件循环
    - 因此使用单独线程来计时并触发定时器
    - XMLHttpRequest连接后通过浏览器新开一个线程请求，回调函数在事件队列中
- 浏览器渲染优化 


# React
[参考资料一](https://juejin.cn/post/7182382408807743548)
[参考资料二](https://juejin.cn/post/6844903806715559943)
-  React 事件机制
    - 
-  React 高阶组件、Render props、hooks 有什么区别，为什么要不断迭代
-  哪些方法会触发 React 重新渲染？重新渲染 render 会做些什么？ 
    - 本组件state或props 改变 ｜ 父组件重新渲染 ｜
    - 会与旧虚拟树对比，重新渲染
- JSX本质
    - jsx本质就是React.createElement
-  类组件与函数组件有什么异同？
    - constructor this 生命周期 是否有状态 继承 class和函数编程
-  React setState 调用之后发生了什么？（3） 是同步还是异步？（2） 
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
    - usecallback 
        - 包裹函数 useCallBack不要每个函数都包一下，否则就会变成反向优化，useCallBack本身就是需要一定性能的
        useCallBack并不能阻止函数重新创建,它只能通过依赖决定返回新的函数还是旧的函数,从而在依赖不变的情况下保证函数地址不变
        useCallBack需要配合React.memo使用
    - useRef 返回的ref对象在整个生命周期保持不变
- redux  [面试相关](https://vue3js.cn/interview/React/redux.html)
    - action：一些函数，返回一个对象，对象包含了type和数据值
    - reducer：根据action对象的type，规定对应的处理方式
    - redux：创造一个传递给store，store使用reducer处理包裹的state,dispatch 帮助派发 action, getState 这个方法可以帮助获取 store 里边所有的数据内容,subscrible 方法订阅 store 的改变，只要 store 发生改变, 回调函数就会被执行
# JS
https://juejin.cn/post/6941194115392634888
https://blog.csdn.net/RunLovelace/article/details/127767470
- 排序算法 [参考资料1](https://blog.csdn.net/qq_37384271/article/details/114004901) [参考资料2](https://juejin.cn/post/6844903865859440647)
    - 冒泡排序：平均时间复杂度：O(n2)，空间复杂度：O(1)
    - 选择排序：平均时间复杂度：O(n2)，空间复杂度：O(1)
    - 插入排序：平均时间复杂度：O(n2)，空间复杂度：O(1)
    - 快速排序：平均时间复杂度：O(nlogn)，空间复杂度：O(logn)
    - 桶排序：平均时间复杂度：O(n + m)，空间复杂度：O(m)，其中 n 为待排序的元素个数，m 为桶的个数 
    - 归并排序：平均时间复杂度：O(nlogn)，空间复杂度：O(n)
    - 平均时间复杂度：O(nlogn)，空间复杂度：O(1)
- instanceof [手写instanceof](./writing_code/instanceOf.js)
- 上下文[参考资料](https://segmentfault.com/a/1190000020732949)
    - 作用域，其实就是某个变量或者函数的可访问范围。它控制着变量和函数的可见性和生命周期。作用域也分为： 「全局作用域 」和 「局部作用域」。
    - 全局：定义在最外层的变量｜全局对象的属性｜任何地方隐式定义的变量（即：未定义就直接赋值的变量）。隐式定义的变量都会定义在全局作用域中。
    - 局部： JavaScript的作用域是通过函数来定义的。在一个函数中定义的变量， 只对此函数内部可见。这类作用域，称为局部作用域。还有一个概念和作用域联系密切， 那就是作用域链。
    - 作用域链是一个集合， 包含了一系列的对象， 它可以用来检索上下文中出现的各类标识符(变量， 参数， 函数声明等)。函数在定义的时候, 会把父级的变量对象AO/VO的集合保存在内部属性 scope 中，该集合称为作用域链。
    - AO : Activation Object 活动对象 | VO : Variable object 变量对象 总的来说， VO要比AO的范围大很多， VO是负责把各个调用的函数串联起来的。VO是外部的， 而AO是函数自身内部的。
    - Javascript 采用了词法作用域(静态作用域)，函数运行在他们被定义的作用域中，而不是他们被执行的作用域。
    - 执行上下文就是Javascript 的执行环境。当javascript执行一段可执行代码的时候时，会创建对应的执行上下文。
    - 使用立即执行函数将 i 传入函数内部。这个时候值就被固定在了参数 j 上面不会改变
    - 由于Javavscript是单线程的，一次只能处理一件事情，其他任务会放在指定上下文栈中排队。Javascript 解释器在初始化执行代码时，会创建一个全局执行上下文到栈中，接着随着每次函数的调用都会创建并压入一个新的执行上下文栈。函数执行后，该执行上下文被弹出。
    - 我们知道，匿名函数的this是指向全局对象的，所以this指向window，会打印出3
    - 给表达式加了括号，而括号的作用是改变表达式的运算顺序，而在这里加与不加括号并无影响；相当于  obt.fn()
    - 讲一个全局变量赋值给了一个局部变量，最终，x是一个局部变量，y是一个全局变量，所以打印x是报错
    - 我们知道，在 JavaScript中， Function 和 var 都会被提升（变量提升），所以上面的代码就相当于
    - js中变量的作用域链与定义时的环境有关，与执行时无关。执行环境只会改变this、传递的参数、全局变量等

    - 创建阶段 | 初始化作用域链 | 创建变量对象 | 创建arguments | 扫描函数声明 | 扫描变量声明 | 求this | 执行阶段 | 初始化变量和函数的引用 | 执行代码
    -  this 是运行时才能确认的， 而非定义时确认的。在函数执行时，this 总是指向调用该函数的对象。指向调用对象 | 指向全局对象 | 用new 构造就指向新对象 | apply/call/bind, 箭头函数

-  this
    - 默认<隐式（2）<显式<new  [参考资料](https://juejin.cn/post/6844903953969184776) 
    - [输出题](https://juejin.cn/post/6959043611161952269) 第二部分（第8题、9题、10题） this题｜后面虽然让say方法apply指向了另外一个对象，但是仍不能改变箭头函数的特性｜如果第一个参数传入的对象调用者是null或者undefined，call方法将把全局对象（浏览器上是window对象）作为this的值 ｜ 使用new构造函数时，其this指向的是全局环境window。｜ 立即执行函数 ｜ 执行arguments0，相当于arguments调用方法
    - apply bind call 函数 apply是数组[手写](./writing_code_js/prototype.js)

- Js几种数据类型
    （7种基本类型+一个对象 基本类型在栈区 对象在堆区）NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 x === x 不成立）的值
- ES5 和 ES6 的异同 [参考资料](https://www.cnblogs.com/angel648/articles/13256535.html)
    - 引入了一种新的原始数据类型symbol以支持唯一值
    - let和const变量 
        - let 不允许在相同作用域内重复声明同一个变量.
        - 不存在变量提升
        - 如果区块中存在 let 和 const ，这个区块从一开始就形成了封闭作用域。凡是在声明之前使用这些变量就会报错。称为 “暂时性死区”。
        - 如果真的想将对象冻结，应该使用Object.freeze方法
        - let，const，class 命令声明的全局变量，不属于顶层对象的属性
        - 在ES6规范有一个词叫做Global Enviroment Records(也就是全局环境变量记录)，它里面包含两个内容，一个是Object Enviroment Record，另一个是Declarative Enviroment Record
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
    - [输出题](https://juejin.cn/post/6959043611161952269)（第四部分 第1题 第2题）
    - 两者区别在于变量提升，函数声明的 5 会被后边函数表达式的 4 覆盖；
    - new Foo().getName()， 这里等价于 (new Foo()).getName(), 先new一个Foo的实例，再执行这个实例的getName方法，但是这个实例本身没有这个方法，所以去原型链__protot__上边找，实例.protot === Foo.prototype
- 类方法
    - 静态方法	定义在构造函数上的方法	只能被构造函数访问
    - 原型方法	通过构造函数的prototype定义的方法	能被实例直接访问，构造函数需通过prototype才可访问
    - 实例方法	构造函数中this上添加的属性都属于实例属性	只能被实例对象访问
- 深拷贝与浅拷贝
    - 浅拷贝：直接赋给另一个变量是浅拷贝，Object.assign和...扩展运算符是一层浅拷贝
    - 深拷贝：JSON方法（不能将方法和undefined属性转化） 递归遍历（Reflect.ownKeys会返回对象的所有自有属性，包括Symbol属性和不可枚举属性）
- 类数组转化为数组[参考资料](https://juejin.cn/post/6844904151680286734)
    - slice [].slice.call(arguments)能将具有length属性的对象转成数组
    - var arr = Array.from(arguments);
    - var args = [...arguments];
    - var arr = $.makeArray(arguments);
- JS事件机制
    - 事件流：事件捕获（Dom树顶层，直到事件触发到达源元素），目标阶段，事件冒泡（从子节点向父节点传递到达document）（IE浏览器没有事件捕获），可以绑定在捕获和冒泡阶段
    - 绑定方式：1 作为属性写在html元素上 2 document.onclick  3 addEventListener 前两种是事件冒泡阶段，第三种的第二个参数false在冒泡阶段，true绑定在捕获阶段
    - 执行顺序，对于同一个元素看先绑定先执行，onclick后覆盖前，addEventListener同一元素绑定多少次执行多少次，onclick早于addeventListener
    - 事件委托：绑定在父级元素，利用事件冒泡去触发父级事件处理函数的技巧
    - 事件对象的属性，stopPropagation() .cancelBubble stopImmediatePropagation()：阻止同一个事件的其他监听函数被调用
- 异步编程的实现方式
    - 回调函数｜promise｜generator（执行generator的机制）｜async（generator和promise的语法糖）
- Promise [手写代码](./writing_code_js/myPromise.js)
    - 状态有pending，fulfilled，rejected
    - all：所有promise状态fulfilled返回一个所有value的数组，只要一个失败，返回第一个rejected的reason 
    - then方法接受的参数是函数，而如果传递的并非是一个函数，它实际上会将其解释为then(null)，这就会导致前一个Promise的结果会传递下面。
    - 这里其实是一个坑，.then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环
    - finally本质上是then方法的特例，它最终返回的默认会是一个上一次的Promise对象值，不过如果抛出的是一个异常则返回异常的Promise对象，不管Promise对象最后的状态如何都会执行，回调函数不接受任何的参数
    - race里只会捕获第一个成功的方法，其他的函数虽然还会继续执行，但是不是被then捕获了。
    - await后面的语句相当于放到了new Promise中，下一行及之后的语句相当于放在Promise.then中。（见输出19题，24题， 27题）
    - 它的状态始终是pending状态，所以在await之后的内容是不会执行的，包括async1后面的 .then (见输出21题)
    - 如果async函数中抛出了错误，就会终止错误结果，不会继续向下执行。如果想要让错误不足之处后面的代码执行，可以使用catch来捕获
    - 但是这个.then()并没有返回值，所以p1打印出来的Promise的值会是undefined
    - 无论是thne还是catch中，只要throw 抛出了错误，就会被catch捕获，如果没有throw出错误，就被继续执行后面的then
    - 见事件循环机制
- 事件循环机制
    promise1.then() 的回调就是一个 task
    promise1 是 resolved或rejected: 那这个 task 就会放入当前事件循环回合的 microtask queue
    promise1 是 pending: 这个 task 就会放入 事件循环的未来的某个(可能下一个)回合的 microtask queue 中
    setTimeout 的回调也是个 task ，它会被放入 macrotask queue 即使是 0ms 的情况
    - [输出题](https://juejin.cn/post/6959043611161952269)


# 设计模式
[参考资料]()
- 常见设计模式：
    - 单例模式（只有一个）｜工厂模式（子类创建）｜适配器模式（把两个无关类联系在一起｜策略模式｜代理模式（控制访问）｜中介者模式｜装饰者模式（类继承，继承的替代）｜ 外观模式
- 发布订阅者模式[参考资料](https://vue3js.cn/interview/design/Observer%20%20Pattern.html) [代码](./design_mode/Sub-Pub.js)

- 观察者模式 [代码](./design_mode/myObserve.js)

# Typescript
- 在TS中，一个声明会创建一个实体，为以下三种之一：
    - 命名空间：使用 namespace 来声明命名空间，命名空间的声明会创建一个命名空间和值，至于什么是命名空间，会在后续的文章中介绍；
    - 类型：类型的声明一般使用 interface 或 type 关键字，得到一个类型，此外， class 和 enum 关键字的声明也会得到一个类型；
    - 值：通常使用 var , let , const 来声明一个变量，创建一个值，此外，class ，enum和 function关键字也会声明一个值。

# 面试算法题 
https://labuladong.github.io/algo/di-yi-zhan-da78c/shou-ba-sh-48c1d/wo-xie-le--f7a92/
https://juejin.cn/post/6987320619394138148

# 手写js代码
https://juejin.cn/post/6946136940164939813
- 异步类
    - [使用Promise封装AJAX请求](./writing_code/asyn/request.js)
    - [循环打印红黄绿](./writing_code/red_green_light.js)
    - [用Promise实现图片的异步加载](./writing_code/Image_load.js)
- react类
    - [count hook](https://stackblitz.com/edit/react-ts-6vdpuv?file=App.tsx)
- js类
    - [手写InstanceOf](./writing_code_js/instanceOf.js)
    - [手写继承](./writing_code/js/prototype.js)
    - [实现数组的扁平化](./writing_code/js/code_arr.js)
    - [实现数组的filter方法](./writing_code/js/code_arr.js)
    - [实现类数组转化为数组](./writing_code/js/code_arr.js)
    - [实现数组去重](./writing_code/js/code_arr.js)
- 设计模式
    - [eventBus](./writing_code/data_and_design_mode/EventHub.ts)
- css格式类
    - [双翼布局](./writing_code/css/two%20wings.html) 负margin实现
    - [圣杯布局](./writing_code/css/cup.html)
    - [两栏布局](./writing_code/css/two%20columns.html)
    - [三栏布局](./writing_code/css/three%20columns.html)
    - [三角形/扇形/线段]()

- 功能类
    - [实现hash路由](./writing_code/framework_code/hashRouter.html)
    - [实现history路由](./writing_code/framework_code/historyRouter.html)
2. 实现日期格式化函数

5. 实现数组的map方法
7. 实现非负大整数相加
9. 将js对象转化为树形结构
10. 使用ES5和ES6求函数参数的和
11. 解析 URL Params 为对象
14. 小孩报数问题
17. 查找文章中出现频率最高的单词
18. 封装异步的fetch，使用async await方式来使用
19. 
20. 实现双向数据绑定
21. 
22. 使用 setTimeout 实现 setInterval
23. 实现 jsonp
24. 判断对象是否存在循环引用
25. 查找有序二维数组的目标值
26. 二维数组斜向打印
27. 

# 笔试题 手写算法 手写页面组件css等
https://blog.51cto.com/u_13961087/5328610
https://juejin.cn/post/7023271065392513038
https://developer.aliyun.com/article/1163425
https://juejin.cn/post/7203277707755896869

[手写redux参考](https://juejin.cn/post/6844904074433789959)
手写react常用hook：

[手写react事件监听]


# trail 项目
- 页面搜索与结果展示
    - 搜索组件与结果组件的信息是由createContext.Provider实现的
    - 共享的方法有 defaultSearch, syncUrlOptions, getResult, searchReturns,resultReturns, doSearch 
    - 实现数据的搜索，url与请求的同步更改与参数提取，接口请求等功能，具体地说，提供provider中提供了search方法，与表单的onfinish结合调用
- 组件 antd常用
    - Button, Dropdown, Input, Menu, MenuProps, message, Modal, Dropdown steps组件（用于样式）
    - button组件
- css 文件引入

- coocik登录和token登录，菜单验证方式
    - 
- 鉴权
    - cookie鉴权，设置cookie后登录以及每次请求时，由后端验证cookie
- service模块：
    - 封装了请求功能
    - 处理代理转发环境
    - 请求成功的处理
    - 请求失败的提示
    - 基于axios的request功能，对错误code进行展示以及返回无权限时自动登录跳转
    - 基于request的post， get， download 和upload方法

- useSearchV2 参数（defaultSearch, syncUrlOptions, getResult ）
    - useSearch 
    - 参数（defaultSearch, syncUrlOptions）
    - 过程（useObject 包裹 parseUrlV3（用于从url下取参数），返回一个状态与两个方法（用于参数覆盖和合并  changeSearch, resetSearch） 与 在副作用里留下了syncUrlV3（将参数同步到url））
    - 返回（searchReturns={search, resetSearch, changeSearch}）
    - useResult 
    - 参数（getResult） 
    - 过程（处理的getResult方法，增加了loading,result,error状态和getResult，setResult，resetResult方法）
    - 返回（resultReturns）
    - doSearch  
    - 参数（搜索参数）
    - 过程（使用 resultReturns 中的 getResult，并且调用了searchReturns中的changeSearch方法重设参数（重设时就会产生副作用出同步参数改变到url））
    - 依赖于前两个方法的返回 searchReturns, resultReturns 决定是返回新函数还是从前的函数
    - 返回 resultReturns的getResult方法执行结果
- 中英文
    - i18n 组件（用于路由和资源内容）
    - 语言状态写在localStorage中
    - 在项目根页面中根据语言状态初始化i18n，校验是否有重复key
    - t(), 根据语言设定切换
- 日期
    - 使用momentjs




# 笔试题 
万诺coding

招行0502fintech笔试算法 2题 3题看不懂
美团0429暑期实习笔试真题解析 磁盘调度（堆模拟，看不懂） 树（树形存边）
华为0427od笔试算法解析 1题（拓扑排序） 2题 （双向链表 hash表模拟） 3题（二分枚举）
微众银行0423春招笔试真题解析 1题（理解前缀和但不理解二分哈希，需要自己写一下）2题（模拟，主要是在想，js的运算问题，比方排序，妈的） 3题（读不懂题意真要命）
荣耀0422暑期实习春招算法解析 1题（没辨认出是最短路模型）  3题（经典题）
蚂蚁0420暑期实习春招笔试算法解析 1题（没想到是这个解法 前缀。。） 2题 （我也没想到） 3题（也是很神奇，算了）



