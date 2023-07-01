package com.arinno.project.app.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.arinno.project.app.model.entity.Project;
import com.arinno.project.app.project.service.IProjectService;

@RestController
public class ProjectController {
	
	@Autowired
	private IProjectService projectService;
	
	@GetMapping("/list")	
	public List<Project> list(){
		return projectService.findAll();		
	}
	
	@GetMapping("/{id}")
	public Project project(@PathVariable Long id) {
		return projectService.findById(id);
	}


}
