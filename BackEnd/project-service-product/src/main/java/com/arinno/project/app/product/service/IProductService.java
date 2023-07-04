package com.arinno.project.app.product.service;

import java.util.List;

import com.arinno.project.app.model.entity.Product;

public interface IProductService {
	
	public List<Product> findAll();
	
	public Product findById(Long id);
	
	public Product save(Product product);
	
	public void deleteById(Long id);

}
