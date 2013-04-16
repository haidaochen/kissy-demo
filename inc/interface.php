<?php
include("conn.php");
include("common.php");


function Response($status,$msg,$data,$code=''){
	$result = array(
		"status" => $status,
		"message" => $msg,
		"data" => $data,
		"code" => $code
	);
	return $result;
}


function getRandStr($len){
	$str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	$output = "";
	for ($i=0; $i<$len; $i++){ 
		$output .= $str{mt_rand(0, 52)};
	}  
	return $output;  
}


function getID(){
	global $db;
	
	$id = getRandStr(6);	
	$demo = $db->getRow("select id from demo where id='{$id}'");
	if($demo){
		return getID();
	}else{
		return $id;
	}
}



//添加demo
function addDemo($module,$intro,$version,$html,$js,$css,$author){
	global $db;

	if($module==""){
		return Response(true,"请选择demo对应的模块",null);
	}
	
	if($intro==""){
		//描述可以为空
	}
	
	if(!preg_match ("/^\d{1}\.\d{1}\.\d{1}$/",$version)){
		return Response(true,"请选择demo适合的版本,例如1.3.0",null);
	}
	
	if($html==""){
		return Response(true,"请输入demo内容",null);
	}
	
	$result = $db->autoExecute("demo",array(
		"id"		=> getID(),
		"module"	=> $module,
		"intro"		=>$intro,
		"version"	=> $version,
		"html"		=> $html,
		"js"		=> $js,
		"css"		=> $css,
		"author"	=> $author
	),1);
	
	if($result){
		return Response(true,"success",null);
	}else{
		return Response(false,"添加成功",null);
	}
	
}


//修改
function editDemo($id,$module,$intro,$version,$html,$js,$css,$author){
	global $db;
	
	if($id==""){
		return Response(true,"请带上要修改demo的id",null);
	}
	
	if($module==""){
		return Response(true,"请选择demo对应的模块",null);
	}
	
	if($intro==""){
		//描述可以为空
	}
	
	if(!preg_match ("/^\d{1}\.\d{1}\.\d{1}$/",$version)){
		return Response(true,"请选择demo适合的版本,例如1.3.0",null);
	}
	
	if($html==""){
		return Response(true,"请输入demo内容",null);
	}
	
	$result = $db->autoExecute("demo",array(
		"module"		=> $module,
		"intro"		=>$intro,
		"version"	=> $version,
		"html"		=> $html,
		"js"		=> $js,
		"css"		=> $css,
		"author"	=> $author
	),2,"  id='{$id}' ");
	
	if($result){
		return Response(true,"success",null);
	}else{
		return Response(false,"修改成功",null);
	}
	
}



//删除任务
function delDemo($id){
	global $db;
	if($id==""){
		return Response(true,"要删除的ID错误",null);
	}

	$result = $db->execute("delete from demo WHERE id = '{$id}' ");
	if($result){
		return Response(true,"操作成功",null);
	}else{
		return Response(false,"操作失败",null);
	}
	
	
}

//demo详情 
function demoDetail($id){
	global $db;
	
	if($id==""){
		return Response(true,"没有demo对应的id",null);
	}

	$demo = $db->getRow("SELECT * from demo where id='{$id}'");
	
	if($demo){
		return Response(true,"获取任务详情成功",$demo);
	}else{
		return Response(false,"获取任务详情失败",null);
	}
}

//获取某个分类下的demo
function demoList($module){
	global $db;
	
	if($module==""){
		return Response(true,"请输入你要查找的路径",null);
	}

	$list = $db->getAll("SELECT * from demo where module='{$module}'");
	
	if($list){
		return Response(true,"获取demo成功",$list);
	}else{
		return Response(false,"获取demo失败",null);
	}
}


?>