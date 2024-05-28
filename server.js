const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const viewQueries = require('./helpers/viewQueries');
const updateQueries = require('./helpers/addQueries');
require('dotenv').config();

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the employee_db database.`)
);

const departmentChoices = async () => {
  let departmentArray = [];

  return new Promise((resolve) => {
    let sql = 'SELECT name AS name, id AS value FROM departments';
    db.query(sql, (err, rows) => {
      if (err) {
        console.log('error');
        return;
      } else {
        let rowsCount = 0;
        for (const row in rows) {
          let newDepartment = {
            name: rows[rowsCount].name,
            value: rows[rowsCount].value,
          };
          rowsCount++;
          departmentArray.push(newDepartment);
        }
      }
    });
    resolve(departmentArray);
  });
};

const roleChoices = async () => {
  let newRoleArray = [];

  return new Promise((resolve) => {
    let sql = 'SELECT id, title FROM roles';
    db.query(sql, (err, rows) => {
      if (err) {
        console.log('error');
        return;
      } else {
        let rowsCount = 0;
        for (const row in rows) {
          let newRole = {
            name: rows[rowsCount].title,
            value: rows[rowsCount].id,
          };
          rowsCount++;
          newRoleArray.push(newRole);
        }
      }
    });
    resolve(newRoleArray);
  });
};

const managerChoices = async () => {
  let employeeMngrArray = [];

  return new Promise((resolve) => {
    let sql = `SELECT id, CONCAT(first_name, " ", last_name) AS managerName FROM employees`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log('error');
        return;
      } else {
        let rowsCount = 0;
        for (const row in rows) {
          let newEmployee = {
            name: rows[rowsCount].managerName,
            value: rows[rowsCount].id,
          };
          rowsCount++;
          employeeMngrArray.push(newEmployee);
        }
        // add in a null-value for no manager
        let nullValue = null;
        let noMngr = {
          name: 'No Manager',
          value: nullValue,
        };
        employeeMngrArray.push(noMngr);
      }
    });
    resolve(employeeMngrArray);
  });
};

const showMainMenu = async () => {
  let departmentList = await departmentChoices();
  let roleList = await roleChoices();
  let employeeManager = await managerChoices();

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'userChoice',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update employee role',
          'Quit',
        ],
      },
      {
        type: 'input',
        name: 'departmentName',
        message: 'Name of the Department:',
        when: (answers) => answers.userChoice === 'Add a department',
        validate(value) {
          if (value.length) {
            return true;
          }
          return 'Please enter the name of the department.';
        },
      },
      {
        type: 'input',
        name: 'roleName',
        message: 'Name of the Role:',
        when: (answers) => answers.userChoice === 'Add a role',
        validate(value) {
          if (value.length) {
            return true;
          }
          return 'Please enter the name of the role.';
        },
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary for this role?',
        when: (answers) => answers.userChoice === 'Add a role',
        validate(value) {
          if (value.length) {
            return true;
          }
          return 'Please enter a salary amount.';
        },
      },
      {
        type: 'list',
        message: 'Which department does this role belong to?',
        name: 'roleDept',
        choices: departmentList,
        when: (answers) => answers.userChoice === 'Add a role',
      },
      {
        type: 'input',
        name: 'employeeFirst',
        message: 'What is first name of the employee?',
        when: (answers) => answers.userChoice === 'Add an employee',
        validate(value) {
          if (value.length) {
            return true;
          }
          return 'Please enter the first name of the employee.';
        },
      },
      {
        type: 'input',
        name: 'employeeLast',
        message: 'What is last name of the employee?',
        when: (answers) => answers.userChoice === 'Add an employee',
        validate(value) {
          if (value.length) {
            return true;
          }
          return 'Please enter the last name of the employee.';
        },
      },
      {
        type: 'list',
        message: 'What is the role for this employee?',
        name: 'empRole',
        choices: roleList,
        when: (answers) => answers.userChoice === 'Add an employee',
      },
      {
        type: 'list',
        message: 'Who will this employee report to?',
        name: 'empManager',
        choices: employeeManager,
        when: (answers) => answers.userChoice === 'Add an employee',
      },
      {
        type: 'list',
        message: 'Which employee would you like to update?',
        name: 'selectedEmployee',
        choices: employeeManager,
        when: (answers) => answers.userChoice === 'Update employee role',
      },
      {
        type: 'list',
        message: 'What is their new role?',
        name: 'employeeRoleUpdate',
        choices: roleList,
        when: (answers) => answers.userChoice === 'Update employee role',
      },
    ])
    .then((answers) => {
      let sql = 'not set';
      let showTable = true;

      // Query/update database according to user input
      switch (answers.userChoice) {
        case 'Quit':
          console.log('Goodbye.');
          process.exit();
        case 'View all departments':
          sql = viewQueries.viewAllDepartments();
          break;
        case 'View all roles':
          sql = viewQueries.viewAllRoles();
          break;
        case 'View all employees':
          sql = viewQueries.viewAllEmployees();
          break;
        case 'Add a department':
          let newDepartment = answers.departmentName;
          sql = updateQueries.newDepartment(newDepartment);
          console.log(`Added ${newDepartment} to the database.`);
          showTable = false;
          break;
        case 'Add a role':
          let newRole = answers.roleName;
          let roleSalary = answers.roleSalary;
          let roleDept = answers.roleDept;
          sql = updateQueries.newRole(newRole, roleSalary, roleDept);
          console.log(`Added ${newRole} to the database.`);
          showTable = false;
          break;
        case 'Add an employee':
          let firstName = answers.employeeFirst;
          let lastName = answers.employeeLast;
          let employeeRole = answers.empRole;
          let employeeManager = answers.empManager;
          sql = updateQueries.newEmployee(firstName, lastName, employeeRole, employeeManager);
          console.log(`Added ${firstName} ${lastName} to the database.`);
          showTable = false;
          break;
        case 'Update employee role':
          let selectedEmployee = answers.selectedEmployee;
          let employeeRoleUpdate = answers.employeeRoleUpdate;
          sql = updateQueries.updateEmployee(selectedEmployee, employeeRoleUpdate);
          console.log(`Updated user in database.`);
          showTable = false;
          break;
        default:
          console.log('Error - nothing selected.');
          break;
      }

      if (sql === 'not set') {
        showMainMenu();
      } else {
        db.query(sql, (err, rows) => {
          if (err) {
            console.log('error');
            return;
          } else {
            // console.log("success");
            if (showTable) {
              console.table(rows);
            }
            showMainMenu();
          }
        });
      }
    });
};

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});
showMainMenu();
