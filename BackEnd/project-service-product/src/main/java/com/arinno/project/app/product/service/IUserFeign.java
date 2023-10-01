package com.arinno.project.app.product.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.arinno.project.app.model.entity.User;

@FeignClient(name="service-user")
public interface IUserFeign {

	@GetMapping("/users/search/findByUsername")
	public User findByUsername(@RequestParam String username);	
	
}
