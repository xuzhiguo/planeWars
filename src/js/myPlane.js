//我方飞机

var myPlane = {
	//属性
	ele: null,
	fireInterval: 80, //子弹发射频率
	
	
	//初始化
	init:function(){
		this.ele =document.createElement("div");//创建飞机
		this.ele.className ="myPhane";
		gameEngine.ele.appendChild(this.ele);
		
		//位置:
		this.ele.style.left = (gameEngine.ele.offsetWidth - this.ele.offsetWidth) / 2 + "px";
		//this.ele.style.top = gameEngine.ele.offsetHeight - this.ele.offsetHeight + "px";
		this.ele.style.bottom = 0;
		
		//飞机拖拽
		this.startDrag();
		
		return this;
	},
	
	//发射子弹
	fire : function(){
		this.timer = setInterval(function(){
			//创建子弹并发射
			var bullet = new Bullet(); //实例化子弹对象
			bullet.init().move(); //初始化子弹对象并发射
		},this.fireInterval)
	},
	
	
	//飞机拖拽
	startDrag : function(){
		this.ele.onmousedown = function(evt){
			var oEvent = evt || event;
			var divX = oEvent.offsetX;
			var divY = oEvent.offsetY;
			
			document.onmousemove = function(evt){
				var oEvent = evt || event;
				var x = oEvent.clientX - gameEngine.ele.offsetLeft - divX;
				var y =oEvent.clientY -divY;
				
				if(x < 0){  //移出游戏区域左边界时
					x = 0;
				}else if(x > gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth){
					//移出游戏区域右边界时
					x = gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth;
				}
				
				if(y < 0){
					//移出游戏区域上边界时
					y = 0;
				}else if(y > gameEngine.ele.offsetHeight - myPlane.ele.offsetHeight){
					y = gameEngine.ele.offsetHeight - myPlane.ele.offsetHeight;
				}
				
				myPlane.ele.style.left = x +"px";
				myPlane.ele.style.top = y + "px";
				
			}
			
			document.onmouseup =function(){
				document.onmousemove = null;
				document.onmouseup = null;
			}
		}
	},
	
	//飞机爆炸
	boom: function(callback){
		var self = this;
		clearInterval(this.timer); //清除发射子弹的定时器
		var index = 0;
		//飞机爆炸过程图片的数组
		var dieImgs =["img/me_die1.png","img/me_die2.png","img/me_die3.png","img/me_die4.png"];
		var dieTimer = setInterval(function(){
			if(index > dieImgs.length){
				clearInterval(dieTimer);
				gameEngine.ele.removeChild(self.ele);
				callback(); //回调
				
				return;//跳出
			}
			
				myPlane.ele.style.background = "url("+dieImgs[index]+")";
			
			index++;
		},50)
	}
	
	
}
