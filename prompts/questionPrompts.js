const inquirer = require('inquirer');
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees
} = require('../db/queries');


const questions = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'userChoice',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        // 'Add a department',
        // 'Add a role',
        // 'Add an employee',
        // 'Update employee role',
        'Quit',
      ],
    },
  ])
    .then(answers => {
      switch (answers.userChoice) {
        case 'Quit':
          console.log('Goodbye.');
          process.exit();
        case 'View all departments':
          viewAllDepartments();
          questions();
          break;
        case 'View all roles':
          viewAllRoles();
          questions();
          break;
        case 'View all employees':
          viewAllEmployees()
          questions();
          break;
        // case 'Add a department':
        //   console.log('Add a department');
        //   break;
        // case 'Add a role':
        //   console.log('Add a role');
        //   break;
        // case 'Add an employee':
        //   console.log('Add an employee');
        //   break;
        // case 'Update employee role':
        //   console.log('Update employee role');
        //   break;
        // case 'Quit':
        //   console.log('Quit');
        //   break;
        default:
          console.log('Invalid choice');
          break;
      }
  })
};

module.exports = questions;