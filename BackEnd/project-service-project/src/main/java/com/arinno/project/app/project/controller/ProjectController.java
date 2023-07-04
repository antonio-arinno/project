package com.arinno.project.app.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
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

	@PostMapping("/create")
	@ResponseStatus(HttpStatus.CREATED)
	public Project create(@RequestBody Project project) {
		return projectService.save(project);
	}
	
	@PutMapping("/update/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Project edit(@RequestBody Project project, @PathVariable Long id) {
		Project projectDb = projectService.findById(id);
		projectDb.setName(project.getName());
		projectDb.setDescription(project.getDescription());
		return projectService.save(projectDb);
	}
	
	@DeleteMapping("/delete/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		projectService.deleteById(id);
	}	

}
