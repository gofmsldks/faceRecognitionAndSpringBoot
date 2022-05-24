package com.ens.srs.remotework.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewStateController {
	@GetMapping("/view-remote")
	public String reservation() {
		return "remoteWork";
	}
}
