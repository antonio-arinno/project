package com.arinno.project.app.company.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.arinno.project.app.company.service.ICompanyService;
import com.arinno.project.app.model.entity.Company;

@RestController
public class CompanyController {
	
	@Autowired
	private ICompanyService companyService;
	
	@PostMapping("/")
	@ResponseStatus(HttpStatus.CREATED)
	public Company create(@RequestBody Company company) {
		return companyService.save(company);
	}	

}
