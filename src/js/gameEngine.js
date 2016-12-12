//游戏引擎
//控制游戏进程:游戏加载,游戏开始,游戏过程,游戏结束,发射子弹,创建敌机,碰撞检测,记录分数

var gameEngine ={
	ele: null, //游戏区域
	bullets : {}, //游戏区域中所有发射的子弹
	enemys : {}, //游戏区域中所有的敌机
	isCrashMyPlane : false, //检测本飞机是否发生碰撞
	scroeNode : null, //记录分数的Div
	
	//初始的方法
	init : function(){
		this.ele =document.getElementById("mainBox");
		return this;
	},
	
	//开始游戏
	start : function(){
		//加载游戏
		gameEngine.loading(function(){
			//1.创建本方飞机并发射子弹
			myPlane.init().fire();
			//2.键盘监听
			gameEngine.keyListening();
			//3.创建敌机
			gameEngine.createEnemy();
			//4.碰撞检测
			gameEngine.crashListening();
			//5.记录分数
			gameEngine.showScore();
			//6.背景移动
			gameEngine.move();
			
		})
	},
	
	//加载页面
	loading : function(loadcallback){
		//创建飞机大战logo
		var logo =document.createElement("div");
		logo.className ="logo";
		gameEngine.ele.appendChild(logo);
		//创建进度条飞机
		var loading = document.createElement("div");
		loading.className = "loadImg";
		gameEngine.ele.appendChild(loading);
		
		//进度条
		var index = 0;
		var loadImgs =["loading1.png","loading2.png","loading3.png"];
		
		var loadTimer = setInterval(function(){
			console.log(index);
			if(index > 2){
				clearInterval(loadTimer);
				gameEngine.ele.removeChild(logo);
				gameEngine.ele.removeChild(loading);
				
				//回调
				loadcallback();
				
			}else{
				loading.style.background = "url(img/"+ loadImgs[index] +")";
				index++;
			}
		},500);
	},
	
	//键盘监听
	keyListening : function(){
		//设置初始速度
		var speedX = 0; 
		var speedY = 0;
		//按下
		window.onkeydown = function(evt){
			var oEvent = evt || event;
			var keycode = oEvent.keyCode;
			if(keycode == 37){
				speedX = -10;
			}
			if(keycode == 39){
				speedX = 10;
			}
			if(keycode == 38){
				speedY = -10;
			}
			if(keycode == 40){
				speedY = 10;
			}
		}
		
		//放开
		window.onkeyup = function(){
			speedX = 0;
			speedY = 0;
		}
		
		//每隔30毫秒
		setInterval(function(){
			var x = myPlane.ele.offsetLeft + speedX ;
			var y = myPlane.ele.offsetTop +speedY;
			
			//检测是否到左右边界
			if(myPlane.ele.offsetLeft < 0){
				x = 0;
			}else if(myPlane.ele.offsetLeft > gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth){
				x = gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth;
			}
			
			//检测是否到上下边界
			if(myPlane.ele.offsetTop < 0){
				y = 0;
			}else if(myPlane.ele.offsetTop > gameEngine.ele.offsetHeight - myPlane.ele.offsetHeight){
				y =  gameEngine.ele.offsetHeight - myPlane.ele.offsetHeight;
			}
			
			myPlane.ele.style.left = x +"px";
			myPlane.ele.style.top = y +"px";
		},30);
	},
	
	//创建敌机
	createEnemy : function(){
		//随机出现大型敌机
		setInterval(createBig,3000);
		function createBig(){
			//每3秒     30%几率出现大型敌机
			var flag = Math.random() > 0.7 ? true : false;
			
			if(flag){
				//大型敌机对象
				var big = new Enemy(Enemy.prototype.Enemy_Type_Large);
				//调用初始化方法 和 移动
				big.init().move();	
			}
		}
		
		//随机出现中型敌机
		setInterval(createMiddle,1000);
		function createMiddle(){
			//每1秒     30%几率出现中型敌机
			var flag = Math.random() > 0.7 ? true : false;
			
			if(flag){
				//中型敌机对象
				var middle = new Enemy(Enemy.prototype.Enemy_Type_Middle);
				//调用初始化方法 和 移动
				middle.init().move();			
			}
		}
		
		//随机出现小型敌机
		setInterval(createSmall,500);
		function createSmall(){
			//每半秒     50%几率出现小型敌机
			var flag = Math.random() > 0.5 ? true : false;
			
			if(flag){
				//小型敌机对象
				var small = new Enemy(Enemy.prototype.Enemy_Type_Small);
				//调用初始化方法 和 移动
				small.init().move();			
			}
		}
	},
	
	//碰撞检测
	crashListening : function(){
		setInterval(function(){
			
			
			for(var i in gameEngine.enemys){
				//游戏区域所有的敌机  和 所有的 子弹 进行碰撞检测
				for(var j in gameEngine.bullets){
					if(isCarsh(gameEngine.enemys[i].ele,gameEngine.bullets[j].ele)){
						//发生碰撞,调用子弹类 的 爆炸方法
						gameEngine.bullets[j].boom();
						//删除
						delete gameEngine.bullets[j];
						//调用敌机类  少一滴血的方法
						gameEngine.enemys[i].hurt();
					}
				}
				
				//游戏区域所有的敌机  和 我的飞机 进行碰撞检测
				
				if(!gameEngine.isCrashMyPlane && isCarsh(gameEngine.enemys[i].ele,myPlane.ele)){
					gameEngine.isCrashMyPlane = true;
					myPlane.boom(function(){
						alert("游戏结束!\n"+"你的分数为:"+gameEngine.scoreNode.innerHTML);
						//重新加载页面
						location.reload();
					});
				}
				
			}
		},30);
	},
	
	//显示分数
	showScore : function(){
		this.scoreNode = document.createElement("div");
		this.scoreNode.className ="score";
		this.scoreNode.innerHTML = "0";
		gameEngine.ele.appendChild(this.scoreNode);
	},
	
	//背景图移动
	move : function(){
		var y = 0;
		setInterval(function(){
			gameEngine.ele.style.backgroundPositionY =   y++ +  "px";
		},30);
	}
	
}
