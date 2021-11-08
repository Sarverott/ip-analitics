<?php
	header("Content-Type: text/javascript; charset=UTF-8");
	$conn = new mysqli("localhost", "root", "dietpi", "minikron");
	
	if ($conn->connect_error) {
		echo $conn->connect_error;
		$myfile = fopen("error_register.txt", "a+") or echo "console.log('Unable to open error raport file! Something gone wrong!!!');";
		fwrite($myfile, "(".date("y-m-d h:i:sa").")('".$_SERVER['PHP_SELF']."'-'".$_SERVER['HTTP_CLIENT_IP']."')error in conection with database! (".$conn->connect_error;.") QUERY: (".$sql.")";
		fclose($myfile);
	}
	$sql="SELECT h.host_nazw AS 'host_nazw', h.ip AS 'ip' FROM hosty h";
	$result = $conn->query($sql);
	$conn->close();
	echo "hostList=".json_encode($result->fetch_all(MYSQLI_ASSOC)).";";
		
	
?>