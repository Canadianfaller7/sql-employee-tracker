const newDepartment = (departName) => `INSERT INTO departments (name) VALUES ('${departName}')`;

const newRole = (newRole, salary, dept) => {
  let salaryAmount = Number(salary);
  let departNumber = Number(dept);

  let sql = `INSERT INTO roles (title, salary, department_id) VALUES ('${newRole}', ${salaryAmount}, ${departNumber})`;

  return sql;
};

const newEmployee = (firstName, lastName, role, manager) => {
  let role_id = Number(role);

  if (manager) {
    const manager_id = Number(manager);
    let sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${role_id}, ${manager_id})`;

    return sql;
  } else {
    let sql = `INSERT INTO employees (first_name, last_name, role_id) VALUES ('${firstName}', '${lastName}', ${role_id})`;

    return sql;
  }
};

const updateEmployee = (empId, roleId) => {
  let employee_id = Number(empId);
  let role_id = Number(roleId);
  let sql = `UPDATE employees SET role_id = ${role_id} WHERE id = ${employee_id}`;

  return sql;
};

// const deleteDepartment = departId => {
//   let sql = `DELETE FROM departments WHERE id = ${departId}`

//   return sql;
// }

module.exports = { newDepartment, newRole, newEmployee, updateEmployee };
