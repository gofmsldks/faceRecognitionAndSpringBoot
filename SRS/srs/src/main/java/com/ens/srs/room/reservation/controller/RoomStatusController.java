package com.ens.srs.room.reservation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.ens.srs.room.reservation.dto.ReserveItemDto;
import com.ens.srs.room.reservation.service.RoomStatusService;

@Controller
public class RoomStatusController {
	
	@Autowired
	RoomStatusService roomStatusService;
	
	@GetMapping("/room-status")
	public String reservation() {
		return "roomStatus";
	}
	
	@GetMapping("/api/room/getAllStatus")
	public ResponseEntity getAllStatus() {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json;charset=UTF-8");
		List<ReserveItemDto> statusList = null;
		
		try {
			statusList = roomStatusService.getAllStatus();
			if(statusList != null) {
				return ResponseEntity.status(HttpStatus.OK).headers(headers).body(statusList);
			}else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).headers(headers).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(headers).build();
	}
}
