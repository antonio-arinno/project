package com.arinno.project.app.user.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.User;

//@RepositoryRestResource(path="utils")
@RepositoryRestResource
public interface UserDao extends CrudRepository<User, Long>{
	
	public User findByUsername(String username);
		
	public List<User> findByCompany(Company company);
	
	public User findByIdAndCompany(Long id, Company company);
	
	public void deleteByIdAndCompany(Long id, Company company);
	
	public List<User> findByNameContainingIgnoreCaseAndCompany(String term, Company company);

}
