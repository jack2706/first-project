package com.kps.springBoot.configuration.properties;

import javax.validation.constraints.NotEmpty;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import com.kps.springBoot.configuration.properties.child.ApiUrl;

import lombok.Data;

@Data
@Component
@Validated
@PropertySource("classpath:application.properties")
@ConfigurationProperties("global")
public class GlobalProperties {
	
	private FtpFolder ftpFolder = new FtpFolder();
	private FtpInfoLogin ftpInfoLogin = new FtpInfoLogin();
	private ApiUrl apiUrl = new ApiUrl();
	
	@Data
	public static class FtpFolder {
		@NotEmpty
        private String base1;
		
		@NotEmpty
        private String base2;
		
		@NotEmpty
        private String tempUpload;
    }
	
	@Data
	public static class FtpInfoLogin {
		@NotEmpty
        private String uploadUrl;
		
		@NotEmpty
        private String server;
		
		@NotEmpty
        private String port;
		
		@NotEmpty
        private String userName;
		
		@NotEmpty
        private String password;
    }
}
