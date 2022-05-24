package com.ens.srs.room.reservation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ens.srs.room.reservation.dao.RoomReservationDao;
import com.ens.srs.room.reservation.dto.ReserveItemDto;
import com.ens.srs.room.reservation.dto.SelectItemDto;

@Service
public class RoomReservationService {

	@Autowired
	RoomReservationDao roomReservationDao;

	public List<ReserveItemDto> getList(SelectItemDto selectItemDto) {
		return roomReservationDao.getList(selectItemDto);
	}

	public boolean reserve(ReserveItemDto reserveItemDto) {
		boolean isDuplicated = false;
		String taragetDate = reserveItemDto.getStartDate();
		String targetStart = reserveItemDto.getStartTime();
		String targetEnd = reserveItemDto.getEndTime();
		
		SelectItemDto selectItemDto = new SelectItemDto();
		selectItemDto.setStartDate(reserveItemDto.getStartDate());
		selectItemDto.setEndDate(reserveItemDto.getEndDate());
		selectItemDto.setNoConf(reserveItemDto.getNoConf());

		List<ReserveItemDto> reservationList = roomReservationDao.getList(selectItemDto);

		for (ReserveItemDto item : reservationList) {
			String startTime = item.getStartTime();
			String endTime = item.getEndTime();

			if (targetStart.compareTo(endTime) < 0 && targetEnd.compareTo(startTime) > 0) {
				isDuplicated = true;
				break;
			}
		}

		if (isDuplicated) {
			return false;
		}

		roomReservationDao.reserve(reserveItemDto);

		return true;
	}
	
	public boolean cancel(ReserveItemDto reserveItemDto) {
		try {
			int check = roomReservationDao.checkBeforeCancel(reserveItemDto);
			if(check == 1) {
				roomReservationDao.cancel(reserveItemDto);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return false;
	}
}
