package com.aayush.food_order_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserFavourite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // ✅ This ensures the table has a primary key

    private long restaurantId;
    private String title;
    private String city;
    private String description;
    private String images;
    private String openingHours;
    private boolean open;
    private String ownerName;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserFavourite that = (UserFavourite) o;

        return title.equals(that.title) &&
                city.equals(that.city) &&
                user.getId() == that.user.getId(); // assuming user is unique
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, city, user.getId());
    }

}
