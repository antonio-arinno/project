package com.arinno.project.app.user.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.User;
import com.arinno.project.app.user.repository.UserDao;

@Service
public class UserServiceImpl implements IUserService  {
	
	@Autowired
	private UserDao userDao;

	@Override
	@Transactional(readOnly = true)
	public List<User> findByCompany(Company company) {
		return (List<User>) userDao.findByCompany(company);
	}

	@Override
	@Transactional
	public User save(User user) {
		return userDao.save(user);
	}

	@Override
	@Transactional
	public void deleteByIdAndCompany(Long id, Company company) {
		userDao.deleteByIdAndCompany(id, company);
		
	}

	@Override
	@Transactional
	public List<User> findByNameContainingIgnoreCaseAndCompany(String term, Company company) {
		return userDao.findByNameContainingIgnoreCaseAndCompany(term, company);
	}

	@Override
	public Company findByUsername(String name) {
		return userDao.findByUsername(name).getCompany();
	}

	@Override
	@Transactional
	public User findByIdAndCompany(Long id, Company company) {
		return userDao.findByIdAndCompany(id, company);
	}
	


}
