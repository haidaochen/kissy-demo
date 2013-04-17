<?php
// session_start();
// date_default_timezone_set('Asia/Shanghai');
// header("Content-Type:text/html;charset=utf-8");
include("config.php");
include("db.php");

$db = new SimpleDB($GLOBALS['db_host'],$GLOBALS['db_user'],$GLOBALS['db_pwd'],$GLOBALS['db_name']);