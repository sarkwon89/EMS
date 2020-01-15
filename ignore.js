//PREVIOUS VERSION...BUG UNSOLVED WITH DO WHILE LOOP. REDO HW.




// var util = require("util");
// const inquirer = require("inquirer");
// // const SERVER = require("../EMS/server");
// const mysql = require("mysql");


// var connection = mysql.createConnection({
//   host: "localhost",

//   // Your port; if not 3306
//   port: 3306,

//   // Your username
//   user: "root",

//   // Your password
//   password: "password",
//   database: "ems_db"
// });

// const query = util.promisify(connection.query).bind(connection);


// async function prompt() {
//     let firstResponse;

//     //first prompt Add departments, roles, employees
//     do {
//         try {
//             firstResponse = await inquirer.prompt([{
//                 type: "list",
//                 name: "action",
//                 message: "What would you like to do?: ",
//                 choices: [
//                     "Add department, role or employee.",
//                     "View deparment, role or employee.",
//                     "Update the employee's role.",
//                     "Exit"
//                 ]
//             }, ]);

//             let secondResponse = ""

//             if (firstResponse.action === "Add department, role or employee.") {
//                 secondResponse = await inquirer.prompt([{
//                     type: "list",
//                     name: "add",
//                     message: "Do you want to add a department, role or employee?:",
//                     choices: [
//                         "Department",
//                         "Role",
//                         "Employee"
//                     ]
//                 }, ]);
//             } else if (firstResponse.action === "View deparment, role or employee.") {
//                 secondResponse = await inquirer.prompt([{
//                     type: "list",
//                     name: "view",
//                     message: "Do you want to view a department, role or employee?:",
//                     choices: [
//                         "Department",
//                         "Role",
//                         "Employee"
//                     ]
//                 }, ]);
//             } else if (firstResponse.action === "Update the employee's role.") {
//                 //show the employee data

//                 //then run the prompt
//                 secondResponse = await inquirer.prompt([{
//                         type: "input",
//                         name: "roleId",
//                         message: "Enter the employee's role id:",
//                     },
//                     {
//                         type: "input",
//                         name: "newRoleId",
//                         message: "Enter a new employee's role id?:",
//                     },
//                 ]);

//                 //run the function that will update the employee's id with sql
//             }

//             let thirdResponse = ""

//             //this statement will ADD department, role or employee
//             if (secondResponse.add === "Department") {
//                 thirdResponse = await inquirer.prompt([{
//                     type: "input",
//                     name: "addDepartment",
//                     message: "Enter in the department you want to add?:",
//                 }]);

//                 //insert new department into the database
//                 SERVER.createDepartment(thirdResponse);

//             } else if (secondResponse.add === "Role") {

//                 let departmentres = await SERVER.displayDepartment()

//                 let departList = []

//                 for (let index = 0; index < departmentres.length; index++) {
//                     departList.push({
//                         name: departmentres[index].departmentName,
//                         value: departmentres[index].d_id
//                     })
//                 };

//                 console.log(departList);

//                 thirdResponse = await inquirer.prompt([{
//                         type: "input",
//                         name: "addRole",
//                         message: "Enter in the role you want to add?:",
//                     },
//                     {
//                         type: "input",
//                         name: "addSalary",
//                         message: "Enter in the salary for the role?:",
//                     },
//                     {
//                         type: "list",
//                         name: "departmentList",
//                         message: "Which department does this role belong in? Create a new department if you do not see one that matches the new role?",
//                         choices: departList
//                     }
//                 ]);
//                 //insert new role into the database
//                 SERVER.createRole(thirdResponse);
//             } else if (secondResponse.add === "Employee") {
//                 thirdResponse = await inquirer.prompt([{
//                         type: "input",
//                         name: "addFirst",
//                         message: "Enter the first name of the employee.:",
//                     },
//                     {
//                         type: "input",
//                         name: "addSecond",
//                         message: "Enter the second name of the employee.:",
//                     },
//                 ])
//                 //insert new employee into database
//                 await SERVER.createEmployee(thirdResponse);
//             }

//             console.log("test")

//             // //this statement will VIEW department, role or employee
//             if (secondResponse.view === "Department") {
//                 //show department data
//                 SERVER.viewDepartment(thirdResponse)
//             } else if (secondResponse.view === "Role") {
//                 await SERVER.viewRole(thirdResponse);
//             } else if (secondResponse.view === "Employee") {
//                 await SERVER.viewEmployee(thirdResponse);
//             }
//         } catch (err) {
//             return console.log(err);
//         }
//     } while (firstResponse.action !== "Exit");
// };


// //create department, employee or role 

// async function createDepartment(thirdResponse) {
//   console.log("Inserting a new department...\n");
//   console.log(thirdResponse)
//   connection.query(
//     "INSERT INTO department SET ?", {
//       departmentName: thirdResponse.addDepartment
//     },
//     function (err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " items inserted!\n");
//     }
//   );

// }

// //function to create role
// function createRole(thirdResponse) {
//   console.log("Inserting a new role...\n");
//   connection.query(
//     "INSERT INTO roles SET ?", {
//       role_title: thirdResponse.addRole,
//       salary: thirdResponse.addSalary,
//       d_id: thirdResponse.departmentList
//     },
//     function (err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " items inserted!\n");
//     }
//   )
// }

// //return an array of department id
// async function displayDepartment() {
//   let departmentres;
//   console.log("Show department list")
//   try {
//     const rows = await query("SELECT * FROM department");
//     departmentres = rows;
//   } catch (err) {
//     return console.log(err);
//   }
//   console.log(departmentres)
//   return departmentres;
// }


// //function to create employee
// async function createEmployee(thirdResponse) {
//   console.log("Inserting a new role...\n");
//   connection.query(
//     "INSERT INTO employee SET ?", {
//       first_name: thirdResponse.addFirst,
//       last_name: thirdResponse.addSecond,
//     },
//     function (err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " items inserted!\n");
//     }
//   );
// }

// async function viewDepartment() {
//   console.log("Selecting all department...\n");
//   connection.query("SELECT * FROM department", function (err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.table(res);
//     //   connection.end();
//   });
// };

// async function viewRole() {
//   console.log("Selecting all roles...\n");
//   connection.query("SELECT * FROM roles", function (err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.table(res);
//     //   connection.end();
//   });
// };

// async function viewEmployee() {
//   console.log("Selecting all employee...\n");
//   connection.query("SELECT * FROM employee", function (err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.table(res);
//     //   connection.end();
//   });
// };


// //exporing the createitem function
// exports.createDepartment = createDepartment;
// exports.createRole = createRole;
// exports.createEmployee = createEmployee;
// exports.viewDepartment = viewDepartment;
// exports.viewRole = viewRole;
// exports.viewEmployee = viewEmployee;
// exports.displayDepartment = displayDepartment;