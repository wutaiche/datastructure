一，当样式表中有动画时，不要设置display：none 和display：block.使用opacity:0 -1。来显示，隐藏元素。

二，calc(50% - 12 px) 计算符号中间一定要打空格不然没有效。

如果字体加1px变化很大，需要设置height和line-height。

三，如果父元素position是absolute,子元素也是absolute,有时鼠标事件没有用，需要设置z-index为一个大值,如1000。

四，import * as xxx from ‘xxx’,会将 若干export导出的内容组合成一个对象返回。

五，less中的使用calc,格式要如下.test{ width: calc(~"100% - 50px"); }

六，时间处理类可以用moment.js。

七、h5新增的classList用法

div.classList.remove("disabled");
//添加"current"类
div.classList.add("current");
//切换"user"类
div.classList.toggle("user");
//确定元素中是否包含既定的类名
if (div.classList.contains("bd") && !div.classList.contains("disabled")){
//执行操作
)
八、tween动画的使用

//首先引用tween.js的库

//然后

animate();
function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}
requestAnimationFrame(animate);

const tween = new TWEEN.Tween(telephone0.style)
  .to({ opacity: 1 }, 500)
  .easing(TWEEN.Easing.Quadratic.Out);
const tweenOne = new TWEEN.Tween(corner1)
  .to({ x: 5 }, 300)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate(function() {
    telephone0.style.setProperty('transform', 'rotate(' + corner1.x + 'deg)');
  });

tween.chain(tweenOne);
tween.start();
九、网络请求方法的封装

//对get,post方法请求的封装
let Util = {
/**
* http get 请求简单封装
* @param url 请求的URL
* @param successCallback 请求成功回调
* @param failCallback 请求失败回调
*/
  get: (url, successCallback, failCallback) => {
    fetch(url)
    .then((response) => response.text())
    .then((responseText) => {
      let result = JSON.parse(responseText);
      successCallback(result.status, result.code, result.message, result.data, result.share);
    })
    .catch((err) => {
      failCallback(err);
    });
  },
/**
* http post 请求简单封装
* @param url 请求的URL
* @param data post的数据
* @param successCallback 请求成功回调
* @param failCallback failCallback 请求失败回调
*/
  post: (url, data, successCallback, failCallback) => {
    let formData = new FormData();
    Object.keys(data).map(function(key) {
      var value = data[key];
      formData.append(key, value);
    });

    let fetchOptions = {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      // 'Content-Type': 'application/json'
      'Content-Type': 'multipart/form-data',
      },
      body: formData
      // body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
      let result = JSON.parse(responseText);
      successCallback(result.status, result.code, result.message, result.data, result.share);
    })
    .catch((err) => {
      failCallback(err);
    });
  }
}

//fetch上传文件
var formData = new FormData();
var fileField = document.querySelector("input[type='file']");
formData.append('username', 'abc123');
formData.append('avatar', fileField.files[0]);

fetch('https://example.com/profile/avatar', {
 method: 'PUT',
 body: formData
})
.then(response => response.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));

//fetch判断是否成功
fetch(url, options)
 .then(
  response => (response.ok
  ? response.json()
  : Promise.reject(response.text())
  ),
  error => Promise.reject(error)
 )
 .then(
  json => json,
  error => ({ error })
 )
 .catch(error => ({ error }));

//http简单的封装
class Http {

  static HOST = 'https://news-at.zhihu.com/api/4/';

  static get(url, body){
    return this.request(url, 'get', body)
  }

  static post(url, body){
    return this.request(url, 'post', body)
  }

