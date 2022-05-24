package com.ens.srs.seat.reservation.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ens.srs.seat.reservation.dto.ReservationDto;
import com.ens.srs.seat.reservation.dto.ReserveUserDto;
import com.ens.srs.seat.reservation.dto.SeatInfoDto;

@Repository
public class ReservationDao {
	private static final String NAME_SPACE = "com.ens.srs.mappers.seatmapper";

	@Autowired
	SqlSession sqlSession;

	public List<SeatInfoDto> getSeatInfo() {
		return sqlSession.selectList(NAME_SPACE + ".getSeatInfo");
	}

	public int checkReserve(String userId) {
		return sqlSession.selectOne(NAME_SPACE + ".checkReserve", userId);
	}

	public void reserveSeat(ReservationDto reservationDto) {
		sqlSession.insert(NAME_SPACE + ".reserve", reservationDto);
	}

	public List<ReservationDto> getStatus() {
		return sqlSession.selectList(NAME_SPACE + ".getStatus");
	}

	public String checkOwner(String noSeat) {
		return sqlSession.selectOne(NAME_SPACE + ".checkOwner", noSeat);
	}

	public void cancelSeat(ReserveUserDto reserveUserDto) {
		sqlSession.delete(NAME_SPACE + ".cancel", reserveUserDto);
	}

	public void changeSeat(ReserveUserDto reserveUserDto) {
		sqlSession.update(NAME_SPACE + ".change", reserveUserDto);
	}
	
	public ReservationDto getUserInfo(String idUser) {
		return sqlSession.selectOne(NAME_SPACE + ".getUserInfo", idUser);
	}
}
