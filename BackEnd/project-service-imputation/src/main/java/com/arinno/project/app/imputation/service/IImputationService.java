package com.arinno.project.app.imputation.service;

import java.util.Date;
import java.util.List;

import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.Imputation;
import com.arinno.project.app.model.entity.User;

public interface IImputationService {
	
	public List<Imputation> findByUser(User user);
	
	public Imputation findByIdAndUser(Long id, User user);
	
	public Imputation findByDateAndUser(Date date, User user);	
	
	public Imputation save(Imputation imputation);
	
	public void deleteByIdAndUser(Long id, User user);
	
	public Company findCompanyByUsername(String name);
	
	public User findUserByUsername(String name);




	
}
