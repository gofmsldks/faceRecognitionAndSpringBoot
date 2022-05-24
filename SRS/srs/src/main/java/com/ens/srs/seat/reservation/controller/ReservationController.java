package com.ens.srs.seat.reservation.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.ens.srs.seat.reservation.dto.ReservationDto;
import com.ens.srs.seat.reservation.dto.ReserveUserDto;
import com.ens.srs.seat.reservation.dto.SeatInfoDto;
import com.ens.srs.seat.reservation.service.ReservationService;

@Controller
public class ReservationController {

	@Autowired
	private ReservationService reservationService;

	@GetMapping("/")
	public String reservation() {
		return "home";
	}

//	좌석 정보 반환
	@GetMapping("/api/seat/seatInfo")
	public ResponseEntity seatInfo() {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json;charset=UTF-8");
		List<SeatInfoDto> seatInfo = null;
		try {
			seatInfo = reservationService.getSeatInfo();
			if (seatInfo != null) {
				return ResponseEntity.status(HttpStatus.OK).headers(headers).body(seatInfo);
			} else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).headers(headers).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(headers).build();
	}

//	좌석 예약
	@PostMapping("/api/seat/reserve")
	public ResponseEntity seatReservation(@RequestBody ReservationDto reservationDto) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json;charset=UTF-8");

		try {
			int reserved = reservationService.checkReserve(reservationDto.getIdUser());
			if (reserved == 0) {
				try {
					reservationService.reserveSeat(reservationDto);
					return ResponseEntity.status(HttpStatus.CREATED).headers(headers).build();
				} catch (Exception e) {
					e.printStackTrace();
					return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(headers).build();
				}
			} else {
				return ResponseEntity.status(HttpStatus.OK).headers(headers).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(headers).build();
	}

//	좌석 예약 정보 반환
	@GetMapping("/api/seat/getStatus")
	public ResponseEntity getSeatStatus() {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json;charset=UTF-8");
		List<ReservationDto> seatStatusList = null;

		try {
			seatStatusList = reservationService.getStatus();
			if (seatStatusList != null) {
				return ResponseEntity.status(HttpStatus.OK).headers(headers).body(seatStatusList);
			} else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).headers(headers).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(headers).build();
	}

//	좌석 취소
	@PostMapping("/api/seat/cancel")
	public ResponseEntity seatCancel(@RequestBody ReserveUserDto reserveUserDto) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json;charset=UTF-8");
		String ownerId = null;

		try {
			ownerId = reservationService.checkOwner(reserveUserDto.getNoSeat());
			if (ownerId != null && ownerId.equals(reserveUserDto.getIdUser())) {
				reservationService.cancelSeat(reserveUserDto);
				return ResponseEntity.status(HttpStatus.OK).headers(headers).build();
			} else {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).headers(headers).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(headers).build();
	}

//	좌석 변경
	@PostMapping("/api/seat/change")
	public ResponseEntity seatChange(@RequestBody ReserveUserDto reserveUserDto) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json;charset=UTF-8");

		try {
			reservationService.changeSeat(reserveUserDto);
			return ResponseEntity.status(HttpStatus.OK).headers(headers).build();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(headers).build();
	}
	
//	얼굴 인식 예약
//	@PostMapping("/api/seat/face-reserve")
//	public ResponseEntity reserveWithFace(@RequestBody ReserveUserDto reserveUser) {
//		HttpHeaders headers = new HttpHeaders();
//		headers.add("Content-Type", "application/json;charset=UTF-8");
//		ReservationDto userInfo = null;
//		String userId = reserveUser.getIdUser();
//
//		try {
//			int reserved = reservationService.checkReserve(userId);
//			if (reserved == 0) {
//				try {
//					userInfo = reservationService.getUserInfo(userId);
//					if (userInfo != null) {
//						userInfo.setNoSeat(reserveUser.getNoSeat());
//						reservationService.reserveSeat(userInfo);
//						return ResponseEntity.status(HttpStatus.CREATED).headers(headers).build();
//					}
//
//				} catch (Exception e) {
//					e.printStackTrace();
//				}
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//
//		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(headers).build();
//	}
}
