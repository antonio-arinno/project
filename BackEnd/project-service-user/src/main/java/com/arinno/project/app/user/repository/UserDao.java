package com.arinno.project.app.user.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.arinno.project.app.model.entity.User;

//@RepositoryRestResource(path="users")
@RepositoryRestResource
public interface UserDao extends CrudRepository<User, Long>{
	
	public User findByUsername(String username);

}
