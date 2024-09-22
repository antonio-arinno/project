package com.arinno.project.app.user.service;

import java.util.List;

import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.User;

public interface IUserService {
	
	public List<User> findByCompany(Company company);
	
	public User save(User user);
		
	public void deleteByIdAndCompany(Long id, Company company);
	
	public List<User> findByNameContainingIgnoreCaseAndCompany(String term, Company company);

	public Company findByUsername(String name);
	
	public User findByIdAndCompany(Long id, Company company);

}
