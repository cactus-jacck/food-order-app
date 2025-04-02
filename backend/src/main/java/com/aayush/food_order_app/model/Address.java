package com.aayush.food_order_app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Address
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String streetName;

    private String city;

    private String state;

    private String postalCode;

    private String country;

    @Enumerated(EnumType.STRING)
    private AddressType addressType;

    private String customAddressType;

    @Override
    public String toString()
    {
        return "Address{" +
                "id=" + id +
                ", streetName='" + streetName + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", postalCode='" + postalCode + '\'' +
                ", country='" + country + '\'' +
                ", addressType=" + addressType +
                (addressType == AddressType.OTHER ? ", customAddressType='" + customAddressType + '\'' : "") +
                '}';
    }
}
