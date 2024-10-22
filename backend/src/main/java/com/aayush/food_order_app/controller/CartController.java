package com.aayush.food_order_app.controller;

import com.aayush.food_order_app.model.Cart;
import com.aayush.food_order_app.model.CartItem;
import com.aayush.food_order_app.model.User;
import com.aayush.food_order_app.requestDto.AddCartItemReqDto;
import com.aayush.food_order_app.requestDto.UpdateCartItemRequestDto;
import com.aayush.food_order_app.service.CartService;
import com.aayush.food_order_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/")
public class CartController
{
    private CartService cartService;

    private UserService userService;

    @Autowired
    public CartController(CartService cartService, UserService userService)
    {
        this.cartService = cartService;
        this.userService = userService;
    }

    @PutMapping("/cart/add")
    public ResponseEntity<CartItem> addItemToCart(@RequestBody AddCartItemReqDto req, @RequestHeader("Authorization") String jwt) throws Exception
    {
        CartItem cartItem = cartService.addItemToCart(req, jwt);
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }

    @PutMapping("/cart-item/update")
    public ResponseEntity<CartItem> updateCartItemQuantity(@RequestBody UpdateCartItemRequestDto req, @RequestHeader("Authorization") String jwt) throws Exception
    {
        CartItem cartItem = cartService.updateCartItemQuantity(req.getCartItemId(), req.getQuantity());
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }

    @DeleteMapping("/cart-item/{id}/remove")
    public ResponseEntity<Cart> removeCartItem(@PathVariable long id, @RequestHeader("Authorization") String jwt) throws Exception
    {
        Cart cartItem = cartService.removeItemFromCart(id, jwt);
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }

    @PutMapping("/cart/clear")
    public ResponseEntity<Cart> clearCart(@RequestBody UpdateCartItemRequestDto req, @RequestHeader("Authorization") String jwt) throws Exception
    {
        Cart cart = cartService.clearCart(jwt);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @GetMapping("/cart")
    public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartService.findCartByUserId(user.getId());
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

}
