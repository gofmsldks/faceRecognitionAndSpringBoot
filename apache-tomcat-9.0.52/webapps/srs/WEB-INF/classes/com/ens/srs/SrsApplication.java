package com.ens.srs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class SrsApplication extends SpringBootServletInitializer {

	@Override
	  protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
	    return builder.sources(SrsApplication.class);
	  }

	public static void main(String[] args) {
		SpringApplication.run(SrsApplication.class, args);
	}

}
