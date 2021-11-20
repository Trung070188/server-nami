CREATE DATABASE IF NOT EXISTS patientsdb;

USE patientsdb;

DROP TABLE IF EXISTS patients;

CREATE TABLE patients
(
    id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) DEFAULT NULL,
    last_name  VARCHAR(255) DEFAULT NULL,
    email      VARCHAR(255) DEFAULT NULL,
    address    VARCHAR(255) DEFAULT NULL,
    diagnosis  VARCHAR(255) DEFAULT NULL,
    phone      VARCHAR(30)  DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_url  VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT UQ_Users_Email UNIQUE (email)
) AUTO_INCREMENT = 1;

DELIMITER //
BEGIN

    INSERT INTO patients(first_name, last_name, email, address, diagnosis, phone, image_url) VALUES (first_name, last_name, email, address, diagnosis, phone, image_url);

    SET @PATIENT_ID = LAST_INSERT_ID();

    SELECT * FROM patients WHERE id=@PATIENT_ID;

END //
DELIMITER ;
