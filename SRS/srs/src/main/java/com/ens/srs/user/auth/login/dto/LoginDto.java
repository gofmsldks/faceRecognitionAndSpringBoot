package com.ens.srs.user.auth.login.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDto {
	private String userId;
	private String userPw;
}
