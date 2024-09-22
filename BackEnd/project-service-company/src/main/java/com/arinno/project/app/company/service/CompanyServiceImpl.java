package com.arinno.project.app.company.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arinno.project.app.company.repository.CompanyDao;
import com.arinno.project.app.model.entity.Company;

@Service
public class CompanyServiceImpl implements ICompanyService {
	
	@Autowired
	private CompanyDao companyDao;

	@Override
	@Transactional	
	public Company save(Company company) {
		return companyDao.save(company);
	}

}
