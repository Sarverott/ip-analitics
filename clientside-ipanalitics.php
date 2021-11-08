<?php
try{
	if(!isset($_COOKIE["ip_analitics-sarverott"])) {
		$user="sarverott.tumblr.com";
		$pass="qwerty12345678AS";
		setcookie("ip_analitics-sarverott", "...LOOK AT ME!");
		$ip = $_SERVER['REMOTE_ADDR'];
//server address
		$url = 'http://[censored]/ipanalitics?host='.urlencode($user).'&pass='.urlencode($pass).'&ip='.urlencode($ip);
//create query
		$ch = curl_init();
//query options
		echo "<!-- IT IS ";
		curl_setopt($ch,CURLOPT_URL,$url);
		$result = curl_exec($ch);
		if($result!="OK"){
			$file= @fopen("count.dat", "c+");
			fscanf($file, "%d", $count);
			$count++;
			rewind($file);
			fputs($file, $count);
			fclose($file);
		}
		echo " BRO IN HERE-->";
	}
}catch (Exception $e){
	echo "<!-- problem?!? -->";
}
?>
