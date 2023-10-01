package com.arinno.project.app.product.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.Product;

public interface ProductDao extends CrudRepository<Product, Long>{
	
	public List<Product> findByCompany(Company company);
	
	public Product findByIdAndCompany(Long id, Company company);
	
	public void deleteByIdAndCompany(Long id, Company company);
	
	public List<Product> findByNameContainingIgnoreCaseAndCompany(String term, Company company);

}
