
//碰撞检测

function isCarsh(obj1,obj2){
	
	//对象1的上下左右边界
	var t1 = obj1.offsetTop;
	var b1 = obj1.offsetTop + obj1.offsetHeight;
	var l1 = obj1.offsetLeft;
	var r1 =obj1.offsetLeft + obj1.offsetWidth;
	
	//对象2的上下左右边界
	var t2 = obj2.offsetTop;
	var b2 = obj2.offsetTop + obj2.offsetHeight;
	var l2 = obj2.offsetLeft;
	var r2 = obj2.offsetLeft + obj2.offsetWidth;
	
	//判断是否碰撞
	/*1.对象1的上边界 大于 对象2 的下边界
	 *2.对象1的下边界小于 对象2 的上边界
	 *3.对象1的左边界大于 对象2 的右边界
	 *4.对象1的右边界 小于对象2的左边界
	 */
	if(t1 > b2 || b1 < t2 || l1 > r2 || r1 < l2){
		return false;
	}else{
		return true;
	}
}
