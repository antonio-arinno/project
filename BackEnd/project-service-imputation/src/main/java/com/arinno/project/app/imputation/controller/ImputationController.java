package com.arinno.project.app.imputation.controller;

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

import com.arinno.project.app.imputation.service.IImputationService;
import com.arinno.project.app.model.entity.Imputation;

@RestController
public class ImputationController {

	@Autowired
	private IImputationService imputationService;
	
	@GetMapping("/list")	
	public List<Imputation> list(){
		return imputationService.findAll();		
	}
	
	@GetMapping("/{id}")
	public Imputation project(@PathVariable Long id) {
		return imputationService.findById(id);
	}
	
	@PostMapping("/create")
	@ResponseStatus(HttpStatus.CREATED)
	public Imputation create(@RequestBody Imputation imputation) {
		return imputationService.save(imputation);
	}
	
	@PutMapping("/update/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Imputation edit(@RequestBody Imputation imputation, @PathVariable Long id) {
		Imputation imputationDb = imputationService.findById(id);
		imputationDb.setProject(imputation.getProject());
		imputationDb.setTime(imputation.getTime());		
		return imputationService.save(imputationDb);
	}
	
	@DeleteMapping("/delete/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		imputationService.deleteById(id);
	}
	
	
}
