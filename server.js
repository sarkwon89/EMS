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


// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId);
//   });

//create department, employee or role 

function createDepartment (thirdResponse){
    console.log("Inserting a new department...\n");
    console.log(thirdResponse)
    var query = connection.query(
      "INSERT INTO department SET ?",
      {
        departmentName: thirdResponse.addDepartment
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " items inserted!\n");
      }
    );
  
    //logs the actual query being run
    console.log(query.sql);
}

//function to create role
function createRole (thirdResponse){
    console.log("Inserting a new role...\n");
    var query = connection.query(
      "INSERT INTO roles SET ?",
      {
        role_title: thirdResponse.addRole,
        salary: thirdResponse.addSalary,
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
        first_name: thirdResponse.addFirst,
        last_name: thirdResponse.addSecond
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " items inserted!\n");
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
}

function viewDepartment(){
    console.log("Selecting all department...\n");
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
    //   connection.end();
    });
};

function viewRole(){
    console.log("Selecting all roles...\n");
    connection.query("SELECT * FROM roles", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
    //   connection.end();
    });
};

function viewEmployee(){
    console.log("Selecting all employee...\n");
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
    //   connection.end();
    });
};


//exporing the createitem function
exports.createDepartment = createDepartment;
exports.createRole = createRole;
exports.createEmployee = createEmployee;
exports.viewDepartment = viewDepartment;
exports.viewRole = viewRole;
exports.viewEmployee = viewEmployee;
