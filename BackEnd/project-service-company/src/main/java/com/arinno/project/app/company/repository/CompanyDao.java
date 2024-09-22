package com.arinno.project.app.company.repository;

import org.springframework.data.repository.CrudRepository;

import com.arinno.project.app.model.entity.Company;

public interface CompanyDao extends CrudRepository<Company, Long> {

}
