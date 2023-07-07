INSERT INTO users (username, password, enabled, name, last_name, email) VALUES('antonio', '12345', true, 'Antonio', 'Arinno','antonio@gmail.com');
INSERT INTO users (username, password, enabled, name, last_name, email) VALUES('juan', '12345', true, 'Juan', 'Perez','juan@gmail.com');

INSERT INTO roles (name) VALUES('ROLE_USER');
INSERT INTO roles (name) VALUES('ROLE_ADMIN');

INSERT INTO users_roles (user_id, roles_id) VALUES(1,1);
INSERT INTO users_roles (user_id, roles_id) VALUES(2,2);
INSERT INTO users_roles (user_id, roles_id) VALUES(2,1);