package com.aayush.food_order_app.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.NamedEntityGraph;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;

@Embeddable
@Data
public class RestaurantDTO
{
    private long id;

    private String title;

    @Column(length = 1000)
    private List<String> images;

    private String description;

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
