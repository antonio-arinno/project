package com.arinno.project.app.imputation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arinno.project.app.imputation.repository.ImputationDao;
import com.arinno.project.app.model.entity.Imputation;

@Service
public class ImputationServiceImpl implements IImputationService {
	
	@Autowired
	private ImputationDao imputationDao;

	@Override
	public List<Imputation> findAll() {
		return (List<Imputation>) imputationDao.findAll();
	}

	@Override
	public Imputation findById(Long id) {
		return imputationDao.findById(id).orElse(null);
	}

}
