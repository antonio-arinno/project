package com.arinno.project.app.product.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.Product;
//import com.arinno.project.app.model.entity.Status;


public interface ProductDao extends CrudRepository<Product, Long>{
	
	public List<Product> findByCompany(Company company);

//	@Query("select p from Product p left join p.projects pr on p.id = pr.product.id left join pr.contributors prc where prc.id = ?1 and pr.status <> ?2 and p.company.id = ?3")
//	public List<Product> findByContributorAndCompany(Long id, Status status, Long company_id);
	
	
	@Query("select p from Product p left join p.projects pr on p.id = pr.product.id left join pr.contributors prc where prc.id = ?1 and pr.status <> Status.PRODUCTION and p.company.id = ?2")
	public List<Product> findByNotProductionAndContributorAndCompany(Long id, Long company_id);
	
	public Product findByIdAndCompany(Long id, Company company);
	
	public void deleteByIdAndCompany(Long id, Company company);
	
	public List<Product> findByNameContainingIgnoreCaseAndCompany(String term, Company company);

}
