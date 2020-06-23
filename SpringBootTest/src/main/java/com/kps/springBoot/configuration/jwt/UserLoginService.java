package com.kps.springBoot.configuration.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kps.springBoot.dao.StudentDao;

@Service
public class UserLoginService implements UserDetailsService {
	
	@Autowired
	private StudentDao studentDao;
	
	final String ROLE_PREFIX = "ROLE_";

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserLoginInfo userInfo = studentDao.findUser(username);
		if(userInfo == null) {
			throw new UsernameNotFoundException("User not found.");
		}
		userInfo.setRole(ROLE_PREFIX + (username.equals("00000000") ? "ADMIN" : "USER"));
		return new CustomUserDetails(userInfo);
	}

}
