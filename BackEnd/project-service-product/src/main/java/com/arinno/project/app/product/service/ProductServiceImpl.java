package com.arinno.project.app.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.Product;
import com.arinno.project.app.product.repository.ProductDao;

@Service
public class ProductServiceImpl implements IProductService {

	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private IUserFeign userFeign; 
	
	@Override
	@Transactional(readOnly = true)
	public List<Product> findByCompany(Company company) {
		return (List<Product>) productDao.findByCompany(company);
	}		
	
	@Override
	public Product findByIdAndCompany(Long id, Company company) {
		return productDao.findByIdAndCompany(id, company);
	}	
	
	@Override
	@Transactional
	public Product save(Product product) {
		return productDao.save(product);
	}	
	
	@Override
	@Transactional
	public void deleteByIdAndCompany(Long id, Company company) {
		productDao.deleteByIdAndCompany(id, company);
	}	
	
	@Transactional
	public Company findByUsername(String name) {
		return userFeign.findByUsername(name).getCompany();
	}

	@Override
	@Transactional
	public List<Product> findByNameContainingIgnoreCaseAndCompany(String term, Company company) {
		return productDao.findByNameContainingIgnoreCaseAndCompany(term, company);
	}	
	

}
