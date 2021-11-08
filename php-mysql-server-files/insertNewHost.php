<?php
	if(($_POST["user"]=="seti")&&($_POST["pass"]=="999orangePi999")){
		$cota=true;
		$sql="INSERT INTO hosty (host_nazw, ip, haslo, klauzura) VALUES ('".$_POST["host_nazw"]."', '".$_POST["ip"]."', '".$_POST["haslo"]."', '".$_POST["klauzu"]."');");
		include "database.php";
	}
?>
<form method="post">
user: <input name="user"><br>
haslo: <input name="pass"><br>
host: <input name="host_nazw"><br>
adres IP: <input name="ip"><br>
haslo dla hosta: <input name="haslo"><br>
klauzura (t/n):<input name="klauzura"><br>
</form>
