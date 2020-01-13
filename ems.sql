DROP DATABASE IF EXISTS ems_db;

CREATE DATABASE ems_db;

USE ems_db;

CREATE TABLE department(
    d_id INT AUTO_INCREMENT PRIMARY KEY,
    departmentName VARCHAR(30)
);


CREATE TABLE roles(
    r_id INT AUTO_INCREMENT PRIMARY KEY, 
    role_title VARCHAR(30) NOT NULL,
    salary DECIMAL (6,2) NOT NULL,
    department_id INT,
    -- which variable do you want to make FK then reference primary key of a particular table
    FOREIGN KEY (department_id) REFERENCES department(d_id)
);


CREATE TABLE employee(
    e_id INT AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(r_id),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(e_id)
);
