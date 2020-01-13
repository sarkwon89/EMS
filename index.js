var inquirer = require("inquirer");

async function prompt() {
    let firstResponse;

    //first prompt Add departments, roles, employees

    try {
        firstResponse = await inquirer.prompt([

            {
                type: "list",
                name: "action",
                message: "What would you like to do?: ",
                choices: [
                    "Add department, role or employee.",
                    "View deparment, role or employee.",
                    "Update department, role or employee."
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
        } else if (firstResponse.action === "Update department, role or employee.") {
            secondResponse = await inquirer.prompt([{
                type: "list",
                name: "update",
                message: "Do you want to update a department, role or employee?:",
                choices: [
                    "Department",
                    "Role",
                    "Employee"
                ]
            }, ]);
        }


        let thirdResponse = ""
        //this statement will add department, role or employee
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

        //this statement will view department, role or employee
        if (secondResponse.view === "Department") {
            //show department data
            return //employee by department data
        } else if (secondResponse.view === "Role") {
            return //employee by role data
        } else if (secondResponse.view === "Employee") {
            return //employee data
        }

        //this statment will Update 
        if (secondResponse.update === "Department"){
            //update the department

        } else if (secondResponse.add === "Role"){
            //update role
        } else if (secondResponse.add === "Employee"){
            //update employee
        }
    } catch (err) {
        return console.log(err);
    }

}