package com.ens.srs.test.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ens.srs.test.dao.TestDao;
import com.ens.srs.test.dto.TestDto;

@Service
public class TestService {

	@Autowired
	private TestDao testDao;
	
	public List<TestDto> userList(){
		return testDao.userList();
	}
}
