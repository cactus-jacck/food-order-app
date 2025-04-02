package com.aayush.food_order_app.service;

import com.aayush.food_order_app.config.JwtProvider;
import com.aayush.food_order_app.model.Address;
import com.aayush.food_order_app.model.AddressType;
import com.aayush.food_order_app.model.User;
import com.aayush.food_order_app.repository.AddressRepository;
import com.aayush.food_order_app.repository.OrderRepository;
import com.aayush.food_order_app.repository.UserRepository;
import com.aayush.food_order_app.requestDto.AddressRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserServiceImpl implements UserService
{
    private UserRepository userRepository;

    private JwtProvider jwtProvider;

    private AddressRepository addressRepository;

    private OrderRepository orderRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, JwtProvider jwtProvider, AddressRepository addressRepository)
    {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
        this.addressRepository = addressRepository;
    }

    @Override
    public User findUserByJwtToken(String jwt) throws Exception
    {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        User user = findUserByEmail(email);
        return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception
    {
        User user = userRepository.findByEmail(email);

        if (user == null)
        {
            throw new Exception("User not found");
        }
        return user;
    }

    @Override
    public Address updateAddress(String jwt, AddressRequestDto addressReqDto) throws Exception
    {
        return null;
    }

    @Override
    public Address createAddress(User user, AddressRequestDto addressRequestDto)
    {
        Address address = Address.builder()
                .streetName(addressRequestDto.getStreetName())
                .city(addressRequestDto.getCity())
                .state(addressRequestDto.getState())
                .postalCode(addressRequestDto.getPostalCode())
                .country(addressRequestDto.getCountry())
                .addressType(addressRequestDto.getAddressType())
                .build();
        if (addressRequestDto.getAddressType() == AddressType.OTHER)
        {
            address.setCustomAddressType(addressRequestDto.getCustomAddressType());
        }
        user.getAddresses().add(address);
        userRepository.save(user);
        
        return address;
    }

    @Override
    public String deleteAddress(User user, Long addressId)
    {
        List<Address> userAddressList = user.getAddresses();

        for (Address address : userAddressList)
        {
            if (address.getId() == addressId)
            {
                user.getAddresses().remove(address);
                addressRepository.deleteById(addressId);
                userRepository.save(user);
            }
        }
        return "Deleted successfully";
    }

}
