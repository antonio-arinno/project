package com.arinno.project.app.project.service;

import java.util.List;

import com.arinno.project.app.model.entity.Project;

public interface IProjectService {
	
	public List<Project> findAll();
	
	public Project findById(Long Id);

}