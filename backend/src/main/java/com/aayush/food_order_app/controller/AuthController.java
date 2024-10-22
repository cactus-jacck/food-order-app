package com.aayush.food_order_app.controller;

import com.aayush.food_order_app.config.JwtProvider;
import com.aayush.food_order_app.model.Cart;
import com.aayush.food_order_app.model.USER_ROLE;
import com.aayush.food_order_app.model.User;
import com.aayush.food_order_app.reponseDto.AuthResponseDto;
import com.aayush.food_order_app.repository.CartRepository;
import com.aayush.food_order_app.repository.UserRepository;
import com.aayush.food_order_app.requestDto.LoginRequestDto;
import com.aayush.food_order_app.service.CustomerUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/auth")
public class AuthController
{
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    private JwtProvider jwtProvider;

    private CustomerUserDetailsService customerUserDetailsService;

    private CartRepository cartRepository;

    @Autowired
    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtProvider jwtProvider, CustomerUserDetailsService customerUserDetailsService, CartRepository cartRepository)
    {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.customerUserDetailsService = customerUserDetailsService;
        this.cartRepository = cartRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponseDto> createUserHandler(@RequestBody User user) throws Exception
    {
        User user1 = userRepository.findByEmail(user.getEmail());

        if (user1 != null)
        {
            throw new Exception("Email already exists");
        }
        User createdUser = new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());
        createdUser.setRole(user.getRole());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(createdUser);

        Cart cart = new Cart();
        cart.setCustomer(savedUser);
        cartRepository.save(cart);

        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);

        AuthResponseDto authResponseDto = new AuthResponseDto();
        authResponseDto.setJwt(jwt);
        authResponseDto.setMessage("Registration successful");
        authResponseDto.setRole(savedUser.getRole());

        return new ResponseEntity<>(authResponseDto, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponseDto> signin(@RequestBody LoginRequestDto loginRequestDto)
    {
        String username = loginRequestDto.getEmail();
        String password = loginRequestDto.getPassword();

        Authentication authentication = authenticate(username, password);
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        String role = authorities.isEmpty()?null:authorities.iterator().next().getAuthority();

        String jwt = jwtProvider.generateToken(authentication);

        AuthResponseDto authResponseDto = new AuthResponseDto();
        authResponseDto.setJwt(jwt);
        authResponseDto.setMessage("Login successful");
        authResponseDto.setRole(USER_ROLE.valueOf(role));

        return new ResponseEntity<>(authResponseDto, HttpStatus.CREATED);

    }

    private Authentication authenticate(String username, String password)
    {
        UserDetails userDetails = customerUserDetailsService.loadUserByUsername(username);

        if (userDetails == null)
        {
            throw new BadCredentialsException("Invalid username");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword()))
        {
            throw new BadCredentialsException("Incorrect password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());


    }
}
