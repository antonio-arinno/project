package com.arinno.project.app.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.Project;
import com.arinno.project.app.model.entity.Status;
import com.arinno.project.app.project.repository.ProjectDao;

@Service
public class ProjectServiceImpl implements IProjectService {
	
	@Autowired
	private ProjectDao projectDao;
	
	@Autowired
	private IUserFeign userFeign; 

	@Override
	@Transactional(readOnly = true)
	public List<Project> findByCompany(Company company) {
		return (List<Project>) projectDao.findByCompany(company);
	}

	@Override
	public Project findByIdAndCompany(Long id, Company company) {
		return projectDao.findByIdAndCompany(id, company);
	}

	@Override
	@Transactional	
	public Project save(Project project) {
		return projectDao.save(project);
	}

	@Override
	@Transactional		
	public void deleteByIdAndCompany(Long id, Company company) {
		projectDao.deleteByIdAndCompany(id, company);
	}

	@Override
	@Transactional
	public Company findByUsername(String name) {
		return userFeign.findByUsername(name).getCompany();
	}
	
	@Override
	@Transactional
	public List<Project> findByNameContainingIgnoreCaseAndCompany(String term, Company company) {
		return projectDao.findByNameContainingIgnoreCaseAndCompany(term, company);
	}

	@Override
	@Transactional
	public List<Project> findByStatus(Status status) {
		return projectDao.findByStatus(status);
	}

	@Override
	@Transactional
	public List<Project> findByStatusNotProduction() {
		return projectDao.findByStatusNotProduction(Status.PRODUCTION);
	}		

}
