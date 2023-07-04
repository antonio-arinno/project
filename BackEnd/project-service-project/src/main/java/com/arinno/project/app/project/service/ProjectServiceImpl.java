package com.arinno.project.app.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arinno.project.app.model.entity.Project;
import com.arinno.project.app.project.repository.ProjectDao;

@Service
public class ProjectServiceImpl implements IProjectService {
	
	@Autowired
	private ProjectDao projectDao;

	@Override
	public List<Project> findAll() {
		return (List<Project>) projectDao.findAll();
	}

	@Override
	public Project findById(Long id) {
		return projectDao.findById(id).orElse(null);
	}

	@Override
	@Transactional	
	public Project save(Project project) {
		return projectDao.save(project);
	}

	@Override
	@Transactional	
	public void deleteById(Long id) {
		projectDao.deleteById(id);		
	}

}