  static request(url, method, body){
    let isOk;
    return new Promise((resolve, reject) => {
      fetch(this.HOST + url, {
      method,
      // headers:{"Content-Type": "application/x-www-form-urlencoded"},
      body
      })
      .then((response) => {
        isOk = !!response.ok;
        response._bodyText = response._bodyText.replace(/http:\\\/\\\//g, 'https://');
        return response.json();
      })
      .then((responseData) => {
        if (isOk) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
}

//原生上传实现

var iMaxFilesize = 2097152; //2M
window.fileSelected = function() {
 var oFile = document.getElementById('imageFile').files[0]; //读取文件
 var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
 if (!rFilter.test(oFile.type)) {
  alert("文件格式必须为图片");
  return;
 }
 if (oFile.size > iMaxFilesize) {
  alert("图片大小不能超过2M");
  return;
 }
 var vFD = new FormData(document.getElementById('uploadForm')), //建立请求和数据
 oXHR = new XMLHttpRequest();
 oXHR.addEventListener('load', function(resUpload) {
 //成功
 }, false);
 oXHR.addEventListener('error', function() {
 //失败
 }, false);
 oXHR.addEventListener('abort', function() {
 //上传中断
 }, false);
 oXHR.open('POST', actionUrl);
 oXHR.send(vFD);
};

//上传文件的实现

(function($) {
  $.extend($.fn, {
    fileUpload: function(opts) {
      this.each(function() {
        var $self = $(this);
        var doms = {
          fileToUpload: $self.find(".fileToUpload"),
          thumb: $self.find(".thumb"),
          progress: $self.find(".upload-progress")
        };
        var funs = {
          //选择文件，获取文件大小，也可以在这里获取文件格式，限制用户上传非要求格式的文件
          fileSelected: function() {
            var files = (doms.fileToUpload)[0].files;
            var count = files.length;
            for (var index = 0; index < count; index++) {
              var file = files[index];
              var fileSize = 0;
              if (file.size > 1024 * 1024)
                fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
              else
                fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
            }
            funs.uploadFile();
          },
          //异步上传文件
          uploadFile: function() {
            var fd = new FormData();//创建表单数据对象
            var files = (doms.fileToUpload)[0].files;
            var count = files.length;
            for (var index = 0; index < count; index++) {
              var file = files[index];
              fd.append(opts.file, file);//将文件添加到表单数据中
              funs.previewImage(file);//上传前预览图片，也可以通过其他方法预览txt
            }
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', funs.uploadProgress, false);//监听上传进度
            xhr.addEventListener('load', funs.uploadComplete, false);
            xhr.addEventListener('error', opts.uploadFailed, false);
            xhr.open('POST', opts.url);
            xhr.send(fd);
          },
          //文件预览
          previewImage: function(file) {
            var gallery = doms.thumb;
            var img = document.createElement("img");
            img.file = file;
            doms.thumb.html(img);
            // 使用FileReader方法显示图片内容
            var reader = new FileReader();
            reader.onload = (function(aImg) {
              return function(e) {
                aImg.src = e.target.result;
              };
            })(img);
            reader.readAsDataURL(file);
          },
          uploadProgress: function(evt) {
            if (evt.lengthComputable) {
              var percentComplete = Math.round(evt.loaded * 100 / evt.total);
              doms.progress.html(percentComplete.toString() + '%');
            }
          },
          uploadComplete: function(evt) {
            alert(evt.target.responseText)
          }
        };
        doms.fileToUpload.on("change", function() {
          doms.progress.find("span").width("0");
          funs.fileSelected();
        });
      });
    }
  });
})(Zepto);

//fetch方法的封装
export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase();
  url = baseUrl + url;

  if (type == 'GET') {
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }

  if (window.fetch && method == 'fetch') {
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: "cors",
      cache: "force-cache"
    }

    if (type == 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }
    try {
      const response = await fetch(url, requestConfig);
      const responseJson = await response.json();
      return responseJson
    } catch (error) {
      throw new Error(error)
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }

      let sendData = '';
      if (type == 'POST') {
        sendData = JSON.stringify(data);
      }

      requestObj.open(type, url, true);
      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestObj.send(sendData);
      requestObj.onload = function () {
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
          let obj = requestObj.response
          if (typeof obj !== 'object') {
            obj = JSON.parse(obj);
          }
          resolve(obj)
        } else {
          reject(requestObj)
        }
      }
    })
  }
}
//dva封装的fetch方法
import fetch from 'dva/fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

async function request(url, options) {
  const response = await fetch(url, options);

  checkStatus(response);

  const data = await response.json();
  const ret = {
      data,
      headers: {},
  };
  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count');
  }
  return ret;
}

export default request;
十、关于二次渲染的高阶组件

(WrappedComponent)=>{
  return class extends Component {
    constructor(props){
      super(props)
      this.state={
        loading:true
      }
    }
    render(){
      const loading = this.state.loading ? <div>加载中....</div> : <WrappedComponent {...this.props}/>
      return(
        { loading } 
      )
    }
    componentWillMount(){    
      axios.interceptors.response.use((response) => {
          this.setState({
            loading:false
          })
            return response;
        }, 
        (error) => {
          return Promise.reject(error);
        }
      )
    }
  }
}
十一、jquery实现懒加载

