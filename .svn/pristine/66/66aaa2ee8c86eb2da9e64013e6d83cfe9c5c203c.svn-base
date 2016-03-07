//对话内容
var talkScript;
var talkScriptList;
//对话序号
var talkIndex = 0;
//对话中
var talking = false;

/**
 * 添加对话
 * */
function addTalk(){
	//如果对话内容为空，则开始判断是否可以对话
	if(talkScript == null){
		var key,tx = player.x,ty = player.y;
		switch (player.direction){
		case UP:
			ty -= STEP;
			break;
		case LEFT:
			tx -= STEP;
			break;
		case RIGHT:
			tx += STEP;
			break;
		case DOWN:
			ty += STEP;
			break;
		}
		for(key in charaLayer.childList){
			//判断前面又没有npc，有则开始对话
			if(charaLayer.childList[key].x == tx && charaLayer.childList[key].y == ty){
				if(talkScriptList["talk"+charaLayer.childList[key].index]){
					talkScript = talkScriptList["talk"+charaLayer.childList[key].index];
					talkIndex = 0;
				}
			}
		}
		//如果前方没有npc，则返回
		if(talkScript == null)return;
	}

	//将对话层清空
	talkLayer.removeAllChild();
	//当对话开始，且按照顺序进行对话
	if(talkIndex < talkScript.length - 1){
		//得到对话内容
		var talkObject = talkScript[talkIndex];
		//附录背景
		bitmapdata = new LBitmapData(imglist["appendix"]);
		bitmap = new LBitmap(bitmapdata);
		bitmap.x = 600;
		bitmap.y = 300;
		talkLayer.addChild(bitmap);
		//对话背景
		bitmapdata = new LBitmapData(imglist["talk"]);
		bitmap = new LBitmap(bitmapdata);
		bitmap.x = 450;
		bitmap.y = 20;
		talkLayer.addChild(bitmap);
		//对话头像
		bitmapdata = new LBitmapData(imglist[talkObject.img]);
		bitmap = new LBitmap(bitmapdata);
		bitmap.x = 10;
		bitmap.y = 20;
		talkLayer.addChild(bitmap);
		//对话人物名称
		var name = new LTextField();
		name.x = 540;
		name.y = 80;
		name.size = 15;
		name.font = "SimHei";
		name.color = "#FFFFFF";
		name.stroke = true;
		name.lineWidth = 1;
		name.text = "【 " + talkObject.name + " 】:";
		talkLayer.addChild(name);
		//对话内容
		var msg = new LTextField();
		msg.width = 520;
		msg.x = 540;
		msg.y = 110;
		msg.setWordWrap(true,25);
		msg.font = "SimHei";
		msg.size = 20;
		msg.color = "#FFFFFF";
		msg.stroke = true;
		msg.lineWidth = 1;
		msg.text = talkObject.msg;
		talkLayer.addChild(msg);
		//对话内容逐字显示
		msg.wind();
		//卡牌附录
		var msg = new LTextField(); 
		msg.width = 235;
		msg.x = 640;
		msg.y = 350;
		msg.setWordWrap(true,15);
		msg.font = "SimHei";
		msg.color = "#1F1810";
		msg.text = talkObject.ps;
		talkLayer.addChild(msg);
		//播放声音
		if(talkObject.vo != "null"){
			var vo = charaSound[talkObject.vo];
			vo.play();
		}
		talkLayer.x = 0;
		talkLayer.y = 0;
		talkIndex++;
	}else{
		var target = talkScript[talkScript.length - 1];
		var src = target.src;
		if(src != 'null')
			eval(src);
		//对话结束
		talkScript = null;
	}
}