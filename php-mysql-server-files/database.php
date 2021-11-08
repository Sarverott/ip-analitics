<?php
$crash='<?xml version="1.0" encoding="iso-8859-1"?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"><head><title>404 - Not Found</title></head><body><h1>404 - Not Found</h1></body></html>';
if($cota){
	$conn = new mysqli("localhost", "root", "dietpi", "minikron");
	
	if ($conn->connect_error) {
		$myfile = fopen("error_register.txt", "a+") or echo "console.log('Unable to open error raport file! Something gone wrong!!!');";
		fwrite($myfile, "(".date("y-m-d h:i:sa").")('".$_SERVER['PHP_SELF']."'-'".$_SERVER['HTTP_CLIENT_IP']."')error in conection with database! (".$conn->connect_error;.") QUERY: (".$sql.")";
		fclose($myfile);
	}
	$result = $conn->query($sql);
	$conn->close();
	return $result;
}else{
	echo $crash;
	exit();
}
?>