package com.kps.springBoot.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kps.springBoot.configuration.properties.GlobalProperties;
import com.kps.springBoot.service.StudentService;
import com.kps.springBoot.vo.ParamStudent;


@Controller
public class MainController {
	
	@Autowired
	private StudentService studentService;
	
	@Autowired
	private GlobalProperties globalProperties;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
		
	@GetMapping("/login")
	public String login(ModelMap modelMap, ParamStudent param) {
//		System.out.println(passwordEncoder.encode("123456"));
		return "loginPage";
	}
	
	@GetMapping(value = { "/", "/index" })
	public String index(ModelMap modelMap, ParamStudent param) {
		List<ParamStudent> data = studentService.findAll(param);
		System.out.println(globalProperties.getFtpInfo().getPassword());
//		modelMap.put("message", email);
		return "index";
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logoutPage (HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {    
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "loginPage";
    }
	
//	web.xml
//	<filter>
//	    <filter-name>deviceResolverRequestFilter</filter-name>
//	    <filter-class>org.springframework.mobile.device.DeviceResolverRequestFilter</filter-class>
//	</filter>
	
//	pom.xml
//	<dependency>
//	    <groupId>org.springframework.mobile</groupId>
//	    <artifactId>spring-mobile-device</artifactId>
//	    <version>1.1.5.RELEASE</version>
//	</dependency>
	
//	servlet-context.xml
//	<annotation-driven>
//	  	<argument-resolvers>
//	  		<beans:bean class="org.springframework.mobile.device.DeviceWebArgumentResolver" />
//	  	</argument-resolvers>
//	</annotation-driven>
	
//	Device device = DeviceUtils.getCurrentDevice(request);
//	if(device.isNormal()) {
//        System.out.println("browser");
//    }else if(device.isMobile()) {
//    	System.out.println("mobile");
//    }else if(device.isTablet()) {
//    	System.out.println("tablet");
//    }
	
}
