package com.arinno.project.app.product.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.Product;
import com.arinno.project.app.model.entity.Project;
import com.arinno.project.app.model.entity.Status;
import com.arinno.project.app.model.entity.User;
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
	@Transactional(readOnly = true)
	public List<Product> findByProjectNotProductionAndContributorAndCompany(Long id, Long company_id) {	
		
//	    List<Product> productsTMP = productDao.findByContributorAndCompany(id, Status.PRODUCTION, company_id);
	    List<Product> productsTMP = productDao.findByNotProductionAndContributorAndCompany(id, company_id);
	    List<Product> products = new ArrayList<Product>();
	    
	    for (Product productTMP : productsTMP) {
	    	System.out.println(productTMP.getName());
	    	Product product = new Product();
	    	product.setId(productTMP.getId());
	    	product.setName(productTMP.getName());
	    	product.setDescription(productTMP.getDescription());
	    	product.setResponsible(productTMP.getResponsible());
	    	product.setCreateAt(productTMP.getCreateAt());
	    	product.setCompany(productTMP.getCompany());
	    	List<Project> projects = new ArrayList<Project>();
	    	for (Project projectTMP: productTMP.getProjects()){
	    		System.out.println(projectTMP.getStatus());
	    		if (projectTMP.getStatus() != Status.PRODUCTION) {
	    			for (User contributorTMP: projectTMP.getContributors()) {
	    				if (contributorTMP.getId().equals(id)) {	    			
			    			Project project = new Project();
			    			project.setId(projectTMP.getId());
			    			project.setName(projectTMP.getName());
			    			project.setDescription(projectTMP.getDescription());
			    			project.setResponsible(projectTMP.getResponsible());
			    			project.setContributors(projectTMP.getContributors());
			    			project.setStatus(projectTMP.getStatus());
			    			project.setCreateAt(projectTMP.getCreateAt());
			    			project.setCompany(projectTMP.getCompany());
			    			projects.add(project);
	    				}
	    			}
	    		}	    		
	    		product.setProjects(projects);
	    	}
	    	products.add(product);
	    }
		return products;
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
