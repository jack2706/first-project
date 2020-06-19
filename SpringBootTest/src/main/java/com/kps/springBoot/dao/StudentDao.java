package com.kps.springBoot.dao;

import java.util.List;

import com.kps.springBoot.configuration.jwt.UserLoginInfo;
import com.kps.springBoot.vo.ParamStudent;

public interface StudentDao {
	public List<ParamStudent> findAll(ParamStudent param);
	public UserLoginInfo findUser(String username);
	
	public void update1();
	public void update2();
}
