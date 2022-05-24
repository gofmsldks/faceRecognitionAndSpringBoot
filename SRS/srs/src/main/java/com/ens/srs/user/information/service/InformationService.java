package com.ens.srs.user.information.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ens.srs.user.auth.login.dto.UserDto;
import com.ens.srs.user.information.dao.InformationDao;
import com.ens.srs.user.information.dto.TeamDto;

@Service
public class InformationService {

	@Autowired
	private InformationDao informationDao;

	public UserDto getUserInfo(String userId) {
		return informationDao.getUserInfo(userId);
	}

	public List<TeamDto> getTeams() {
		return informationDao.getTeams();
	}

	public List<UserDto> getMembers(String cdTeam) {
		return informationDao.getMembers(cdTeam);
	}
}
