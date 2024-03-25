package com.arinno.project.app.imputation.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.Imputation;
import com.arinno.project.app.model.entity.User;

public interface ImputationDao extends CrudRepository<Imputation, Long> {
	
	public List<Imputation> findByUser(User user);
	
	public Imputation findByIdAndUser(Long id, User user);
	
	public Imputation findByDateAndUser(Date date, User user);
	
	public void deleteByIdAndUser(Long id, User user);


	
}
