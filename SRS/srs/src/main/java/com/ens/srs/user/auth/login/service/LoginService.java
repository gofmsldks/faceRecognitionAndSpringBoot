package com.ens.srs.user.auth.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ens.srs.user.auth.login.dao.LoginDao;
import com.ens.srs.user.auth.login.dto.LoginDto;
import com.ens.srs.user.auth.login.dto.UserDto;

@Service
public class LoginService {

	@Autowired
	private LoginDao loginDao;

	public int loginCheckId(String userId) {
		return loginDao.loginCheckId(userId);
	}

	public UserDto login(LoginDto loginDto) {
		return loginDao.login(loginDto);
	}

	public String getPassword(String userId) {
		return loginDao.getPassword(userId);
	}
	
	public void updatePW(LoginDto loginDto) {
		loginDao.updatePW(loginDto);
	}
	
	public UserDto getUserInfo(String userId) {
		return loginDao.getUserInfo(userId);
	}
}
