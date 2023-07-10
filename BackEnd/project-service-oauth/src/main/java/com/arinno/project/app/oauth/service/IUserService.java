package com.arinno.project.app.oauth.service;

import com.arinno.project.app.model.entity.User;

public interface IUserService {
	
	public User findByUsername(String username);

}
