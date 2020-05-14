package com.kps.springBoot.service;

import java.util.List;

import com.kps.springBoot.vo.ParamStudent;

public interface StudentService {
	public List<ParamStudent> findAll(ParamStudent param);
	
	public void update();
}
