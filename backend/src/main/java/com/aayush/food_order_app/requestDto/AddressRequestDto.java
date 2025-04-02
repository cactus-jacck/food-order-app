package com.aayush.food_order_app.requestDto;

import com.aayush.food_order_app.model.AddressType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddressRequestDto
{
    private String streetName;

    private String city;

    private String state;

    private String postalCode;

    private String country;

    private AddressType addressType;

    private String customAddressType;

    @Override
    public String toString()
    {
        return "AddressRequestDto{" +
                "streetName='" + streetName + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", postalCode='" + postalCode + '\'' +
                ", country='" + country + '\'' +
                ", addressType=" + addressType +
                ", customAddressType='" + customAddressType + '\'' +
                '}';
    }
}
