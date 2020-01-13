var inquirer = require("inquirer");
const SERVER = require("../EMS/server")

async function prompt() {
    let firstResponse;

    //first prompt Add departments, roles, employees
    do {
        try {
            firstResponse = await inquirer.prompt([

                {
                    type: "list",
                    name: "action",
                    message: "What would you like to do?: ",
                    choices: [
                        "Add department, role or employee.",
                        "View deparment, role or employee.",
                        "Update the employee's role.",
                        "Exit"
                    ]
                },
            ]);

            let secondResponse = ""

            if (firstResponse.action === "Add department, role or employee.") {
                secondResponse = await inquirer.prompt([{
                    type: "list",
                    name: "add",
                    message: "Do you want to add a department, role or employee?:",
                    choices: [
                        "Department",
                        "Role",
                        "Employee"
                    ]
                }, ]);
            } else if (firstResponse.action === "View deparment, role or employee.") {
                secondResponse = await inquirer.prompt([{
                    type: "list",
                    name: "view",
                    message: "Do you want to view a department, role or employee?:",
                    choices: [
                        "Department",
                        "Role",
                        "Employee"
                    ]
                }, ]);
            } else if (firstResponse.action === "Update the employee's role.") {
                //show the employee data

                //then run the prompt
                secondResponse = await inquirer.prompt([{
                        type: "input",
                        name: "roleId",
                        message: "Enter the employee's role id:",
                    },
                    {
                        type: "input",
                        name: "newRoleId",
                        message: "Enter a new employee's role id?:",
                    },
                ]);

                //run the function that will update the employee's id with sql

            }


            let thirdResponse = ""
            //this statement will ADD department, role or employee
            if (secondResponse.add === "Department") {
                thirdResponse = await inquirer.prompt([{
                    type: "input",
                    name: "addDepartment",
                    message: "Enter in the department you want to add?:",
                }]);

                //insert new department into the database
                await SERVER.createDepartment(thirdResponse);
                
            } else if (secondResponse.add === "Role") {
                // await SERVER.viewDepartment();
                thirdResponse = await inquirer.prompt([{
                    type: "input",
                    name: "addRole",
                    message: "Enter in the role you want to add?:",
                },
                {
                    type: "input",
                    name: "addSalary",
                    message: "Enter in the salary for the role?:",
                }]);
                //insert new role into the database
                await SERVER.createRole(thirdResponse);
            } else if (secondResponse.add === "Employee") {
                thirdResponse = await inquirer.prompt([{
                    type: "input",
                    name: "addFirst",
                    message: "Enter the first name of the employee.:",
                },
                {
                    type: "input",
                    name: "addSecond",
                    message: "Enter the second name of the employee.:",
                },
                {
                    type: "input",
                    name: "addRole",
                    message: "Enter the first name of the employee.:",
                }])

            }


            // //this statement will VIEW department, role or employee
            if (secondResponse.view === "Department") {
                //show department data
                await SERVER.viewDepartment(thirdResponse)
            } else if (secondResponse.view === "Role") {
                await SERVER.viewRole(thirdResponse);
            } else if (secondResponse.view === "Employee") {
                await SERVER.viewEmployee(thirdResponse);
            }

        } catch (err) {
            return console.log(err);
        }
    } while (firstResponse.action !== "Exit");
};

prompt()