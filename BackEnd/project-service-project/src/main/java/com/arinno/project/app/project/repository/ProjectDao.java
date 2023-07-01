package com.arinno.project.app.project.repository;

import org.springframework.data.repository.CrudRepository;

import com.arinno.project.app.model.entity.Project;

public interface ProjectDao extends CrudRepository<Project, Long> {

}
