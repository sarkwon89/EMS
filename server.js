var mysql = require("mysql");


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "ems_db"
});


//create department, employee or role 

function createDepartment (thirdResponse){
    console.log("Inserting a new department...\n");
    var query = connection.query(
      "INSERT INTO department SET ?",
      {
        departmentName: thirddResponse.addDepartment
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " items inserted!\n");
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
}

//function to create role
function createRole (thirdResponse){
    console.log("Inserting a new role...\n");
    var query = connection.query(
      "INSERT INTO roles SET ?",
      {
        role_title: thirdResponse.addRole
      },
      {
        salary: thirdResponse.addSalary
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " items inserted!\n");
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
}

//function to create employee
function createEmployee (thirdResponse){
    console.log("Inserting a new role...\n");
    var query = connection.query(
      "INSERT INTO roles SET ?",
      {
        first_name: thirdResponse.addFirst
      },
      {
        last_name: secondResponse.addSecond
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " items inserted!\n");
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
}




//exporing the createitem function
exports.createDepartment = createDepartment;
exports.createRole = createRole;
exports.createEmployee = createEmployee;