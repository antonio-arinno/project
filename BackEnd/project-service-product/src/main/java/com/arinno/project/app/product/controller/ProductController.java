package com.arinno.project.app.product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.arinno.project.app.model.entity.Product;
import com.arinno.project.app.product.service.IProductService;

@RestController
public class ProductController {
	
	@Autowired
	private IProductService productService;
	
	@GetMapping("/list")
	public List<Product> list(){
		return productService.findAll();
	}
	
	@GetMapping("/{id}")
	public Product product(@PathVariable Long id) {
		return productService.findById(id);
	}

}
