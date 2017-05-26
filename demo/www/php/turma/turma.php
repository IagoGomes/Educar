<?php
	$id = intval($_GET['id']);

        $con = mysqli_connect('siac.uesb.br', 'educar','educar123', 'educar');

	if(!$con){
		die('Não foi possível estabelecer conexão com o DB: '.mysqli_error($con));
	} 

	mysqli_select_db($con, "ajax_demo");

	$sql = "SELECT * FROM Turma WHERE id='".$id."'";

	$result = mysqli_query($con, $sql) or die(mysql_error());

        echo "<p> OI </p>";

	mysqli_close($con);

?>
