package com.pire.api.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pire.api.dto.account.CreateInstructorDto;
import com.pire.api.dto.account.InstructorLoginDto;
import com.pire.api.dto.account.InstructorView;
import com.pire.api.servise.InstructorService;

@RestController
@RequestMapping(path = "api/instructor")
public class InstructorController {

	@Autowired
	InstructorService service;
	
	@PostMapping("/create")
	public ResponseEntity<InstructorView> createInstructor(@RequestBody @Valid CreateInstructorDto dto){
		return ResponseEntity.ok().body(service.createInstructor(dto));
	}
	
	
	@GetMapping("/login/{email}")
	public ResponseEntity<InstructorLoginDto> login(
			@PathVariable(name = "email", required = true) String email)
	{
		return ResponseEntity.ok(service.login(email));
	}
}