// 注意: 需要引入jQuery和underscore
$(function() {
    // 获取window的引用:
    var $window = $(window);
    // 获取包含data-src属性的img，并以jQuery对象存入数组:
    var lazyImgs = _.map($('img[data-src]').get(), function (i) {
        return $(i);
    });
    // 定义事件函数:
    var onScroll = function() {
        // 获取页面滚动的高度:
        var wtop = $window.scrollTop();
        // 判断是否还有未加载的img:
        if (lazyImgs.length > 0) {
            // 获取可视区域高度:
            var wheight = $window.height();
            // 存放待删除的索引:
            var loadedIndex = [];
            // 循环处理数组的每个img元素:
            _.each(lazyImgs, function ($i, index) {
                // 判断是否在可视范围内:
                if ($i.offset().top - wtop < wheight) {
                    // 设置src属性:
                    $i.attr('src', $i.attr('data-src'));
                    // 添加到待删除数组:
                    loadedIndex.unshift(index);
                }
            });
            // 删除已处理的对象:
            _.each(loadedIndex, function (index) {
                lazyImgs.splice(index, 1);
            });
        }
    };
    // 绑定事件:
    $window.scroll(onScroll);
    // 手动触发一次:
    onScroll();
十二、正则判断至少包括字母和数字

/^(?![A-Za-z]+$)(?![a-z0-9]+$)[A-Za-z0-9]{6,8}$/
//(?!pattern) 是负向先行断言，意思是若该位置后面匹配 pattern，则该位置不能匹配。
//[0-9a-z]+$ 即由数字和小写字母构成一个以上字符直到字符串尾。合起来就是字符串不能仅由小写字母和数字构成。
//同理 ?![A-Za-z]+$不全由字母组成。
//[A-Za-z0-9] {6,8} 由6-8位数字或大小写字母组成

//第二种
/^((?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*))[0-9A-Za-z]{6,8)$/
十三、javascript常用的方法

if (typeof myObj == 'undefined') {
var myObj = { };
}
//这是目前使用最广泛的判断javascript对象是否存在的方法。


$parent.find(‘.child')
//jquery中寻找dom最快的方法。

//下面这样的写法就是糟糕的写法：
$('#top').find('p.classA');
$('#top').find('p.classB');

//更好的写法是：

var cached = $('#top');
cached.find('p.classA');
cached.find(‘p.classB');

$('div').find('h3').eq(2).html('Hello');
//采用链式写法时，jQuery自动缓存每一步的结果，因此比非链式写法要快。根据测试，链式写法比（不使用缓存的）非链式写法，大约快了25%。

//获取深层次对象属性
function normalizeKeys(key) {
  if (key == null) return [];
  if (Array.isArray(key)) return key;
  return `${key}`.split('.').filter(Boolean);
}
function get(obj, objKey,def) {
  const keys = normalizeKeys(objKey);
  let res = obj;
  keys.every(key => {
    if (res && typeof res === 'object' && key in res) {
      res = res[key];
      return true;
    }
    res = def;
    return false;
  });
  return res;
}

//rem 适配
!(function(doc, win) {
  const docEle = doc.documentElement, // 获取html元素
  event = 'onorientationchange' in window ? 'orientationchange' : 'resize', // 判断是屏幕旋转还是resize;
  fn = function() {
    const width = docEle.clientWidth;
    width && (docEle.style.fontSize = 100 * (width / 750) + 'px'); // 设置html的fontSize，随着event的改变而改变。
  };
  win.addEventListener(event, fn, false);
  doc.addEventListener('DOMContentLoaded', fn, false);
}(document, window));

//判断系统
created(){
  //判断系统
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    this.system = 'Android';
  } else if (isIOS) {
    this.system = 'IOS';
  } else {
    this.system = 'pc';
  }
}


//检查chrome网站是否最小化
if(document.addEventListener){
  document.addEventListener('webkitvisibilitychange',function(){
  if(document.webkitVisibilityState==="hidden"){
  //操作
  // chrome网站最大化
  document.documentElement.webkitRequestFullscreen()
});

// 通过window.scrollTo写一个上下划动的动画
function scrollAnimation(currentY, targetY) {
  // const currentY = document.documentElement.scrollTop || document.body.scrollTop
  // 计算需要移动的距离
  let needScrollTop = targetY - currentY
  // console.log(needScrollTop)
  // let _currentY = currentY
  setTimeout(() => {
    if (needScrollTop > 10 || needScrollTop < -10) {
      // 一次调用滑动帧数，每次调用会不一样
      const dist = Math.ceil(needScrollTop / 10)
      currentY += dist
      window.scrollTo(0, currentY)
      scrollAnimation(currentY, targetY)
    } else {
      window.scrollTo(0, targetY)
    }
  }, 1)
}

//setStore
const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
* 获取localStorage
*/
const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
* 删除localStorage
*/
const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

/**
* 获取style样式
*/
const getStyle = (element, attr, NumberMode = 'int') => {
  let target;
  // scrollTop 获取方式不同，它不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop;
  }else if(element.currentStyle){
     target = element.currentStyle[attr];
  }else{
     target = document.defaultView.getComputedStyle(element,null)[attr];
  }
  //在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode == 'float'? parseFloat(target) : parseInt(target);
}

//防抖
function debounce (func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
//数组洗牌
function shuffle (arr) {
  let _arr = arr.slice(0)
  for (let i = 0; i < arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
 }
 return _arr
}

let vendor = (() => {
  // 定义游览器前缀
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  // 遍历前缀，如果游览器支持的话，就返回对应 key
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  // 如果都不支持，那肯定是有问题的，返回 false
  return false
})()

//设计样式
function prefixStyle (style) {
  if (vendor === false) {
    return false
  }
  // 如果 vendor 为标准，就不改变 style
  if (vendor === 'standard') {
    return style
  }

  // 否则返回 vender(也就是 webkit Moz O ms 中的一个) + 样式首字母大写
  // 例如：webkit + transform ---> webkitTransform
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

//添加class样式
function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
移动端兼容

//--苹果吸顶，给你需要吸顶的元素加上.headiOS,根据情况来设定css属性就可以了。
.headiOS{
  position: -webkit-sticky;
  position: sticky;
  top: 129px;
  left: 0;
  width: 100%;
  z-index: 5;
}
//--解决苹果滑动卡顿问题
-webkit-overflow-scrolling: touch;
//--弹框可以上下滑动，body不能上下滑动的问题
function stop() {
 document.body.style.overflow = 'hidden';
 document.body.style.height = '100%';
 document.documentElement.height = '100%';
 document.documentElement.overflow = 'hidden';
}
function move() {
 document.body.style.overflow = '';// 出现滚动条
 document.documentElement.style.overflow = '';
}
//--对iphonex布局适配方法
@ipx: ~"only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)";

// 对iphone x 做适配处理
.padding-top(@n) {
 padding-top: @n;
 @media @ipx {
 padding-top: @n + 44px;
  }
}

.padding-bottom(@n) {
 padding-bottom: @n;
 @media @ipx {
 padding-bottom: @n + 34px;
  }
}
//--吸顶时，高度塌陷问题
//android吸顶时，因为组件吸顶。在吸顶的一瞬间，下面高度直接顶上去。
//解决方法，在吸顶时为下面组件加一个padding-top,在没有吸顶时，把padding-top去掉。
js兼容总结

//1.滚动条兼容

let scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
let scrollTop = document.documentElement.scrollTop || dcoument.body.scrollTop;
//2.byClassName兼容

function byClassName(className){
	if(document.getElementsByClassName){
		return document.getElementsByClassName(className);
	}else{
		let arr = [];
		var ele = document.getElementsByTagName("*");
		for(var i = 0;i < ele.length;i ++){
			if(ele[i].className == className){
				arr.push(ele[i]);
			}
		}
		return arr;
	}
}
//3.获取class属性值的兼容

let className = oDiv.getAttribute("class") == null ? oDiv.getAttribute("className") : oDiv.getAttribute("class")
//4.获取事件对象的兼容

let e = evt || window.event;
//5.onkeypress获取键盘编码值的兼容

keyCode || charCode || which
//6.超链接默认行为的兼容

evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
//7.添加事件监听的兼容

function addEventListener(obj,event,fn,boo){
	obj.addEventListener ? obj.addEventListener(event,fn,boo) : obj.attachEvent("on" + event,fn);
}
//8.移除事件监听的兼容

function removeEventListener(obj,event,fn,boo){
	obj.removeEventListener ? obj.removeEventListener(event,fn,boo) : obj.detachEvent("on" + event,fn);
}
//9.阻止事件冒泡的兼容

evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
//10.创建ajax对象的兼容

let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
//11.获取事件源的兼容

let target = e.target || e.srcElement;
//12.获取非行内样式的兼容

function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,true)[attr];
}
react route4写法

//react router3的关键点

//集中式 router
//通过 <Route> 嵌套，实现 Layout 和 page 嵌套
//Layout 和 page 组件 是作为 router 的一部分
//这些在router4就不存在了，哪么router4怎么实现路由呢？

//两种方式：
//https://codesandbox.io/s/6n20nrzlxz
//第一种：在组件中实现路由

import React from 'react';
import { HashRouter as Router, Route, Link,Switch } from 'react-router-dom';
import Main from './main';
import About from './about';
import Topic from './topic';
export default class Home extends React.Component {
  render(){
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/topic'>Topic</Link>
            </li>
          </ul>
          <hr/>
          <Switch>
            <Route exact={true} path='/' component={Main}></Route>
            <Route path='/about' component={About}></Route>
            <Route path='/topic' component={Topic}></Route>
          </Switch>
        </div>
      </Router>
    )
  }
}
//这个方式有个总是就是路由分散到各个组件，不好管理。

//第二种：自定义一个路由组件来实现路由

import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './home';
import About from './about';
import Topic from './topic';
import Info from './info';
import Main from './main';
import NoMatch from './noMatch';
export default class Irouter extends React.Component{
  render(){
    return(
      <Router>
        <Home>
          <Switch>
            <Route  path='/main' render={()=>
              <Main>
                <Route path='/main/:value' component = {Info}></Route>
              </Main>
            }></Route>
            <Route path='/about' component={About}></Route>
            <Route path='/topic' component={Topic}></Route>
            <Route component={NoMatch}></Route>
          </Switch>
        </Home>
      </Router>
    )
  }
}

import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component{
  render(){
    return (
      <div>
        <ul>
          <li>
            <Link to="/main">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topic">Topic</Link>
          </li>
          <li>
            <Link to="/topic22">Topic22</Link>
          </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

import React from 'react';
import { Link } from 'react-router-dom'

export default class Main extends React.Component{
  render(){
    return (
    <div>
      <div>this is main</div>
      <Link to="/main/a">嵌套路由</Link>
      <hr/>
      {this.props.children}
    </div>
    )
  }
}
//如果需要实现嵌套路由的话，可以使用route 的render属性直接返回一个组件。

//注意：如果要实现嵌套路由，route不能精确匹配，即不能加exact属性。
//现在项目中一般会使用第二种方法，这样可以方便集中管理项目的路由
contextAPI与Portals的用法

//react 16.0之后的contextAPI用法

   const ThemeContext = React.createContext('light'); //默认值

   class App extends React.Component {
     render() {
      return (
        <ThemeContext.Provider value="dark"> //dark值
           <ThemedButton />
        </ThemeContext.Provider>
      )
     }
   }

   function ThemedButton(props) {
     return (
       <ThemeContext.Consumer>
          {theme=><Button {...props} theme={theme}/>} //theme从上面传下来的值。
       </ThemeContext.Consumer>
     )
   }
//点击按纽切换中英文。

const enString = {
  submit:"submit",
  cancel:"cancel"
}

const cnString = {
  submit:"提交",
  cancel:"取消"
}
const LocaleContext = React.createContext(enString);

class LocaleProvider extends Component {
  state = {locale:cnString};
  toggleLocale = () =>{
    const locale = 
     this.state.locale ===enString
     ? cnString
     : enString;
     this.setState({locale})
  };

  render(){
    return(
      <LocaleContext.Provider value={this.state.locle}>
        <button onClick={this.toggleLocale}>
        切换语言
        </button>
        {this.props.children}
      </LocaleContext.Provider>
    )
  }
}

class LocaledButtons extends Component {
  render(){
    return (
      <LocaleContext.Consumer>
        {
          locale => (
            <div>
              <button>{locale.cancel}</button>
              <button>{locale.submit}</button>
            </div>
          )
        }
      </LocaleContext.Consumer>
    )
  }
}

export default ()=>{
  <div>
    <LocaleProvider>
      <div>
      <br />
      <LocaledButtons/>
      </div>
    </LocaleProvider>
  </div>
}
//portals是在一个真实dom下建立一个dom节点，但虚拟dom结构还是当前结构，主要用于写弹窗组件。

PortalSample extends React.PureComponent {
  state = { visible: false };
  renderButton() {
    return (
      <Button type="primary" onClick={() => this.setState({ visible: true })}>
        打开对话框
      </Button>
    );
  }
  renderDialog() {
    return (
      <div className="portal-sample">
        <div>这是一个对话框！</div>
        <br />
        <Button
          type="primary"
          onClick={() => this.setState({ visible: false })}
        >
          关闭对话框
        </Button>
      </div>
    );
  }
  render() {
    if (!this.state.visible) return this.renderButton();
    return ReactDOM.createPortal(
      this.renderDialog(),
      document.getElementById("dialog-container"),
    );
  }
}
react常用场景实现方法

//一、按步骤注册

import React from "react";
import _ from "lodash";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Button, Steps, Form, Modal } from "antd";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

class App extends React.Component {
  state = {
    allValues: {},
  };

  pushUrl(path) {
    window.history.pushState(null, "", `/#${path}`);
    this.forceUpdate();
  }

  handleNext = () => {
    this.setState({
      allValues: {
        ...this.state.allValues,
        ...this.props.form.getFieldsValue(),
      },
    });
    const currentStep = this.getCurrentStep();
    if (currentStep < this.getSteps().length - 1) {
      this.pushUrl(this.getSteps()[currentStep + 1].path);
    } else {
      Modal.success({
        title: "提交成功",
      });
    }
  };
  handleBack = () => {
    console.log("form values: ", this.props.form.getFieldsValue());
    this.setState({
      allValues: {
        ...this.state.allValues,
        ...this.props.form.getFieldsValue(),
      },
    });
    const currentStep = this.getCurrentStep();
    if (currentStep > 0) {
      this.pushUrl(this.getSteps()[currentStep - 1].path);
    }
  };

  getCurrentStep() {
    const currentPath = document.location.hash.replace(/^#/, "");
    return _.findIndex(this.getSteps(), { path: currentPath });
  }

  getSteps() {
    return [
      { title: "验证邮件", path: "/wizard/step/1", component: Step1 },
      { title: "账号信息", path: "/wizard/step/2", component: Step2 },
      { title: "完成", path: "/wizard/step/3", component: Step3 },
    ];
  }
  renderComponent = () => {
    const StepComponent = this.getSteps()[this.getCurrentStep()].component;
    return (
      <StepComponent form={this.props.form} allValues={this.state.allValues} />
    );
  };
  render() {
    if (!/^#\/wizard\/step/.test(document.location.hash)) {
      return (
        <Button type="primary" onClick={() => this.pushUrl("/wizard/step/1")}>
          创建账号
        </Button>
      );
    }
    return (
      <Router>
        <Form>
          <div style={{ width: "600px" }}>
            <h1>创建账号</h1>
            <Steps current={this.getCurrentStep()}>
              {this.getSteps().map(step => <Steps.Step title={step.title} />)}
            </Steps>

            <div className="step-container" style={{ margin: "40px 0" }}>
              <Route
                path="/wizard/step/:stepId"
                render={this.renderComponent}
              />
            </div>
            <div>
              <Button
                disabled={this.getCurrentStep() === 0}
                onClick={this.handleBack}
                style={{ marginRight: "20px" }}
              >
                上一步
              </Button>

              <Button onClick={this.handleNext} type="primary">
                {this.getCurrentStep() === this.getSteps().length - 1
                  ? "完成"
                  : "下一步"}
              </Button>
            </div>
          </div>
        </Form>
      </Router>
    );
  }
}

export default Form.create()(App);
//二、拖拽

import React, { Component } from "react";
require("./DndSample.less");

const list = [];
for (let i = 0; i < 10; i++) {
  list.push(`Item${i+1}`);
}
const len = list.length;
const move = (arr, startIndex, toIndex) => {
  arr = arr.slice();
  arr.splice(toIndex, 0, arr.splice(startIndex, 1)[0]);
  return arr;
}
const lineHeight = 42;
export default class DndSample extends Component {
  constructor(props) {
    super(props);
    this.state.list = list;
  }
  state = {
    dragging: false,
    draggingIndex: -1,
    startPageY: 0,
    offsetPageY:0,
  };
  handleMounseDown = (evt, index) => {
    this.setState({
      dragging: true,
      startPageY: evt.pageY,
      currentPageY: evt.pageY,
      draggingIndex: index,
    });
  };
  handleMouseUp = () => {
    this.setState({ dragging: false, startPageY: 0, draggingIndex: -1});
  };
  handleMouseMove = evt => {
    let offset = evt.pageY - this.state.startPageY;
    const draggingIndex = this.state.draggingIndex;
    if(offset > lineHeight && draggingIndex < len-1){
      offset -= lineHeight;
      this.setState({
        list: move(this.state.list, draggingIndex, draggingIndex+1),
        draggingIndex: draggingIndex + 1,
        startPageY: this.state.startPageY + lineHeight,
      })
    } else if(offset < -lineHeight && draggingIndex > 0 ){
      offset += lineHeight;
      this.setState({
        list: move(this.state.list, draggingIndex, draggingIndex-1),
        draggingIndex: draggingIndex - 1,
        startPageY: this.state.startPageY - lineHeight,
      })
    }
    this.setState({offsetPageY: offset});
  }

  getDraggingStyle(index) {
    if(index !== this.state.draggingIndex) return {};
    return {
      backgroundColor: "#eee",
      transform: `translate(10px, ${this.state.offsetPageY}px)`,
      opacity: 0.5,
    }
  }

  render(){
    return(
      <div className="dnd-sample">
        <ul>
          {this.state.list.map((text, i) => (
            <li
              key={text}
              onMouseDown={evt => this.handleMounseDown(evt,i)}
              style={this.getDraggingStyle(i)}
              >
                {text}
            </li>
          ))}
        </ul>
        {this.state.dragging && (
          <div 
            className="dnd-sample-mask"
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
          />
        )}
      </div>
    )
  }

}


.dnd-sample ul {
  display: inline-block;
  margin: 0;
  padding: 0;
  background-color: #eee;
}

.dnd-sample li {
  cursor: default;
  list-style: none;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  margin: 0;
  width: 300px;
  background-color: #fff;
}

.dnd-sample-mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
}




setInterval的坏处


//原因之一：setInterval无视代码错误
function a() {
 try{
       a.error.here;
  }catch(e){
       $('body').append('<div>' + e.toString() + '</div>');
       throw e;}
}
function b() {
  try{
       b.error.here;
    }catch(e){
       $('body').append('<div>' + e.toString() + '</div>');
       throw e;}
    setTimeout(b, 2000);
}
setInterval(a, 2000);
setTimeout(b, 2000);
//原因之二：setInterval无视网络延迟
//假设你每隔一段时间就通过Ajax轮询一次服务器，看看有没有新数据（注意：如果你真的这么做了，那恐怕你做错了；建议使用“补偿性轮询”（backoff polling））。而由于某些原因（服务器过载、临时断网、流量剧增、用户带宽受限，等等），你的请求要花的时间远比你想象的要长。但setInterval不在乎。它仍然会按定时持续不断地触发请求，最终你的客户端网络队列会塞满Ajax调用。看示例

let n = 0, t = 0, u = 0, i, s = 'Stopping after 25 requests, to avoid killing jsfiddle’s server';
function a() {
  $.post('/ajax_html_echo/', function() {--n;});
  ++n;
  ++t;
  $('#reqs').html(n + ' a() requests in progress!');
  if (t > 25) {
    clearInterval(i);
    $('#reqs').html(s);
  }
}
function b() {
  ++u;
  $.post('/ajax_html_echo/', function() {
    $('#req2').html('b(): ' + new Date().toString());
    if (u <= 25) {
      setTimeout(b, 500);
    } else {
      $('#req2').html(s);}
  });
}
i = setInterval(a, 500);
setTimeout(b, 500);
//原因之三：setInterval不保证执行
//与setTimeout不同，你并不能保证到了时间间隔，代码就准能执行。如果你调用的函数需要花很长时间才能完成，那某些调用会被直接忽略。看示例

function slow() {
    $.ajax({
        url: '/echo/html/',
        async: false,
        data: {
            delay: 1
        },
        complete: function () {
            
        }
    });
    
    $('#reqs').text(~~((new Date() - start) / 100) + ' expected, ' + iters + ' actual');
    
    if (iters++ > 4) {
        $('#reqs').append('<br>Stopping after 5 iterations');
        clearInterval(iv);
    }
};

var iv = setInterval(slow, 100), start = +new Date(), iters = 0; 
//解决之道很简单：用setTimeout
//与其使用setInterval，不如在适当的时刻通过setTimeout来调用函数自身。在前面两个示例中，使用setInterval的函数a都出错了，而使用setTimeout的函数b则表现很好。
webpack设置dll

把依赖的库，先整体都不作处理地打包出来，剩余自己的app.js还是该怎么样怎么样，webpack给我们提供了这么个插件DllPlugin 新建一个配置文件，比如build/webpack.dll.conf.js

const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    vendor: ['vue','vue-router']
  },
  output: {
    path: path.join(__dirname, '../static'),
    filename: 'dll.[name].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../', '[name]-manifest.json'),
      name: '[name]'
    })
  ]
}
entry里就是先打包出来的库，output就是输出地址和名字，输出到static，因为原配置已经会把static里的内容直接复制到dist里，就不去折腾改其他地方了。 Dllplugin里的path，会输出一个vendor-manifest.json，这是用来做关联id的，打包的时候不会打包进去，所以不用放到static里 然后运行一下webpack -p --progress --config build/webpack.dll.conf.js 成功以后，static下会有dll.vendor.js，根目录下会有vendor.manifest.json 各自打开看一下，就会看到依赖库的源码和匹配id ok，到这里，抽离依赖库的事情就完成了，那么接下来问题就是怎么引用呢，怎么在dev和build跑呢？ 这里补了一点dll和commonsChunk概念上的区别，commonsChunk之所以慢和大，是因为每次run的时候，都会去做一次打包，而实际上我们不会一直去更新我们引用的依赖库，所以dll的做法就等于是，事先先打包好依赖库，然后只对每次都修改的js做打包。 继续刚才的步骤 修改build/webpack.base.conf.js，添加DllReferencePlugin的配置

