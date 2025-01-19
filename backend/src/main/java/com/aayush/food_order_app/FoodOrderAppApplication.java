package com.aayush.food_order_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.aayush.food_order_app.model") // Only scan entity package
public class FoodOrderAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodOrderAppApplication.class, args);
	}

}
