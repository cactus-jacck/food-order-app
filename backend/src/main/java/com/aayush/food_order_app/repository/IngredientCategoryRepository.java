package com.aayush.food_order_app.repository;

import com.aayush.food_order_app.model.IngredientCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientCategoryRepository extends JpaRepository<IngredientCategory, Long>
{
    List<IngredientCategory> findByRestaurantId(long id);
}
