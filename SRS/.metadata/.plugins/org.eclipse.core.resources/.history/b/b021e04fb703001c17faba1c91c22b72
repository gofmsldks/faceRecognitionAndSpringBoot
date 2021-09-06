package com.ens.srs;




import org.apache.logging.log4j.LogManager;
import org.slf4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@Slf4j

public class LoggingApplication {

    public static void main(String[] args) {
        SpringApplication.run(LoggingApplication.class, args);
        log.trace("Hi I'm {} log", "TRACE"); // lombok(@Slf4j 쓸땐 log)
        log.debug("Hi I'm {} log", "DEBUG"); //  
        log.info("Hi I'm {} log", "INFO");
        log.warn("Hi I'm {} log", "WARN");
        log.error("Hi I'm {} log", "ERROR");
    }

}
