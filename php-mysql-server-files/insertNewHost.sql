<?php
	if(($_POST["user"]=="seti")&&($_POST["pass"]=="999orangePi999")){
		$cota=true;
		include("database.php");
		databaza_sett("INSERT INTO hosty (host_nazw, ip, haslo, klauzura) VALUES ('".$_POST["host_nazw"]."', '".$_POST["ip"]."', '".$_POST["haslo"]."', ".$_POST["klauzu"].");");
	}

?>
