INSERT INTO users (username, password, enabled, name, last_name, email) VALUES('antonio', '$2a$10$.WjdjoXvqIcWnhsyoooOC.4OCapjdhTvSsAYlxUGVi.mDWY1t2JvS', true, 'Antonio', 'Arinno','antonio@gmail.com');
INSERT INTO users (username, password, enabled, name, last_name, email) VALUES('juan', '$2a$10$P8BYxKwcwpmhTDFnSUk1AO5pAc5UWtGSHzpGBvEaRMcgHF.G4.Riq', true, 'Juan', 'Perez','juan@gmail.com');

INSERT INTO roles (name) VALUES('ROLE_USER');
INSERT INTO roles (name) VALUES('ROLE_ADMIN');

INSERT INTO users_roles (user_id, roles_id) VALUES(1,1);
INSERT INTO users_roles (user_id, roles_id) VALUES(2,2);
INSERT INTO users_roles (user_id, roles_id) VALUES(2,1);