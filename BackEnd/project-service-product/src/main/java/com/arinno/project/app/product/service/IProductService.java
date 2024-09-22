package com.arinno.project.app.product.service;

import java.util.List;

import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.Product;

public interface IProductService {

	public List<Product> findByCompany(Company company);
	
	public List<Product> findByProjectNotProductionAndContributorAndCompany(Long id, Long company_id);
	
	public Product findByIdAndCompany(Long id, Company company);
	
	public Product save(Product product);
		
	public void deleteByIdAndCompany(Long id, Company company);
	
	public List<Product> findByNameContainingIgnoreCaseAndCompany(String term, Company company);

	public Company findByUsername(String name);
	
}
