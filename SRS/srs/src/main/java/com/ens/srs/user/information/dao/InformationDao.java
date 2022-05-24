package com.ens.srs.user.information.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ens.srs.user.auth.login.dto.UserDto;
import com.ens.srs.user.information.dto.TeamDto;

@Repository
public class InformationDao {
	private static final String NAME_SPACE = "com.ens.srs.mappers.usermapper";

	@Autowired
	SqlSession sqlSession;

	public UserDto getUserInfo(String userId) {
		return sqlSession.selectOne(NAME_SPACE + ".getUserInfo", userId);
	}

	public List<TeamDto> getTeams() {
		return sqlSession.selectList(NAME_SPACE + ".getTeams");
	}

	public List<UserDto> getMembers(String cdTeam) {
		return sqlSession.selectList(NAME_SPACE + ".getMembers", cdTeam);
	}
}
