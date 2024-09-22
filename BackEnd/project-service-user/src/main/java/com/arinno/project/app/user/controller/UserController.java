package com.arinno.project.app.user.controller;

import java.util.Base64;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.User;
import com.arinno.project.app.user.service.IUserService;

@RestController
public class UserController {
	
	@Autowired
	private IUserService userService;
	
	@GetMapping("/")	
	public List<User> list(@RequestHeader(value="Authorization") String auth){
		return userService.findByCompany(getCompany(auth));	
	}	
		
	@GetMapping("/select/{term}")
	public List<User> listSelection(@PathVariable String term, @RequestHeader(value="Authorization") String auth){	
		return userService.findByNameContainingIgnoreCaseAndCompany(term, getCompany(auth));
	}	
	
	@GetMapping("/{id}")
	public User findByIdAndCompany(@PathVariable Long id, @RequestHeader(value="Authorization") String auth) {
		return userService.findByIdAndCompany(id, getCompany(auth));
	}		
	
	private Company getCompany(String auth) {
		String[] chunks = auth.substring(7).split("\\.");
		Base64.Decoder decoder = Base64.getUrlDecoder();
		String payload = new String(decoder.decode(chunks[1]));
		JSONObject jsonObject = new JSONObject(payload);		
		return userService.findByUsername(jsonObject.getString ("user_name"));	
	}		

}
