import { Typography } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginUser } from '../state/authentication/Action';
import { getAllRestaurantsAction } from '../state/restaurant/Action'
import { getAllMenuItems } from '../state/menu/Action';

const initialValues = {
    email: "",
    password: ""
};

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        dispatch(loginUser({ userData: values, navigate }));
        setTimeout(() => {
            const jwt = localStorage.getItem('jwt')
            console.log(jwt)
            dispatch(getAllMenuItems(jwt)) 
            dispatch(getAllRestaurantsAction(jwt)) }, 
            2000);
        
    };

    return (
        <div>
            <Typography variant='h5' className='text-center'>
                Login
            </Typography>
            <Formik 
                onSubmit={handleSubmit} 
                initialValues={initialValues}
            >
                {({ handleChange, handleBlur, values }) => (
                    <Form>
                        <TextField
                            name="email"
                            label="Email"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Button 
                            sx={{ mt: 2, padding: "1rem" }} 
                            fullWidth 
                            type='submit' 
                            variant='contained'
                        >
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
            <Typography variant='body2' align='center' sx={{ mt: 3 }}>
                Don't have an account?
                <Button size='small' onClick={() => navigate("/account/register")}>
                    Register
                </Button>
            </Typography>
        </div>
    );
};

export default LoginForm;
