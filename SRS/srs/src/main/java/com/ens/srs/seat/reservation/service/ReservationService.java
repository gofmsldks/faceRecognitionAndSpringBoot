package com.ens.srs.seat.reservation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ens.srs.seat.reservation.dao.ReservationDao;
import com.ens.srs.seat.reservation.dto.ReservationDto;
import com.ens.srs.seat.reservation.dto.ReserveUserDto;
import com.ens.srs.seat.reservation.dto.SeatInfoDto;

@Service
public class ReservationService {
	
	@Autowired
	private ReservationDao reservationDao;
	
	public List<SeatInfoDto> getSeatInfo(){
		return reservationDao.getSeatInfo();
	}
	
	public int checkReserve(String userId) {
		return reservationDao.checkReserve(userId);
	}
	
	public void reserveSeat(ReservationDto reservationDto) {
		reservationDao.reserveSeat(reservationDto); 
	}
	
	public List<ReservationDto> getStatus() {
		return reservationDao.getStatus();
	}
	
	public String checkOwner(String noSeat) {
		return reservationDao.checkOwner(noSeat);
	}
	
	public void cancelSeat(ReserveUserDto reserveUserDto) {
		reservationDao.cancelSeat(reserveUserDto);
	}
	
	public void changeSeat(ReserveUserDto reserveUserDto) {
		reservationDao.changeSeat(reserveUserDto);
	}
	
	public ReservationDto getUserInfo(String idUser) {
		return reservationDao.getUserInfo(idUser);
	}
}
