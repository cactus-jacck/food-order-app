package com.aayush.food_order_app.controller;

import com.aayush.food_order_app.model.Category;
import com.aayush.food_order_app.model.User;
import com.aayush.food_order_app.service.CategoryService;
import com.aayush.food_order_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/admin/category")
public class CategoryController
{
    private CategoryService categoryService;

    private UserService userService;

    @Autowired
    public CategoryController(CategoryService categoryService, UserService userService)
    {
        this.categoryService = categoryService;
        this.userService = userService;
    }

    @PostMapping("")
    public ResponseEntity<Category> createCategory(@RequestBody String categoryName, @RequestHeader("Authorization") String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);

        Category createdCategory = categoryService.createCategory(categoryName, user.getId());

        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Category>> getRestaurantCategory(@RequestHeader("Authorization") String jwt, @PathVariable int restaurantId) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);

        List<Category> createdCategories = categoryService.findCategoryByRestaurantId(restaurantId);

        return new ResponseEntity<>(createdCategories, HttpStatus.CREATED);
    }


}
