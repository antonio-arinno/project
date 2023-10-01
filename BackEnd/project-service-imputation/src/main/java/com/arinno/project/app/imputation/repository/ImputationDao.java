package com.arinno.project.app.imputation.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.Imputation;
import com.arinno.project.app.model.entity.User;

public interface ImputationDao extends CrudRepository<Imputation, Long> {
	
	public List<Imputation> findByCompany(Company company);
	
	public List<Imputation> findByUser(User user);
	
	public Imputation findByIdAndCompany(Long id, Company company);
	
	public void deleteByIdAndCompany(Long id, Company company);
	
}
