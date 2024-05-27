INSERT INTO departments (name)
VALUES 
  ('Engineering'),
  ('Finance'),
  ('Human Resources');


INSERT INTO roles (title, salary, department_id)
VALUES 
  ('Product Manager', 120000, 1),
  ('Front End Engineer', 85000, 1),
  ('Back End Engineer', 95000, 1),
  ('Full Stack Engineer', 110000, 1),
  ('Financial Administrator', 80000, 2),
  ('Financial Analyst', 70000, 2),
  ('Accountant', 60000, 2),
  ('HR Manager', 65000, 3),
  ('HR Specialist', 55000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
  ("Will", "Ramos", 1, null),
  ("Sam", "Carter", 1, null),
  ("Kiara", "Merrill", 5, null),
  ("Jane", "Doe", 8, null),
  ("Josh", "Merrill", 3, 1),
  ("Spencer", "Merrill", 4, 1),
  ("Nik", "Nocturnal", 2, 2),
  ("Terran", "Adams", 2, 2 ),
  ("Al", "Vin", 6, 3),
  ("Tom", "Hanks", 7, 3),
  ("John", "Doe", 9, 4);