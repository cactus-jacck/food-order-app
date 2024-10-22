package com.aayush.food_order_app.service;

import com.aayush.food_order_app.model.Cart;
import com.aayush.food_order_app.model.CartItem;
import com.aayush.food_order_app.requestDto.AddCartItemReqDto;

public interface CartService
{
    public CartItem addItemToCart(AddCartItemReqDto req, String jwt) throws Exception;

    public CartItem updateCartItemQuantity(long cartItemId, int quantity) throws Exception;

    public Cart removeItemFromCart(long cartItemId, String jwt) throws Exception;

    public double calculateCartTotals(Cart cart) throws Exception;

    public Cart findCartById (long id) throws Exception;

    public Cart findCartByUserId(long id) throws Exception;

    public Cart clearCart(String jwt) throws Exception;
}
