package com.kps.springBoot.configuration.properties;

import javax.validation.constraints.NotEmpty;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import lombok.Data;

@Data
@Component
@Validated
@PropertySource("classpath:application.properties")
@ConfigurationProperties("spring.property")
public class AppProperties {
	
	@NotEmpty
	private String ftpServer;
	
	@NotEmpty
	private String ftpPort;
	
}
