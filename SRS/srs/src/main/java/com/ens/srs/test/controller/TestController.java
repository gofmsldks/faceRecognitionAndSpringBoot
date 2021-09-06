package com.ens.srs.test.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.ens.srs.test.service.TestService;

@Controller
public class TestController {
	
	@Autowired
	TestService testService;
	
	@GetMapping("/")
	public String userList(Model model) {
		
		ArrayList<TestController> userList = (ArrayList)testService.userList();
		model.addAttribute("userList", userList);
		return "userList";
	}
}
