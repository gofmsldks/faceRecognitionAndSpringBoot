package com.ens.srs.user.information.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.ens.srs.user.auth.login.dto.UserDto;
import com.ens.srs.user.information.dto.TeamDto;
import com.ens.srs.user.information.service.InformationService;

@Controller
public class InformationController {
	
	@Autowired
	private InformationService informationService;
	
	@PostMapping("/api/user/info")
	public ResponseEntity userInfo(@RequestBody String userId) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json;charset=UTF-8");
		UserDto userInfo = null;
		
		try {
			userInfo = informationService.getUserInfo(userId);
			
			if (userInfo == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).headers(headers).build();
			}

			return ResponseEntity.ok().headers(headers).body(userInfo);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(headers).build();
	}
	
	@GetMapping("/api/user/teams")
	public ResponseEntity getTeams() {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json;charset=UTF-8");
		List<TeamDto> teams = null;
		
		try {
			teams = informationService.getTeams();
			if(teams != null) {
				return ResponseEntity.status(HttpStatus.OK).headers(headers).body(teams);
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(headers).build();
	}
	
	@PostMapping("/api/user/getmembers")
	public ResponseEntity getMembers(@RequestBody String cdTeam) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json;charset=UTF-8");
		List<UserDto> members = null;
		
		try {
			members = informationService.getMembers(cdTeam);
			if(members != null) {
				return ResponseEntity.status(HttpStatus.OK).headers(headers).body(members);
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(headers).build();
	}
}
