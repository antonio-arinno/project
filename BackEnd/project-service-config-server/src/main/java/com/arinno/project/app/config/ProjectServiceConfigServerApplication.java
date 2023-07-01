package com.arinno.project.app.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@EnableConfigServer
@SpringBootApplication
public class ProjectServiceConfigServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectServiceConfigServerApplication.class, args);
	}

}
