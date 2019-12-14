<?php
$host = 'infor02-database.ccvjtrfcqysq.us-east-1.rds.amazonaws.com';
$username = 'admin';
$pass = 'infor02admin';
$db_name = 'infor02';

$connect = new mysqli($host,$username,$pass,$db_name);
  //echo "<script>console.log($connect);</script>";
  //if(!$connect){
//	echo "Error: Unable to connect to MySQL.".PHP_EOL;
// 	echo "Debugging errno: ".mysqli_connect_errno().PHP_EOL;
//	echo "Debugging error: ".mysqli_connect_error().PHP_EOL;
//	exit;
//  }
  //if($connect->connect_error){
  //	die('Connection error : '.$connect->connect_error);
  //}
?>
