package com.aayush.food_order_app.service;

import com.aayush.food_order_app.model.Cart;
import com.aayush.food_order_app.model.CartItem;
import com.aayush.food_order_app.model.Food;
import com.aayush.food_order_app.model.User;
import com.aayush.food_order_app.repository.CartItemRepository;
import com.aayush.food_order_app.repository.CartRepository;
import com.aayush.food_order_app.repository.FoodRepository;
import com.aayush.food_order_app.requestDto.AddCartItemReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImpl implements CartService
{
    private CartRepository cartRepository;

    private UserService userService;

    private CartItemRepository cartItemRepository;

    private FoodRepository foodRepository;

    private FoodService foodService;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository, UserService userService, CartItemRepository cartItemRepository, FoodRepository foodRepository, FoodService foodService)
    {
        this.cartRepository = cartRepository;
        this.userService = userService;
        this.cartItemRepository = cartItemRepository;
        this.foodRepository = foodRepository;
        this.foodService = foodService;
    }

    @Override
    public CartItem addItemToCart(AddCartItemReqDto req, String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);
        Food food = foodService.findFoodById(req.getFoodId());

        Cart cart = cartRepository.findByCustomerId(user.getId());

        for (CartItem cartItem : cart.getItems())
        {
            if (cartItem.getFood().equals(food))
            {
                int newQuantity = cartItem.getQuantity() + req.getQuantity();
                return updateCartItemQuantity(cartItem.getId(), newQuantity);
            }
        }
        CartItem cartItem = new CartItem();
        cartItem.setFood(food);
        cartItem.setCart(cart);
        cartItem.setQuantity(req.getQuantity());
        cartItem.setIngredients(req.getIngredients());
        cartItem.setCustomerId(user.getId());
        cartItem.setTotalPrice(req.getQuantity() * food.getPrice());

        CartItem savedCartItem = cartItemRepository.save(cartItem);

        cart.getItems().add(savedCartItem);

        return savedCartItem;
    }

    @Override
    public CartItem updateCartItemQuantity(long cartItemId, int quantity) throws Exception
    {
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
        if (cartItemOptional.isEmpty())
        {
            throw new Exception("Cart item not found");
        }
        CartItem item = cartItemOptional.get();
        item.setQuantity(quantity);
        item.setTotalPrice(item.getFood().getPrice()*quantity);

        return cartItemRepository.save(item);
    }

    @Override
    public Cart removeItemFromCart(long cartItemId, String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);

        Cart cart = cartRepository.findByCustomerId(user.getId());

        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
        if (cartItemOptional.isEmpty())
        {
            throw new Exception("Cart item not found");
        }
        CartItem item = cartItemOptional.get();
        cart.getItems().remove(item);
        return cartRepository.save(cart);
    }

    @Override
    public double calculateCartTotals(Cart cart) throws Exception
    {
        double total = 0L;

        for (CartItem cartItem : cart.getItems())
        {
            total += cartItem.getFood().getPrice() * cartItem.getQuantity();
        }
        return total;
    }

    @Override
    public Cart findCartById(long id) throws Exception
    {
        Optional<Cart> optionalCart = cartRepository.findById(id);
        if (optionalCart.isEmpty())
        {
            throw new Exception("Cart not found with id: "+id);
        }
        return null;
    }

    @Override
    public Cart findCartByUserId(long userId) throws Exception
    {
//        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartRepository.findByCustomerId(userId);
        cart.setTotal(calculateCartTotals(cart));
        return cartRepository.findByCustomerId(userId);
    }

    @Override
    public Cart clearCart(String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);
        Cart cart = findCartByUserId(user.getId());
        cart.getItems().clear();
        return cartRepository.save(cart);
    }
}
