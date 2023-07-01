package com.arinno.project.app.product.repository;

import org.springframework.data.repository.CrudRepository;

import com.arinno.project.app.model.entity.Product;

public interface ProductDao extends CrudRepository<Product, Long>{

}
