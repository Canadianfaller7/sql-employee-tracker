const dbConnection = require('../config/connection');

const viewAllDepartments = () => {
  dbConnection.query(`SELECT departments.name AS department FROM departments`, (err, rows) => {
    if (err) throw new Error(err.message);

    console.table(rows);
  });
};

const viewAllRoles = () => {
  dbConnection.query(
    `SELECT roles.title AS role, salary, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id `,
    (err, rows) => {
      if (err) throw new Error(err.message);

      console.table(rows);
    }
  );
};

const viewAllEmployees = () => {
  dbConnection.query(`SELECT CONCAT(E.first_name, ' ', E.last_name) AS name, roles.title AS role, departments.name AS department, roles.salary, CONCAT(M.first_name, ' ', M.last_name) AS manager
  FROM employees E
  JOIN roles ON E.role_id = roles.id
  JOIN departments ON roles.department_id = departments.id
  LEFT JOIN employees M ON E.manager_id = M.id
  ORDER by E.last_name`,(err, rows) => {
      if (err) throw new Error(err.message);

      console.table(rows);
    }
  );
};

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
};
