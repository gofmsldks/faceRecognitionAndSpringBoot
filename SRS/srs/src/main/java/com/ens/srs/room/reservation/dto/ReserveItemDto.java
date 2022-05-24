package com.ens.srs.room.reservation.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReserveItemDto {

	private String noConf;
	private String startDate;
	private String endDate;
	private String startTime;
	private String endTime;
	private String contents;

	private String idUser;
	private String nmUser;
	private String cdTeam;
	private String nmTeam;
	private String cdRank;
	private String nmRank;

	@Override
	public String toString() {
		return "ReserveItemDto [noConf=" + noConf + ", startDate=" + startDate + ", endDate=" + endDate + ", startTime="
				+ startTime + ", endTime=" + endTime + ", contents=" + contents + ", idUser=" + idUser + ", nmUser="
				+ nmUser + ", cdTeam=" + cdTeam + ", nmTeam=" + nmTeam + ", cdRank=" + cdRank + ", nmRank=" + nmRank
				+ "]";
	}

}
