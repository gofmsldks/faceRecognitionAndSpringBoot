package com.ens.srs.test.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ens.srs.test.dto.TestDto;

@Repository
public class TestDao {

	private static final String NAME_SPACE = "com.ens.srs.mappers.testmapper";

	@Autowired
	SqlSession sqlSession;

	public List<TestDto> userList() {
		return sqlSession.selectList(NAME_SPACE + ".userList");
	}

}
