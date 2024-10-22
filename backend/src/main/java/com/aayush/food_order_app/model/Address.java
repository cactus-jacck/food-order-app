package com.aayush.food_order_app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Address
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String streetName;

    private String city;

    private String state;

    private String postalCode;

    private String country;

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
                '}';
    }
}
