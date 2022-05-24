package com.ens.srs.room.reservation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.ens.srs.room.reservation.dto.ReserveItemDto;
import com.ens.srs.room.reservation.dto.SelectItemDto;
import com.ens.srs.room.reservation.service.RoomReservationService;

@Controller
public class RoomReservationController {

	@Autowired
	RoomReservationService roomReservationService;

	@GetMapping("/room-reservation")
	public String reservation() {
		return "reserveRoom";
	}
	
//	예약된 회의 목록 반환
	@PostMapping("/api/room/getList")
	public ResponseEntity getReserveList(@RequestBody SelectItemDto selectItemDto) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json;charset=UTF-8");
		List<ReserveItemDto> reservationList = null;

		try {
			reservationList = roomReservationService.getList(selectItemDto);
			if (reservationList != null) {
				return ResponseEntity.status(HttpStatus.OK).headers(headers).body(reservationList);
			} else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).headers(headers).build();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(headers).build();
	}

//	회의실 예약
	@PostMapping("/api/room/reserve")
	public ResponseEntity roomReservation(@RequestBody ReserveItemDto reserveItemDto) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json;charset=UTF-8");

		try {
			boolean result = roomReservationService.reserve(reserveItemDto);
			if (result) {
				return ResponseEntity.status(HttpStatus.CREATED).headers(headers).build();
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).headers(headers).build();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(headers).build();
	}

//	회의실 취소
	@PostMapping("/api/room/cancel")
	public ResponseEntity cancelReservation(@RequestBody ReserveItemDto reserveItemDto) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json;charset=UTF-8");
		
		try {
			boolean result = roomReservationService.cancel(reserveItemDto);
			if(result) {
				return ResponseEntity.status(HttpStatus.OK).headers(headers).build();
			}else {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).headers(headers).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(headers).build();
	}
}
