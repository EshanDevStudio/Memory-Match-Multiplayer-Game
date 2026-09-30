package com.emj.memory_match_multiplayer_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/secure")
public class test {

    @GetMapping("/hello")
    public String testSec(){
        return "Secure data..!";
    }
}