const manifest = require('../vendor-manifest.json')
。。。。
plugins: [
    new webpack.DllReferencePlugin({
      manifest
    })
  ]
然后我们直接打开index.html，在底部加上<script src="./static/dll.vendor.js"></script> 是的，就是这么简单粗暴。 运行一下npm run dev,打开f12看看网络监控，一切顺利的话，这样就ok了




前端动画的实现
//通常在前端中，实现动画的方案主要有5种：

//javascript直接实现；
//CSS3 transition；
//CSS3 animation；
//Canvas动画；
//requestAnimationFrame；




//javascript 直接实现动画

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style type="text/css">
        #rect {
            width: 200px;
            height: 200px;
            background: #ccc;
        }
    </style>
</head>
<body>
    <div id="rect"></div>
    <script>
        let elem = document.getElementById('rect');
        let left = 0;
        let timer = setInterval(function(){
            if(left<window.innerWidth-200){
                elem.style.marginLeft = left+'px';
                left ++;
            }else {
                clearInterval(timer);
            }
        },16);
    </script>
</body>
</html>
//Jquery的animate()方法就是这种方式实现的。

//存在的问题

//javascript 实现动画通常会导致页面频繁性重排重绘，消耗性能，一般应该在桌面端浏览器。在移动端上使用会有明显的卡顿。

