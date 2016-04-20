/**
 * aqiData，存储用户输入的空气指数数据
 * var aqiData = 
	"北京": 90,
    "上海": 40,    
};
*/

var aqiData = {};
var    cityReg = /^[\u4e00-\u9faa5a-zA-z]+$/i;// ^[\u4E00-\u9FA5]+$匹配简体中文
var    numReg = /^[1-9]+$/i;
var    cityInput = document.getElementById("aqi-city-input");
var    valueInput = document.getElementById("aqi-value-input");
var    addBtn = document.getElementById("add-btn");
var    getTable = document.getElementById("aqi-table");

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	if(!cityInput.value.match(cityReg)){
		window.alert("input city name");
	}
	else if( !valueInput.value.match(numReg)){
		window.alert("input city value");
	}
	else{
	    var city_name=cityInput.value;
        var city_value=valueInput.value;    
    	aqiData[city_name] = city_value;
    	for(var varel in aqiData)
    	  window.alert(varel);
       }
}

/**
 * 渲染aqi-table表格
 */
var num=0;
var flag=0;
function renderAqiList() {
	
		if(flag){
			getTable.innerHTML="";
		}else{
		    if(!num){
			    getTable.innerHTML = "<th><td>城市</td><td>空气质量</td><td>操作</td></th>";
			    window.alert(getTable.innerHTML);
		    }
   
           getTable.innerHTML+="<tr><td>"+cityInput.value+"</td><td>"+valueInput.value+"</td><td><button>删除</button></td></tr>";
	    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  flag=0;
  addAqiData();
  renderAqiList();
  num++;
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  flag=1;
  this.parentElement.parentElement.innerHTML="";
  num--;
  if(!num)
    renderAqiList();
}

function addEvent(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        }
function delegateEvent(element, tag, eventName, listener) {
            addEvent(element, eventName, function () {
                var event = arguments[0] || window.event,
                    target = event.target || event.srcElement;
                if (target && target.tagName === tag.toUpperCase()) {
                    listener.call(target, event);
                }
            });
        }

function init() {
     // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
            addEvent(addBtn, "click", addBtnHandle);
            // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
            delegateEvent(getTable, "button", "click", delBtnHandle);
}
init();