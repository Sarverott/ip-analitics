<h1><a href="./">BACK</a></h1>
<br/>
<br/>
<table border="1">
	<tr>
		<th>ścieżka requesta</th>
		<th>ilość requestów</th>
	</tr>
<?php
$servername="localhost";
$username="root";
$password="dietpi";
$dbname="minikron";
$ret="";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: ".$conn->connect_error);
} 

$sql="SELECT error_text, count(id) AS 'ilosc'
FROM error 
WHERE NOT (
    error_text LIKE '::OK::%'
    OR error_text='::WRONG_DATA::'
    OR error_text='no login data'
    OR error_text='no user or wrong data'
    OR error_text='::NO_DATA:: - /')
Group By error_text 
ORDER BY count(id) desc";
$result=$conn->query($sql);

if ($result->num_rows>0) {
    // output data of each row
    while($row=$result->fetch_assoc()){
        $ret.='<tr><td>'.substr($row["error_text"], 22)."</td><td><b>".$row["ilosc"]."</b></td></tr>";
    }
} else {
    echo "0 results";
}
$conn->close();
echo $ret;
?>
</table>