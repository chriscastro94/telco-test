package com.consulti;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TemplateSpringbootApplication implements CommandLineRunner {
	private final Logger logger = LoggerFactory.getLogger(TemplateSpringbootApplication.class);
	
	public static void main(String[] args) {
		SpringApplication.run(TemplateSpringbootApplication.class, args);
	}

	@Override
	public void run(String... strings) throws Exception {
		logger.info("TEST TELCO MS [STATUS: OK]");
	}
	
}
