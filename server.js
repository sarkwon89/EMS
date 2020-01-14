var mysql = require("mysql");
var util = require("util");


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

const query = util.promisify(connection.query).bind(connection);

//create department, employee or role 

async function createDepartment(thirdResponse) {
  console.log("Inserting a new department...\n");
  console.log(thirdResponse)
  connection.query(
    "INSERT INTO department SET ?", {
      departmentName: thirdResponse.addDepartment
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " items inserted!\n");
    }
  );

}

//function to create role
async function createRole(thirdResponse) {
  console.log("Inserting a new role...\n");
  connection.query(
    "INSERT INTO roles SET ?", {
      role_title: thirdResponse.addRole,
      salary: thirdResponse.addSalary,
      department_name: thirdResponse.departmentList
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " items inserted!\n");
    }
  )
}

//return an array of department id
async function displayDepartment() {
  let departmentres;
  console.log("Show department list")
  try {
    const rows = await query("SELECT departmentName FROM department");
    departmentres = rows;
  } catch (err) {
    return console.log(err);
  }
  console.log(departmentres)
  return departmentres;
}

// logs the actual query being run


//function to create employee
async function createEmployee(thirdResponse) {
  console.log("Inserting a new role...\n");
  connection.query(
    "INSERT INTO employee SET ?", {
      first_name: thirdResponse.addFirst,
      last_name: thirdResponse.addSecond,
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " items inserted!\n");
    }
  );
}

async function viewDepartment() {
  console.log("Selecting all department...\n");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    //   connection.end();
  });
};

async function viewRole() {
  console.log("Selecting all roles...\n");
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    //   connection.end();
  });
};

async function viewEmployee() {
  console.log("Selecting all employee...\n");
  connection.query("SELECT * FROM employee", function (err, res) {
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
exports.displayDepartment = displayDepartment;