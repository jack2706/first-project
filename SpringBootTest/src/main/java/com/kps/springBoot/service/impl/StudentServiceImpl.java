package com.kps.springBoot.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kps.springBoot.dao.StudentDao;
import com.kps.springBoot.service.StudentService;
import com.kps.springBoot.vo.ParamStudent;

@Service
public class StudentServiceImpl implements StudentService {

	@Autowired
	private StudentDao studentDao;
	
	@Override
	public List<ParamStudent> findAll(ParamStudent param) {
		return studentDao.findAll(param);
	}

//	propagation = Propagation.REQUIRED, readOnly = false
	@Override
	@Transactional(rollbackFor = {Exception.class, RuntimeException.class, Throwable.class})
	public void update() {
		studentDao.update1();
//		studentDao.update2();
	}

}
