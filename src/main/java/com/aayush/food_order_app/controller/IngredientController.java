package com.aayush.food_order_app.controller;

import com.aayush.food_order_app.model.IngredientCategory;
import com.aayush.food_order_app.model.IngredientItem;
import com.aayush.food_order_app.requestDto.IngredientCategoryRequest;
import com.aayush.food_order_app.requestDto.IngredientRequest;
import com.aayush.food_order_app.service.IngredientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/ingredients")
public class IngredientController
{
    private IngredientsService ingredientsService;

    @Autowired
    public IngredientController(IngredientsService ingredientsService)
    {
        this.ingredientsService = ingredientsService;
    }

    @PostMapping("/category")
    public ResponseEntity<IngredientCategory> createIngredientCategory(@RequestBody IngredientCategoryRequest req) throws Exception
    {
        IngredientCategory item  = ingredientsService.createIngredientCategory(req.getName(), req.getRestaurantId());
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PostMapping("")
    public ResponseEntity<IngredientItem> createIngredientItem (@RequestBody IngredientRequest req) throws Exception
    {
        IngredientItem item = ingredientsService.createIngredientItem(req.getRestaurantId(), req.getName(), req.getIngredientCategoryId());
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/stock")
    public ResponseEntity<IngredientItem> updateIngredientStock (@RequestBody IngredientRequest req, @PathVariable long id) throws Exception
    {
        IngredientItem item = ingredientsService.updateStock(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{id}")
    public ResponseEntity<List<IngredientItem>> getRestaurantIngredient (@PathVariable long id) throws Exception
    {
        List<IngredientItem> items = ingredientsService.findRestaurantsIngredients(id);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{id}/category")
    public ResponseEntity<List<IngredientCategory>> getRestaurantIngredientCategory (@PathVariable long id) throws Exception
    {
        List<IngredientCategory> items = ingredientsService.findIngredientCategoryByRestaurantId(id);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }


}
