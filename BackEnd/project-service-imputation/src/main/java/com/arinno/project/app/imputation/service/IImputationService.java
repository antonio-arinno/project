package com.arinno.project.app.imputation.service;

import java.util.List;

import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.Imputation;
import com.arinno.project.app.model.entity.User;

public interface IImputationService {

	public List<Imputation> findByCompany(Company company);
	
	public List<Imputation> findByUser(User user);
	
	public Imputation findByIdAndCompany(Long id, Company company);
	
	public Imputation save(Imputation imputation);
	
	public void deleteByIdAndCompany(Long id, Company company);
	
	public Company findCompanyByUsername(String name);
	
	public User findUserByUsername(String name);
	
}
