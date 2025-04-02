package com.aayush.food_order_app.controller;

import com.aayush.food_order_app.model.Address;
import com.aayush.food_order_app.model.User;
import com.aayush.food_order_app.repository.AddressRepository;
import com.aayush.food_order_app.requestDto.AddressRequestDto;
import com.aayush.food_order_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ListIterator;

@RestController
@RequestMapping("/api/users")
public class UserContoller
{
    private UserService userService;

    @Autowired
    public UserContoller(UserService userService)
    {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<User> findUserByJwtToken(@RequestHeader("Authorization") String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/addresses")
    public ResponseEntity<List<Address>> getAllAddressesByUser(@RequestHeader("Authorization") String jwt) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);
        List<Address> addressList = user.getAddresses();
        return new ResponseEntity<>(addressList, HttpStatus.OK);
    }

    @PostMapping("/address")
    public ResponseEntity<Address> createAddress(@RequestHeader("Authorization") String jwt, @RequestBody AddressRequestDto addressRequestDto) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);
        Address address = userService.createAddress(user, addressRequestDto);
        return new ResponseEntity<>(address, HttpStatus.CREATED);
    }

    @DeleteMapping("/address/{addressId}")
    public ResponseEntity<String> deleteAddress(@RequestHeader("Authorization") String jwt, @PathVariable Long addressId) throws Exception
    {
        User user = userService.findUserByJwtToken(jwt);
        return new ResponseEntity<>(userService.deleteAddress(user, addressId), HttpStatus.OK);
    }

}
