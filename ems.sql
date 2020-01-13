DROP DATABASE IF EXISTS ems_db;
​
CREATE DATABASE ems_db;
​
USE ems_db;

CREATE TABLE department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    departmentName VARCHAR(30), 
)





CREATE TABLE roles(
    id INT AUTO_INCREMENT PRIMARY KEY, 
    role_title VARCHAR(30),
    salary DECIMAL (6,2)
    department_id 
)





CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    manager_id 
)


