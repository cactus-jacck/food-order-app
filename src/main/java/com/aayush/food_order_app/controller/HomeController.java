package com.aayush.food_order_app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController
{
    @GetMapping("/")
    public ResponseEntity<String> homeController()
    {
        System.out.println("Hello");
        return new ResponseEntity<>("Welcome", HttpStatus.OK);
    }
}
