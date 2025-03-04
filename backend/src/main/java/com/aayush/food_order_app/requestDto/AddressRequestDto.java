package com.aayush.food_order_app.requestDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddressRequestDto
{
    private long id;

    private String streetName;

    private String city;

    private String state;

    private String postalCode;

    private String country;
}
