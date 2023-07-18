INSERT INTO projects (name, description, create_at) VALUES('Project_1', 'projecto 1....', NOW());
INSERT INTO projects (name, description, create_at) VALUES('Project_2', 'projecto 2....', NOW());

INSERT INTO products_projects (product_id, projects_id) VALUES(1,1);
INSERT INTO products_projects (product_id, projects_id) VALUES(1,2);
INSERT INTO products_projects (product_id, projects_id) VALUES(2,1);
