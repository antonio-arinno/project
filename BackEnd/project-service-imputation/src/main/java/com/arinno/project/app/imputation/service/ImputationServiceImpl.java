package com.arinno.project.app.imputation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arinno.project.app.imputation.repository.ImputationDao;
import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.Imputation;
import com.arinno.project.app.model.entity.User;

@Service
public class ImputationServiceImpl implements IImputationService {
	
	@Autowired
	private ImputationDao imputationDao;
	
	@Autowired
	private IUserFeign userFeign; 	

	@Override
	@Transactional(readOnly = true)	
	public List<Imputation> findByUser(User user) {
		return (List<Imputation>) imputationDao.findByUser(user);
	}
	
	@Override
	@Transactional(readOnly = true)	
	public List<Imputation> findByCompany(Company company) {
		return (List<Imputation>) imputationDao.findByCompany(company);
	}	

	@Override
	public Imputation findByIdAndCompany(Long id, Company company) {
		return imputationDao.findByIdAndCompany(id, company);
	}

	@Override
	@Transactional
	public Imputation save(Imputation imputation) {
		return imputationDao.save(imputation);
	}

	@Override
	@Transactional
	public void deleteByIdAndCompany(Long id, Company company) {
		imputationDao.deleteByIdAndCompany(id, company);		
	}
	
	@Transactional
	public Company findCompanyByUsername(String name) {
		return userFeign.findByUsername(name).getCompany();
	}
	
	@Transactional
	public User findUserByUsername(String name) {
		return userFeign.findByUsername(name);
	}
	

}
