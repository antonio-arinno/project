INSERT INTO companies (name, create_at) VALUES('Explotacion', NOW());
INSERT INTO companies (name, create_at) VALUES('Company 2', NOW());

INSERT INTO users (username, password, enabled, company_id, name, last_name, email) VALUES('antonio', '$2a$10$.WjdjoXvqIcWnhsyoooOC.4OCapjdhTvSsAYlxUGVi.mDWY1t2JvS', true, 1, 'Antonio', 'Arinno','antonio@gmail.com');
INSERT INTO users (username, password, enabled, company_id, name, last_name, email) VALUES('juan', '$2a$10$P8BYxKwcwpmhTDFnSUk1AO5pAc5UWtGSHzpGBvEaRMcgHF.G4.Riq', true, 1, 'Juan', 'Perez','juan@gmail.com');

INSERT INTO roles (name) VALUES('ROLE_USER');
INSERT INTO roles (name) VALUES('ROLE_ADMIN');

INSERT INTO users_roles (user_id, roles_id) VALUES(1,1);
INSERT INTO users_roles (user_id, roles_id) VALUES(2,2);
INSERT INTO users_roles (user_id, roles_id) VALUES(2,1);


INSERT INTO products (name, description, create_at, company_id) VALUES('RC', 'RC....', NOW(), 1);
INSERT INTO products (name, description, create_at, company_id) VALUES('ALM', 'ALM....', NOW(), 1);
INSERT INTO products (name, description, create_at, company_id) VALUES('ALM_2', 'ALM compañia 2..', NOW(), 2);

