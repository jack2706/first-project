package com.kps.springBoot.configuration.properties.apiUrl;

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
@ConfigurationProperties("global.api-url")
public class ApiUrl {
	@NotEmpty
    private String tlesToken;
}
