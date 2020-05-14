package com.kps.springBoot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
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
	
	@RequestMapping(value = { "/", "/index" }, method = RequestMethod.GET)
	public String index(ModelMap modelMap, ParamStudent param) {
		List<ParamStudent> data = studentService.findAll(param);
		System.out.println(globalProperties.getFtpInfoLogin().getPassword());
//		modelMap.put("message", email);
		return "index";
	}
	
}
