package com.aayush.food_order_app.reponseDto;

import com.aayush.food_order_app.model.USER_ROLE;
import lombok.Data;

@Data
public class AuthResponseDto
{
    private String jwt;

    private String message;

    private USER_ROLE role;

}
