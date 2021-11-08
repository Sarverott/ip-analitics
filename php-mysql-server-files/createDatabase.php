<?php
	$cota=true;
	include("database.php");
	
	databaza_sett("CREATE DATABASE minikron;
USE minikron;
CREATE TABLE hosty (
    ID int NOT NULL AUTO_INCREMENT,
    host_nazw varchar(255),
    ip varchar(15) NOT NULL,
    haslo varchar(16) NOT NULL,
	klauzura boolean,
	CHECK(LEN(haslo)=16)
);
/* przy każdym nowym rekordzie tabeli hosty */
CREATE TABLE host_logi (
    ID int NOT NULL AUTO_INCREMENT,
	hos_ID int NOT NULL,
    ip varchar(15),
	dzien DATE DEFAULT GETDATE(),
    PRIMARY KEY (ID)
);");
	
?>
