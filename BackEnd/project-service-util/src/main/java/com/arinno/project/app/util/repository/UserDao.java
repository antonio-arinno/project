package com.arinno.project.app.util.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.arinno.project.app.model.entity.User;

@RepositoryRestResource(path="utils")
public interface UserDao extends CrudRepository<User, Long>{
	
	public User findByUsername(String username);
	

}