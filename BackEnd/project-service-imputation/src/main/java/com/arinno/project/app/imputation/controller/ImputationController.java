package com.arinno.project.app.imputation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
}
