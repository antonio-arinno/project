package com.arinno.project.app.project.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.Project;

public interface ProjectDao extends CrudRepository<Project, Long> {
	
	public List<Project> findByCompany(Company company);
	
	public Project findByIdAndCompany(Long id, Company company);
	
	public void deleteByIdAndCompany(Long id, Company company);
	
	public List<Project> findByNameContainingIgnoreCaseAndCompany(String term, Company company);	

}
