package com.ens.srs.user.auth.facerecognition.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class FaceRecogController {

	static Map RECOG_RESULT = null;

	@GetMapping("/face-recognition")
	public String FaceRecog() {
		return "faceRecog";
	}

//	얼굴인식 결과 : 일치하는 사원의 사번, 일치율 반환
	@PostMapping("/api/user/get-face-result")
	public ResponseEntity getResult(@RequestBody Map result) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json;charset=UTF-8");
		if (RECOG_RESULT == null) {
			if (result.get("successResult") != null) {
				RECOG_RESULT = result;
			}
			return ResponseEntity.status(HttpStatus.CREATED).headers(headers).build();
		} else {
			Map finalResult = RECOG_RESULT;
			RECOG_RESULT = null;
			return ResponseEntity.status(HttpStatus.OK).headers(headers).body(finalResult);
		}
	}
}
