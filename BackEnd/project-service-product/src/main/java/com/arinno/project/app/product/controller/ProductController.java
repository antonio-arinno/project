package com.arinno.project.app.product.controller;

import java.util.Base64;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.Product;
import com.arinno.project.app.product.service.IProductService;


@RestController
public class ProductController {
	
	@Autowired
	private IProductService productService;
		
	@GetMapping("/")
	public List<Product> list(@RequestHeader(value="Authorization") String auth){	
		return productService.findByCompany(getCompany(auth));
	}		
	
	@GetMapping("/contributor/{id}")
	public List<Product> listNotProductionContributor(@PathVariable String id, @RequestHeader(value="Authorization") String auth){
		return productService.findByProjectNotProductionAndContributorAndCompany(Long.parseLong(id), getCompany(auth).getId());
	}	

	@GetMapping("/{id}")
	public Product product(@PathVariable Long id, @RequestHeader(value="Authorization") String auth) {
		return productService.findByIdAndCompany(id, getCompany(auth));
	}
	
	@PostMapping("/")	
	@ResponseStatus(HttpStatus.CREATED)
	public Product create(@RequestBody Product product, @RequestHeader(value="Authorization") String auth) {
		product.setCompany(getCompany(auth));
		return productService.save(product);
	}	
	
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Product edit(@RequestBody Product product, @PathVariable Long id, @RequestHeader(value="Authorization") String auth) {
		Product productDb = productService.findByIdAndCompany(id, getCompany(auth));
		productDb.setName(product.getName());
		productDb.setDescription(product.getDescription());
		productDb.setResponsible(product.getResponsible());
		return productService.save(productDb);
	}	
	
	@DeleteMapping("/{id}")	
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id, @RequestHeader(value="Authorization") String auth) {
		productService.deleteByIdAndCompany(id, getCompany(auth));
	}		
	
	
	@GetMapping("/select/{term}")
	public List<Product> listSelection(@PathVariable String term, @RequestHeader(value="Authorization") String auth){	
		return productService.findByNameContainingIgnoreCaseAndCompany(term, getCompany(auth));
	}	
	
	
	private Company getCompany(String auth) {
		String[] chunks = auth.substring(7).split("\\.");
		Base64.Decoder decoder = Base64.getUrlDecoder();
		String payload = new String(decoder.decode(chunks[1]));
		JSONObject jsonObject = new JSONObject(payload);		
		return productService.findByUsername(jsonObject.getString ("user_name"));	
	}	


}
