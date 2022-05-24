package com.ens.srs.room.reservation.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SelectItemDto {
	private String noConf;
	private String startDate;
	private String endDate;
	
	@Override
	public String toString() {
		return "selectItemDto [noConf=" + noConf + ", startDate=" + startDate + ", endDate=" + endDate + "]";
	}
}
