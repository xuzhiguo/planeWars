//敌机
//type 战机类型  大 中 小
function Enemy(type){
	this.ele =document.createElement("div");
	this.hp = 0; //血量
	this.speed = 0;//速度
	this.scroe =0;//分数
	this.dieImgs =[];//爆炸时的状态
	//当前敌机在gameEngine.enemys中的对象
	this.id = parseInt(Math.random()*100000) +"";
	
	//初始化
	this.init = function(){
		switch(type){
			//大型敌机
			case this.Enemy_Type_Large :
			console.log("大型机");
			this.ele.className ="EnemyLarge";
			this.hp = this.Enemy_Hp_Large;
			this.speed = this.Enemy_Speed_Large;
			this.dieImgs = ["plane3_die1.png","plane3_die2.png","plane3_die3.png","plane3_die4.png","plane3_die5.png","plane3_die6.png"],
			this.scroe = 30;
			break;
			//中型敌机
			case this.Enemy_Type_Middle :
			
			this.ele.className ="EnemyMiddle";
			this.hp = this.Enemy_Hp_Middle;
			this.speed = this.Enemy_Speed_Middle;
			this.dieImgs = ["plane2_die1.png","plane2_die2.png","plane2_die3.png","plane2_die4.png"],
			this.scroe = 20;
			break;
			//小型敌机
			case this.Enemy_Type_Small :
			
			this.ele.className ="EnemySmall";
			this.hp = this.Enemy_Hp_Small;
			this.speed = this.Enemy_Speed_Small;
			this.dieImgs = ["plane1_die1.png","plane1_die2.png","plane1_die3.png"],
			this.scroe = 10;
			break;
			
		}
		
		//插入敌机
		gameEngine.ele.appendChild(this.ele);
		gameEngine.enemys[this.id] = this;
		
		//位置
		var left = Math.random()*(gameEngine.ele.offsetWidth - this.ele.offsetWidth);
		this.ele.style.left = left +"px";
		this.ele.style.top = -300 +"px";
		return this;
	},
	
	//敌机移动的方法(向下移动)
	this.move = function(){
		var self = this;
		this.timer = setInterval(function(){
			if(self.ele.offsetTop > gameEngine.ele.offsetHeight){
				clearInterval(self.timer);
				gameEngine.ele.removeChild(self.ele);
				delete gameEngine.enemys[self.id];
			}else{
				self.ele.style.top = self.ele.offsetTop + self.speed + "px";
			}
		},30)
	},
	
	//飞机爆炸
	this.boom = function(){
		var self = this;
		clearInterval(this.timer);
		var index =0;
		var dieTimer = setInterval(function(){
			if(index >= self.dieImgs.length){
				clearInterval(dieTimer);
				gameEngine.ele.removeChild(self.ele);
				delete gameEngine.enemys[self.id];
			}else{
				self.ele.style.background = "url(img/"+ self.dieImgs[index] +")";
				index++;
			}
		},50);
	},
	
	//失去一滴血血量    敌机爆炸加分
	this.hurt = function(){
		this.hp--;
		if(this.hp == 0){
			this.boom();
			gameEngine.scoreNode.innerHTML = (gameEngine.scoreNode.innerHTML-0)+ this.scroe;
		}
	}
}

Enemy.prototype ={
	Enemy_Type_Large : 1,  //大型敌机
	Enemy_Type_Middle : 2, //中型敌机
	Enemy_Type_Small : 3,  //小型敌机
	
	Enemy_Hp_Large : 8, //大型敌机血量
	Enemy_Hp_Middle : 4, //中型敌机血量
	Enemy_Hp_Small : 1,
	
	Enemy_Speed_Large : 2, //大型敌机的速度
	Enemy_Speed_Middle : 4, //中型敌机的速度
	Enemy_Speed_Small : 8, //小型敌机的速度
}
