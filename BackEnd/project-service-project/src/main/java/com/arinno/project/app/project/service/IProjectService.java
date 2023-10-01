package com.arinno.project.app.project.service;

import java.util.List;

import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.Project;

public interface IProjectService {

	public List<Project> findByCompany(Company company);
	
	public Project findByIdAndCompany(Long id, Company company);
	
	public Project save(Project project);
	
	public void deleteByIdAndCompany(Long id, Company company);
	
	public List<Project> findByNameContainingIgnoreCaseAndCompany(String term, Company company);	
	
	public Company findByUsername(String name);
	

}
