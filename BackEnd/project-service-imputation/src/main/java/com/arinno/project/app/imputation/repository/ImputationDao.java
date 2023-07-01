package com.arinno.project.app.imputation.repository;

import org.springframework.data.repository.CrudRepository;

import com.arinno.project.app.model.entity.Imputation;

public interface ImputationDao extends CrudRepository<Imputation, Long> {

}
