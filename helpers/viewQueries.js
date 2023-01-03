const viewAllDepartments = () => {
  let sql = 'SELECT id, name AS department FROM departments';

  return sql;
}

const viewAllRoles = () => {
  let sql = `SELECT roles.title as role, roles.salary, departments.name AS department
    FROM roles
    LEFT OUTER JOIN departments
    ON roles.department_id = departments.id
    ORDER BY departments.name`;
    return sql;
}

const viewAllEmployees = () => {
   let sql = `SELECT A.first_name, A.last_name, roles.title AS role, departments.name AS department, roles.salary, CONCAT(B.first_name, " ", B.last_name) AS manager 
    FROM employees A
    JOIN roles
    ON A.role_id = roles.id
    JOIN departments 
    ON roles.department_id = departments.id
    LEFT JOIN employees B
    ON A.manager_id = B.id
    ORDER BY A.last_name`;
    return sql;
}

module.exports= { viewAllDepartments, viewAllRoles, viewAllEmployees }
