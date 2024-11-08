import React from 'react'
import { Typography } from '@mui/material'
import { Formik, Field, Form } from 'formik'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const initialValues = {
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER"
}

const RegisterForm = () => {
    const navigate = useNavigate()

    const handleSubmit = (values) => {
        console.log(values)
    }
    return (
        <div>
            <Typography variant='h5' className='text-center'>
                Register
            </Typography>
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                <Form >
                    <Field
                        as={TextField}
                        name="fullName"
                        label="Full name"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <Field
                        as={TextField}
                        name="password"
                        label="Password"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        type="password"
                    />
                    <FormControl fullWidth>
                        <InputLabel id="role-simple-select-label">Role</InputLabel>
                        <Field
                            as={Select}
                            labelId="role-simple-select-label"
                            id="demo-simple-select"
                            name="role"
                            // value={age}
                            label="Role"
                            margin="normal"
                            // onChange={handleChange}
                        >
                            <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                            <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
                        </Field>
                    </FormControl>
                    <Button sx={{ mt: 2, padding: "1rem" }} fullWidth type='submit' variant='contained'>Register</Button>
                </Form>
            </Formik>
            <Typography variant='body2' align='center' sx={{ mt: 3 }}>
                If you have an account?
                <Button size='small' onClick={() => navigate("/account/login")}>
                    login
                </Button>
            </Typography>
        </div>
    )
}

export default RegisterForm