//Tip：为什么是16ms

//上面例子中，我们设置的setInterval时间间隔是16ms。一般认为人眼能辨识的流畅动画为每秒60帧，这里16ms比(1000ms/60)帧略小一些，但是一般可仍为该动画是流畅的。

//在很多移动端动画性能优化时，一般使用16ms来进行节流处理连续触发的浏览器事件。例如对touchmove、scroll事件进行节流等。通过这种方式减少持续事件的触发频率，可以大大提升动画的流畅性。





//CSS3 transition
//transition是过度动画。但是transition并不能实现独

 transition:  top 1500ms, opacity 1000ms 500ms;

//在移动端开发中，直接使用transition动画会让页面变慢甚至卡顿。所以我们通常添加transform:translate3D(0,0,0)或transform:translateZ(0)来开启移动端动画的GPU加速，让动画过程更加流畅。



//CSS3 animation
//animation 算是真正意义上的CSS3动画。通过对关键帧和循环次数的控制，页面标签元素会根据设定好的样式改变进行平滑过渡。而且关键帧状态的控制是通过百分比来控制的。



.bell{
      -webkit-animation: rotate .5s linear infinite;
      @-webkit-keyframes rotate{
       0%{-webkit-transform: rotate(0deg)}
       25%{-webkit-transform: rotate(-30deg)}
       50%{-webkit-transform: rotate(0deg)}
       75%{-webkit-transform: rotate(30deg)}
       100%{-webkit-transform: rotate(0deg)}
     }
    }


