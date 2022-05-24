package com.ens.srs.user.auth.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.ens.srs.user.auth.login.dto.LoginDto;
import com.ens.srs.user.auth.login.dto.UserDto;
import com.ens.srs.user.auth.login.service.LoginService;

@Controller
public class LoginController {

	@Autowired
	private LoginService loginService;

	@GetMapping("/login")
	public String idLogin() {
		return "idLogin";
	}

	@GetMapping("/changePassword")
	public String changePassword() {
		return "changePassword";
	}
	
//	로그인
	@PostMapping("/api/user/login")
	public ResponseEntity login(@RequestBody LoginDto loginDto) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json;charset=UTF-8");
		headers.add("responseMessage", null);

		int checkId = -1;
		UserDto loginUser = null;

//		* responseMessage
//		0 : 아이디 틀림
//		1 : 아이디 일치
//		2 : 아이디 일치, 비밀번호 틀림
//		3 : 아이디 일치, 비밀번호 일치

		try {
			checkId = loginService.loginCheckId(loginDto.getUserId());
			if (checkId == 1) {
				headers.set("responseMessage", "1");

				try {
					loginUser = loginService.login(loginDto);
					if (loginUser == null) {
						headers.set("responseMessage", "2");
						return ResponseEntity.status(HttpStatus.UNAUTHORIZED).headers(headers).build();
					}

					headers.set("responseMessage", "3");
					return ResponseEntity.ok().headers(headers).body(loginUser);
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else {
				headers.set("responseMessage", "0");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).headers(headers).build();
	}

//	비밀번호 변경
	@PostMapping("/api/user/updatePassword")
	public ResponseEntity updatePW(@RequestBody LoginDto loginDto) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json;charset=UTF-8");
		headers.add("responseMessage", null);
		try {
			loginService.updatePW(loginDto);
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).headers(headers).build();
		}
		return ResponseEntity.ok().headers(headers).body("ok");
		
	}
	
//	비밀번호 체크
	@PostMapping("/api/user/getPassword")
	public ResponseEntity getPassword(@RequestBody LoginDto loginDto) {
		
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json;charset=UTF-8");
		headers.add("responseMessage", null);
		
		String oldPW = "";
		loginDto.setUserId(loginDto.getUserId());
		loginDto.setUserPw(loginDto.getUserPw());
		/*responseMessage
		 * 1 : 현재 비밀번호 일치
		 * 2,3 :현재 비밀번호 틀림
		 * */
		try {
			oldPW = loginService.getPassword(loginDto.getUserId());

			if (oldPW == null) {
				headers.set("responseMessage", "2");
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).headers(headers).build();
			}
			
			if(oldPW.equals(loginDto.getUserPw())) {
				headers.set("responseMessage", "1");
				return ResponseEntity.ok().headers(headers).body("ok");
			} else {
				headers.set("responseMessage", "3");
			}
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).headers(headers).build();
		} catch (Exception e) {
			e.printStackTrace();
		}
			
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).headers(headers).build();
	}

//	유저 정보 반환
	@PostMapping("/api/user/getuserinfo")
	public ResponseEntity getUserInfo(@RequestBody String userId) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json;charset=UTF-8");
		UserDto user = null;
		
		try {
			user = loginService.getUserInfo(userId);
			if(user != null) {
				return ResponseEntity.status(HttpStatus.OK).headers(headers).body(user);
			}else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).headers(headers).body(user);
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(headers).build();
	}
}
