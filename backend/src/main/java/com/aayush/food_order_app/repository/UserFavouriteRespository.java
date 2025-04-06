package com.aayush.food_order_app.repository;

import com.aayush.food_order_app.model.UserFavourite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserFavouriteRespository extends JpaRepository<UserFavourite, Long>
{
}