//CSS3最大的优势是摆脱了js的控制，并且能利用硬件加速以及实现复杂动画效果。



//Canvas动画
//canvas作为H5新增元素，是借助Web API来实现动画的。



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
    *{
        margin:0;
        padding:0;
    }
    </style>
</head>
<body>
    <canvas id="canvas" width="700" height="550"></canvas>
    <script type="text/javascript">
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let left = 0;
        let timer = setInterval(function(){
            ctx.clearRect(0,0,700,550);
            ctx.beginPath();
            ctx.fillStyle = "#ccc";
            ctx.fillRect(left,0,100,100);
            ctx.stroke();
            if(left>700){
                clearInterval(timer);
            }
            left += 1;
        },16);
    </script>
</body>
</html>


//注释：通过getContext()获取元素的绘制对象，通过clearRect不断清空画布并在新的位置上使用fillStyle绘制新矩形内容实现页面动画效果。

//Canvas主要优势是可以应对页面中多个动画元素渲染较慢的情况，完全通过javascript来渲染控制动画的执行。可用于实现较复杂动画。



//requestAnimationFrame


<!DOCTYPE html>
<html>
<head>
    <title></title>
    <style type="text/css">
        * {
            margin:0;
            padding:0;
        }
        div {
            width: 200px;
            height: 200px;
            background-color: #ccc;
        }
    </style>
