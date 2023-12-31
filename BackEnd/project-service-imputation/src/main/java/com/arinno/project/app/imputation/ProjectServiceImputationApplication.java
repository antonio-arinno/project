package com.arinno.project.app.imputation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients	 
@EnableDiscoveryClient
@SpringBootApplication
@EntityScan({"com.arinno.project.app.model.entity"})
public class ProjectServiceImputationApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectServiceImputationApplication.class, args);
	}

}
