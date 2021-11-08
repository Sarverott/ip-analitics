START TRANSACTION;
	CREATE DATABASE minikron;
	USE minikron;
	CREATE TABLE hosty (
		id_h int NOT NULL AUTO_INCREMENT,
		host_nazw varchar(255),
		ip varchar(15) NOT NULL,
		haslo varchar(16) NOT NULL,
		klauzura boolean,
		CHECK(LEN(haslo)=16),
		PRIMARY KEY (id_h)
	);
	/* przy każdym nowym rekordzie tabeli hosty */
	CREATE TABLE host_logi (
		id_l int NOT NULL AUTO_INCREMENT,
		hos_ID int NOT NULL,
		ip varchar(15),
		data_wys datetime NOT NULL,
		PRIMARY KEY (id_l),
		FOREIGN KEY (hos_ID) REFERENCES hosty(id_h)
	);
COMMIT;
