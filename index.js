const inquirer = require("inquirer");
// const SERVER = require("../EMS/server");
const mysql = require("mysql");


// //port for mysql
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


// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    startPrompt()
});


//first prompt that will ask user what he or she wants to do
function startPrompt() {

    inquirer.prompt([{
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: ["Add", "View", "Update", "Delete"]
            },
            {
                name: "option",
                type: "list",
                message: "Select from the options below?",
                choices: ["Employee", "Role", "Department"]
            }
        ]) // switch statement for the next prompt
        .then(function (res) {
            console.log(`You chose to ${res.action} a ${res.option}`);

            switch (res.action) {
                case "Add":
                    createData(res.option);
                    break;
                case "View":
                    readData(res.option);
                    break;
                case "Update":
                    updateData(res.option);
                    break;
                case "Delete":
                    deleteData(res.option);
                    break;
            }
        })
        .catch(function (err) {
            console.log(err);
        })
}

//CREATE DATA FUNCTION
function createData(option) {

    switch (option) {
        //create employee statement
        case 'Employee':

            // get roles data for list
            connection.query("SELECT * FROM roles", function (err, res) {
                if (err) throw err;
                const roles = res.map(object => {
                    return {
                        name: object.role_title,
                        value: object.r_id
                    }
                });
                roles.push("N/A")

                // get employee data for list
                connection.query("SELECT * FROM employee", function (err, res) {
                    if (err) throw err;

                    const employees = res.map(object => {
                        return {
                            name: `${object.first_name} ${object.last_name}`,
                            value: object.e_id
                        }
                    });
                    employees.unshift({
                        name: "no manager",
                        value: null
                    })

                    // prompt for user input
                    inquirer.prompt([{
                                name: "first_name",
                                type: "input",
                                message: "What is the employee's first name?",
                            },
                            {
                                name: "last_name",
                                type: "input",
                                message: "What is the employee's last name?",
                            },
                            {
                                name: "role",
                                type: "list",
                                message: "What is the employee's position?",
                                choices: roles
                            },
                            {
                                name: "manager",
                                type: "list",
                                message: "Who is the employee's manager?",
                                choices: employees
                            },
                        ])
                        .then(function (res) {
                            // console.log(res);
                            //statement to handle if role is not available
                            if (res.role === "N/A") {
                                genRolePrompt();
                            } else {
                                console.log(`Inserting ${res.first_name} ${res.last_name} as a new employee...\n`);
                                console.log(res.manager)
                                connection.query(
                                    "INSERT INTO employee SET ?", {
                                        first_name: res.first_name,
                                        last_name: res.last_name,
                                        role_id: res.role,
                                        manager_id: res.manager,
                                    },
                                    function (err, res) {
                                        if (err) throw err;
                                        console.log(res.affectedRows + " employee inserted!\n");
                                        // run the continue prompt once data has been updated for employee table
                                        continuePrompt()
                                    }
                                );
                            }
                        })
                        .catch(function (err) {
                            console.log(err);
                        })
                });
            });
            break;

            //create role statement
        case 'Role':
            connection.query("SELECT * FROM department", function (err, res) {
                if (err) throw err;

                // get roles data for list
                const departments = res.map(object => {
                    return {
                        name: object.departmentName,
                        value: object.d_id
                    }
                });

                departments.push("N/A")

                // prompt to fill out new role info
                inquirer.prompt([{
                            name: "title",
                            type: "input",
                            message: "What is the title of the new role?",
                        },
                        {
                            name: "salary",
                            type: "number",
                            message: "What is the salary of the new role?",
                        },
                        {
                            name: "department",
                            type: "list",
                            message: "What is the employee's department?",
                            choices: departments
                        }
                    ])
                    .then(function (res) {
                        //statement to handle if a department doesn't exist
                        if (res.department === "N/A") {
                            genDepartmentPrompt();
                        } else {
                            console.log("Inserting a new role...\n");
                            connection.query(
                                "INSERT INTO roles SET ?", {
                                    role_title: res.title,
                                    salary: res.salary,
                                    department_id: res.department,
                                },
                                function (err, res) {
                                    if (err) throw err;
                                    console.log(res.affectedRows + " Role inserted!\n");
                                    // run the continue prompt once data has been updated for role table
                                    continuePrompt()
                                }
                            );
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            });
            break;

            //create department statement
        case 'Department':
            inquirer.prompt([{
                    name: "departmentname",
                    type: "input",
                    message: "What is the name of the new Department?",
                }, ]) // insert department info
                .then(function (res) {
                    console.log("Inserting a new Department...\n");
                    connection.query(
                        "INSERT INTO department SET ?", {
                            departmentName: res.departmentname,
                        },
                        function (err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " Department inserted!\n");
                            // run the continue prompt once data has been updated for department table
                            continuePrompt()
                        }
                    );
                })
                .catch(function (err) {
                    console.log(err);
                })
            break;
    }
};

//read data function
function readData(res) {
    switch (res) {
        case "Employee":
            console.log("Selecting all employees...\n");
            connection.query("SELECT * FROM employee", function (err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                console.table(res);
                continuePrompt()
            });
            break;
        case "Role":
            console.log("Selecting all roles...\n");
            connection.query("SELECT * FROM roles", function (err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                console.table(res);
                continuePrompt()
            });
            break;
        case "Department":
            console.log("Selecting all departments...\n");
            connection.query("SELECT * FROM department", function (err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                console.table(res);
                continuePrompt()
            });
            break;
    }
}

//UPDATE FUNCTION

function updateData(option) {
    switch (option) {
        //update employee
        case 'Employee':
            // get employee data for list
            connection.query("SELECT * FROM employee", function (err, res) {
                if (err) throw err;
                const employees = res.map(object => {
                    return {
                        name: `${object.first_name} ${object.last_name}`,
                        value: object.e_id
                    }
                });
                // get roles data for list
                connection.query("SELECT * FROM roles", function (err, res) {
                    if (err) throw err;
                    const roles = res.map(object => {
                        return {
                            name: object.role_title,
                            value: object.r_id
                        }
                    });

                    console.log("Updating employee position...\n");
                    inquirer.prompt([{
                                name: "employee",
                                type: "list",
                                message: "Which employee would you like to modify roles?",
                                choices: employees
                            },
                            {
                                name: "role",
                                type: "list",
                                message: "What would you like to change their role to?",
                                choices: roles
                            }
                        ])
                        .then(function (res) {
                            // console.log(res.employee)
                            // console.log(res.role)
                            console.log("Updating existing employee...\n");
                            connection.query(
                                "UPDATE employee SET ? WHERE ?",
                                [{
                                        role_id: res.role
                                    },
                                    {
                                        e_id: res.employee
                                    }
                                ],
                                function (err, res) {
                                    if (err) throw err;
                                    console.log(res.affectedRows + " employee updated!\n");
                                    // Call deleteemployee AFTER the UPDATE completes
                                    continuePrompt()
                                }
                            );
                        })
                        .catch(function (err) {
                            console.log(err);
                        })
                });
            });
            break;
        case 'Role':
            console.log("Can't update role...\n");
            continuePrompt()
            break;
        case 'Department':
            console.log("Can't update department...\n");
            continuePrompt()
            break;
    }
};

//DELETE FUNCTION

function deleteData(option) {
    switch (option) {
        case 'Employee':
            // get employee data for list
            connection.query("SELECT * FROM employee", function (err, res) {
                if (err) throw err;
                const employees = res.map(object => {
                    return {
                        name: `${object.first_name} ${object.last_name}`,
                        value: object.e_id
                    }
                });
                inquirer.prompt([{
                        name: "employee",
                        type: "list",
                        message: "Which employee would you like to remove?",
                        choices: employees
                    }, ])
                    .then(function (res) {
                        console.log("delecting an existing employee...\n");
                        connection.query(
                            "DELETE FROM employee WHERE ?",
                            [{
                                e_id: res.employee
                            }],
                            function (err, res) {
                                if (err) throw err;
                                console.log(res.affectedRows + " employee removed!\n");
                                // run the continue function
                                continuePrompt()
                            }
                        );
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            })
            break;
        case 'Role':
            console.log("Can't remove a role...unless you have special permissions\n");
            continuePrompt()
            break;
        case 'Department':
            console.log("Can't remove a department...unless you the boss\n");
            continuePrompt()
            break;
    }
}


//CONTINUE TO EXIT FUNCTIONS (3 total)

//continue or exit function
function continuePrompt() {
    inquirer.prompt({
            name: "action",
            type: "list",
            message: "Would you like to continue to exit?",
            choices: ["CONTINUE", "EXIT"]
        })
        .then(function (res) {
            console.log(`${res.action}...\n`);
            switch (res.action) {
                case "EXIT":
                    connection.end();
                    break;
                case "CONTINUE":
                    startPrompt();
                    break;
            }
        })
        .catch(function (err) {
            console.log(err);
        })
}

//continue or exit function if department is not available so user can create one
function genDepartmentPrompt() {
    inquirer.prompt({
            name: "action",
            type: "list",
            message: "Please finish adding this role by creating the appropriate department.",
            choices: ["CONTINUE", "EXIT"]
        })
        .then(function (res) {
            console.log(`${res.action}...\n`);
            switch (res.action) {
                case "EXIT":
                    connection.end();
                    break;
                case "CONTINUE":
                    startPrompt();
                    break;
            }
        })
        .catch(function (err) {
            console.log(err);
        })
}

//continue or exit function if role is not available so user can create one
function genRolePrompt() {
    inquirer.prompt({
            name: "action",
            type: "list",
            message: "Please finish adding this employee by creating the appropriate role.",
            choices: ["CONTINUE", "EXIT"]
        })
        .then(function (res) {
            console.log(`${res.action}...\n`);
            switch (res.action) {
                case "EXIT":
                    connection.end();
                    break;
                case "CONTINUE":
                    startPrompt();
                    break;
            }
        })
        .catch(function (err) {
            console.log(err);
        })
}