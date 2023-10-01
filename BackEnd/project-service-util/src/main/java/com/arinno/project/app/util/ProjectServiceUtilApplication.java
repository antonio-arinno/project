package com.arinno.project.app.util;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
//import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableDiscoveryClient
@SpringBootApplication
@EntityScan({"com.arinno.project.app.model.entity"})
public class ProjectServiceUtilApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectServiceUtilApplication.class, args);
	}

}
