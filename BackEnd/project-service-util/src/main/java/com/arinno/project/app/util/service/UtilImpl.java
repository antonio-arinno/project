package com.arinno.project.app.util.service;

import java.util.Base64;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.util.repository.UserDao;

public class UtilImpl implements IUtil {
	
	@Autowired
	private IUserFeign userFeign;
	
//	@Autowired
//	private UserDao userDao;

	@Override
	public Company getCompany(String auth) {
		System.out.println("util");
		String[] chunks = auth.substring(7).split("\\.");
		Base64.Decoder decoder = Base64.getUrlDecoder();
		String payload = new String(decoder.decode(chunks[1]));
		JSONObject jsonObject = new JSONObject(payload);	
		String name = jsonObject.getString ("user_name"); 
//		return userDao.findByUsername(name).getCompany();
		return userFeign.findByUsername(name).getCompany();
	}

}
