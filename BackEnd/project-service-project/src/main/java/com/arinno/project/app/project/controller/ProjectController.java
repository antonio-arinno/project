package com.arinno.project.app.project.controller;

import java.util.Base64;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.Project;
import com.arinno.project.app.project.service.IProjectService;

@RestController
public class ProjectController {
	
	@Autowired
	private IProjectService projectService;
	
	@GetMapping("/")	
	public List<Project> list(@RequestHeader(value="Authorization") String auth){
		return projectService.findByCompany(getCompany(auth));
//		return projectService.findByStatusNotProduction();
		
	}
	
	@GetMapping("/{id}")
	public Project project(@PathVariable Long id, @RequestHeader(value="Authorization") String auth) {
		return projectService.findByIdAndCompany(id, getCompany(auth));
	}

	@PostMapping("/")
	@ResponseStatus(HttpStatus.CREATED)
	public Project create(@RequestBody Project project, @RequestHeader(value="Authorization") String auth) {
		project.setCompany(getCompany(auth));	
		return projectService.save(project);
	}
	
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Project edit(@RequestBody Project project, @PathVariable Long id, @RequestHeader(value="Authorization") String auth) {
		Project projectDb = projectService.findByIdAndCompany(id, getCompany(auth));
		projectDb.setName(project.getName());
		projectDb.setDescription(project.getDescription());
		projectDb.setProduct(project.getProduct());
		projectDb.setStatus(project.getStatus());
		projectDb.setResponsible(project.getResponsible());
		projectDb.setContributors(project.getContributors());
		return projectService.save(projectDb);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id, @RequestHeader(value="Authorization") String auth) {
		projectService.deleteByIdAndCompany(id, getCompany(auth));
	}	
	
	@GetMapping("/select/{term}")
	public List<Project> listSelection(@PathVariable String term, @RequestHeader(value="Authorization") String auth){	
		return projectService.findByNameContainingIgnoreCaseAndCompany(term, getCompany(auth));
	}		
	
	private Company getCompany(String auth) {
		String[] chunks = auth.substring(7).split("\\.");
		Base64.Decoder decoder = Base64.getUrlDecoder();
		String payload = new String(decoder.decode(chunks[1]));
		JSONObject jsonObject = new JSONObject(payload);		
		return projectService.findByUsername(jsonObject.getString ("user_name"));	
	}		

}
