package com.aayush.food_order_app.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.List;
import java.util.Objects;

@Embeddable
@Data
public class RestaurantDTO
{
    private long id;

    private String title;

    @Column(length = 1000)
    private String images;

    private String description;

    private String ownerName;

    private String city;

    private String openingHours;

    private boolean open;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RestaurantDTO that = (RestaurantDTO) o;
        return id == that.id;  // Compare based on id
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);  // Use id in hashCode
    }
}