</head>
<body>
    <div id="rect"></div>
    <script type="text/javascript">
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

    let elem = document.getElementById("rect");
    let left = 0;
    //自动执行持续性回调
    requestAnimationFrame(step);
    //持续该改变元素位置
    function step() {
        if(left<window.innerWidth-200){
            left+=1;
            elem.style.marginLeft = left+"px";
            requestAnimationFrame(step);
        }
    }
    </script>
</body>
</html>
//我们注意到，requestAnimationFrame只是将回调的方法传入到自身的参数中执行，而不是通过setInterval调用。





rxjs的一些理解


//RxJS 是一套藉由Observable sequences来组合非同步行为和事件基础程序的 Library！

//这也被称为 Functional Reactive Programming，更切确地说是指 Functional Programming 及 Reactive Programming 两个编程思想的结合。
let observable = Rx.Observable
    .create(function(observer) {
        observer.next('Jerry'); // RxJS 4.x 以前的版本用 onNext
        observer.next('Anna');
    })
// 订阅这个 observable  
observable.subscribe(function(value) {
    console.log(value);
})
//看到这里大家可以觉得rxjs应用的发布订阅模式，其实不一样。虽然他们的行为很像。



//发布订阅在内部会有一份订阅清单，在要发布通知时会对逐一的呼叫这份清单的监听者。

