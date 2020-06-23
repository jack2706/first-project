package com.kps.springBoot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kps.springBoot.service.StudentService;
import com.kps.springBoot.vo.ParamStudent;

@RestController
public class MainRestController {
	
	@Autowired
	private StudentService studentService;
	
	@PostMapping("/update")
	public void update(ModelMap modelMap, ParamStudent param) {
		studentService.update();
	}
	
	@GetMapping("/admin")
	public void admin(ModelMap modelMap, ParamStudent param) {
		System.out.println("admin");
	}
	@GetMapping("/user")
	public void user(ModelMap modelMap, ParamStudent param) {
		System.out.println("user");
	}
	
}
