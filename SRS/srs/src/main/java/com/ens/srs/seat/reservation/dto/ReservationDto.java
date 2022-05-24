package com.ens.srs.seat.reservation.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservationDto {
	private String idUser;
	private String nmUser;
	private String noSeat;
	private String cdTeam;
	private String nmTeam;
	private String cdRank;
	private String nmRank;
}