function Subscribe(){
  if(!(this instanceof Subscribe)){ //如果不是new的就报错
    throw new Error('请用 new Producer()!');
  }
  this.listeners = [];
}
Subscribe.prototype = {
  constructor:Subscribe,
  addListener:function(listener){
    if(typeof listener === 'function'){
      this.listeners.push(listener)
    }else {
      throw new Error('listener 必须是 function')
    }
  },
  removeListener:function(listener){
    this.listeners.splice(this.listeners.indexOf(listenr),1)
  },
  notify:function(message) {
    this.listeners.forEach(listener => {
        listener(message);
    });
  }
}

let mySubscribe = new Subscribe();
let listener1 = (message) => {console.log('listener1' + message)};
let listener2 = (message) => {console.log('listener2' + message)};

mySubscribe.addListener(listener1);
mySubscribe.notify('course');
mySubscribe.addListener(listener2);
mySubscribe.notify('course2');


//但在 Observable 不是这样实作的，在其内部并没有一份订阅者的清单。订阅 Observable 的行为比较像是执行一个物件的方法，并把资料传进这个方法中。类似于下面函数。

let observable = {
  subscribe(observer){
     observer.next(1234)
  }
}

observer1 = {
  next(message){
    console.log('observer1'+message);
  }
};

observer2 = {
  next(message){
    console.log('observer2'+message);
  }
}

observable.subscribe(observer1);
observable.subscribe(observer2);
//发布订阅模式，输出值与什么时候添加有关系，比如上面的例子， listener1打印2行，listener2只打印一行。 observable不一样，observer1和observr2是完全独立的，各自收各自的元素，都是从头收到尾。下面举例说明。

let source = Rx.Observable.interval(1000).take(3);

let observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
}

let observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
}

source.subscribe(observerA);
setTimeout(() => {
    source.subscribe(observerB);
}, 1000);
输出
// "A next: 0"
// "A next: 1"
// "B next: 0"
// "A next: 2"
// "A complete!"
// "B next: 1"
// "B next: 2"
// "B complete!"
//observable的operators与array的方法有很大的不同，主要表现两个方面

//一，延迟运算
//二，渐进式取值
//延迟运算


let source = Rx.Observable.from([1,2,3])
             .map(x=>x+1)

let array = [1,2,3].map(x=>x+1);
//source如果不订阅就不会触发运算，而array只要map就运算了。



//渐进式运算


let source = Rx.Observable.from([1,2,3])
             .filter(x=>x>1)
             .map(x=>x+1);
let array = [1,2,3].filter(x=>x>1)
            .map(x=>x+1)
//array的方法相信大家很清楚了，先通地filter返回一个数组[2,3]，在通过map返回结果[3,4]。

//observable不一样，是一个一个的求值，先求1,filter过滤掉了，在求2,没有过滤掉通过map返回3，同理求3返回4。有点像iterator一个一个的求值，大致过程如下面函数。

function IteratorFromArray(arr){
   this._array = arr;
   this._cursor = 0;
}
IteratorFromArray.prototype = {
  constructor:IteratorFromArray,
  next(){
    return this._cursor< this._array.length?
      { value:this._array[this._cursor++].value, done:false }:
      { done:true };
  },
  map(callback) {
    let iterator = new IteratorFromArray(this._array);
    return {
      next:()=>{
        const { done, value } = iterator.next();
        return {
          done: done,
          value: done? undefined : callback(value)
        }
      }
    }
  }
}

let myIterator = new IteratorFromArray([1,2,3]);
let newIterator = myIterator.map(x=>x+1);
console.log(newIterator.next());


//observable是同步还是异步主要看处理的是什么？

let observable = Rx.Observable
    .create(function(observer) {
        observer.next('Jerry'); // RxJS 4.x 以前的版本用 onNext
        observer.next('Anna');
    })

console.log('start');
observable.subscribe(function(value) {
    console.log(value);
});
console.log('end');
//输出
//start
// Jerry 
//Anna
// end
//上面就是同步的。

let observable = Rx.Observable
    .create(function(observer) {
        observer.next('Jerry'); 
        setTimeout(() => {
            observer.next('Anna');
        }, 30)
    })

console.log('start');
observable.subscribe(function(value) {
    console.log(value);
});
console.log('end');
//输出
//start
//Jerry
//end
//Anna
//打Anna就是异步的，因为Anna放在setTimeout中了。
