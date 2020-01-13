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

function createDepartment (secondResponse){
    console.log("Inserting a new department...\n");
    var query = connection.query(
      "INSERT INTO department SET ?",
      {
        departmentName: secondResponse.add
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