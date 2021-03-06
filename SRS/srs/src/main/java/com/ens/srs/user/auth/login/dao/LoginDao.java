package com.ens.srs.user.auth.login.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ens.srs.user.auth.login.dto.LoginDto;
import com.ens.srs.user.auth.login.dto.UserDto;

@Repository
public class LoginDao {
	private static final String NAME_SPACE = "com.ens.srs.mappers.usermapper";

	@Autowired
	SqlSession sqlSession;

	public int loginCheckId(String userId) {
		return sqlSession.selectOne(NAME_SPACE + ".loginCheckId", userId);
	}

	public UserDto login(LoginDto loginDto) {
		return sqlSession.selectOne(NAME_SPACE + ".login", loginDto);
	}

	public String getPassword(String userId) {
		return sqlSession.selectOne(NAME_SPACE + ".getPassword", userId);
	}

	public void updatePW(LoginDto loginDto) {
		sqlSession.selectOne(NAME_SPACE + ".updatePassword", loginDto);
	}

	public UserDto getUserInfo(String userId) {
		return sqlSession.selectOne(NAME_SPACE + ".getUserInfo", userId);
	}
}
