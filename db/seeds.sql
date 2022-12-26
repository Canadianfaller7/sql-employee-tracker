INSERT INTO department (name)
VALUES ("Human Resources"),
       ("Sales"),
       ("Engineering");

INSERT INTO roles (title, salary, department_id) 
VALUES ("HR Manager", 150000, 1),
       ("Finance", 110000, 1),
       ("Frontend Engineer", 85000, 3),
       ("Sales Manager", 160000, 2),
       ("Sales Rep", 65000, 2),
       ("Backend Engineer", 100000, 3),
       ("Full Stack Engineer", 135000,3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Will", "Ramos", 1, 1),
       ("Nik", "Nocturnal", 2, null),
       ("Sam", "Carter", 3, 3),
       ("Tom", "Hanks", 4, null),
       ("Al", "Vin", 5, null),
       ("Spencer", "Merrill", 6, 7);