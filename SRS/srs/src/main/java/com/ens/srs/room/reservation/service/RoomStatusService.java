package com.ens.srs.room.reservation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ens.srs.room.reservation.dao.RoomStatusDao;
import com.ens.srs.room.reservation.dto.ReserveItemDto;

@Service
public class RoomStatusService {
	@Autowired
	RoomStatusDao roomStatusDao;
	
	public List<ReserveItemDto> getAllStatus() {
		return roomStatusDao.getAllStatus();
	}
}
