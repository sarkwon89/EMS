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
                }])
            } else if (secondResponse.add === "Role") {
                thirdResponse = await inquirer.prompt([{
                    type: "input",
                    name: "addRole",
                    message: "Enter in the role you want to add?:",
                }])
            } else if (secondResponse.add === "Employee") {
                thirdResponse = await inquirer.prompt([{
                    type: "input",
                    name: "addEmployeee",
                    message: "Enter in the employee you want to add?:",
                }])
            }

            console.log(thirdResponse)

            //this statement will VIEW department, role or employee
            if (secondResponse.view === "Department") {
                //show department data
                return //employee by department data
            } else if (secondResponse.view === "Role") {
                return //employee by role data
            } else if (secondResponse.view === "Employee") {
                return //employee data
            }

        } catch (err) {
            return console.log(err);
        }
    } while (firstResponse.action !== "Exit");
};


prompt()