package com.ens.srs.user.auth.login.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
	private String idUser;
	private String nmUser;
	private String cdTeam;
	private String nmTeam;
	private String cdRank;
	private String nmRank;
}
