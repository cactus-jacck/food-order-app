import { Divider, Modal, Box, Grid2, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import AddressCard from './AddressCard'
import { Card } from '@mui/material';
import { Button } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from "yup";
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { create } from '@mui/material/styles/createTransitions';
import { createOrder } from '../state/order/Action';
import { clearCartAction, findCart } from '../state/cart/Action';
import { Snackbar, Alert } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { createAddress } from '../state/authentication/Action';


export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: "none",
  p: 4,
};
const initialValues = {
  streetName: "",
  state: "",
  postalCode: "",
  city: "",
  addressType: ""
}
const validationSchema = Yup.object().shape({
  streetName: Yup.string().required("Street address is required"),
  state: Yup.string().required("State is required"),
  postalCode: Yup.string().required("Pincode is required"),
  city: Yup.string().required("City is required"),
  addressType: Yup.string().required("Address type is required"),
  customAddressType: Yup.string()
    .nullable() // Ensure it can be null initially
    .when("addressType", (addressType, schema) => {
      return addressType === "OTHER"
        ? schema.required("Custom address type is required")
        : schema.notRequired();
    }),
});

const Cart = () => {
  const createOrdersUsingSelectedAddress = (address) => {
    console.log(address)
    const data = {
      jwt: localStorage.getItem('jwt'),
      order: {
        restaurantId: cart.cart.restaurantId,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: address.streetName,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: "India"
        }
      }
    }
    setOpenBackdrop(true);
    dispatch(createOrder(data));

    setTimeout(() => {
      setOpenBackdrop(false);
      dispatch(clearCartAction());
    }, 2000);
  }
  const { cart, auth } = useSelector(store => store)
  console.log("cart ", cart)
  const dispatch = useDispatch()
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleOpenAdressModal = () => setOpen(true);
  const [open, setOpen] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState("");
  const [selectedAddressType, setSelectedAddressType] = useState("HOME");

  useEffect(() => {
    dispatch(findCart(localStorage.getItem('jwt')))
  }, [])

  const handleClose = () => setOpen(false);

  const handleSubmit = (value) => {
    console.log("new address: ", value);
    setOpenBackdrop(true);

    const reqData = {
      address: value,
      jwt: localStorage.getItem("jwt"),
    };

    dispatch(createAddress(reqData));

    setTimeout(() => {
      setOpen(false)
      setOpenBackdrop(false);
    }, 1000);
  }

  const itemTotal = cart.cart?.total || 0;
  const deliveryCharge = cart.cartItems?.length > 0 ? 25 : 0;
  const gst = cart.cartItems?.length > 0 ? 19 : 0;
  const totalPay = itemTotal + deliveryCharge + gst;
  const isCartEmpty = !cart.cartItems || cart.cartItems.length === 0;


  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 1300 }} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <main className='lg:flex justify-between'>
        <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
          {cart.loading ? (
            <Box className="flex justify-center items-center w-full h-40">
              <CircularProgress size={50} />
            </Box>
          ) : (
            cart.cartItems?.map((item) => (<CartItem item={item} />))
          )}
          <Divider />
          {isCartEmpty && (
            <div className="text-center text-red-500 font-semibold mb-4">
              Your cart is empty
            </div>
          )}
          <div className='billDetails px-5 text-sm'>
            <p className='font-extralight py-5'>Bill Details</p>
            <div className='space-y-3'>
              <div className='flex justify-between text-gray-400'>
                <p>Item Total</p>
                <p>{itemTotal}</p>
              </div>
              <div className='flex justify-between text-gray-400'>
                <p>Delivery Charge</p>
                <p>{deliveryCharge}</p>
              </div>
              <div className='flex justify-between text-gray-400'>
                <p>GST</p>
                <p>{gst}</p>
              </div>
              <Divider />
            </div>
            <div>
              <div className='flex justify-between text-gray-400'>
                <p>Total Pay</p>
                <p>{totalPay}</p>
              </div>
            </div>
          </div>
        </section>
        <Divider orientation='vertical' flexItem />
        <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
          <div>
            <h1 className='text-center font-semibold text-2xl py-10'>
              Choose Delivery Address
            </h1>
            <div className='flex gap-5 flex-wrap justify-center'>
              {auth.user?.addresses.map((item) =>
                <AddressCard
                  key={item.id}
                  handleSelectAddress={() => createOrdersUsingSelectedAddress(item)}
                  item={item}
                  showButton={true}
                  cartItems={cart.cartItems}
                />)}
              <Card className='flex gap-5 w-64 p-5'>
                <AddLocationAltIcon />
                <div className='space-y-3 text-gray-500'>
                  <h1 className='font-semibold text-lg text-white'>Add new address</h1>
                  <Button variant="outlined" fullWidth onClick={handleOpenAdressModal}>Add</Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched, values }) => (
              <Form>
                <Grid2 container spacing={2} direction="column">
                  <Grid2 item xs={12}>
                    <Field
                      as={TextField}
                      name="streetName"
                      label="Street Address"
                      fullWidth
                      variant="outlined"
                      error={touched.streetName && !!errors.streetName}
                      helperText={touched.streetName && errors.streetName ? (
                        <span className="text-red-600">{errors.streetName}</span>
                      ) : null}
                    />
                  </Grid2>
                  <Grid2 item xs={12}>
                    <Field
                      as={TextField}
                      name="state"
                      label="State"
                      fullWidth
                      variant="outlined"
                      error={touched.state && !!errors.state}
                      helperText={touched.state && errors.state ? (
                        <span className="text-red-600">{errors.state}</span>
                      ) : null}
                    />
                  </Grid2>
                  <Grid2 item xs={12}>
                    <Field
                      as={TextField}
                      name="city"
                      label="City"
                      fullWidth
                      variant="outlined"
                      error={touched.city && !!errors.city}
                      helperText={touched.city && errors.city ? (
                        <span className="text-red-600">{errors.city}</span>
                      ) : null}
                    />
                  </Grid2>
                  <Grid2 item xs={12}>
                    <Field
                      as={TextField}
                      name="postalCode"
                      label="Pincode"
                      fullWidth
                      variant="outlined"
                      error={touched.postalCode && !!errors.postalCode}
                      helperText={touched.postalCode && errors.postalCode ? (
                        <span className="text-red-600">{errors.postalCode}</span>
                      ) : null}
                    />
                  </Grid2>

                  {/* Address Type Dropdown */}
                  <Grid2 item xs={12}>
                    <Field
                      as={TextField}
                      select
                      name="addressType"
                      label="Address Type"
                      fullWidth
                      variant="outlined"
                      error={touched.addressType && !!errors.addressType}
                      helperText={touched.addressType && errors.addressType ? (
                        <span className="text-red-600">{errors.addressType}</span>
                      ) : null}
                      onChange={(e) => {
                        const { value } = e.target;
                        setSelectedAddressType(value);
                        if (value === "HOME" || value === "OFFICE") {
                          values.customAddressType = "";
                        }
                        values.addressType = value;
                      }}
                    >
                      <MenuItem value="HOME">Home</MenuItem>
                      <MenuItem value="OFFICE">Office</MenuItem>
                      <MenuItem value="OTHER">Other</MenuItem>
                    </Field>
                  </Grid2>

                  {/* Show custom address type input only if 'Other' is selected */}
                  {selectedAddressType === "OTHER" && (
                    <Grid2 item xs={12}>
                      <Field
                        as={TextField}
                        name="customAddressType"
                        label="Custom Address Name"
                        fullWidth
                        variant="outlined"
                        error={touched.customAddressType && !!errors.customAddressType}
                        helperText={touched.customAddressType && errors.customAddressType ? (
                          <span className="text-red-600">{errors.customAddressType}</span>
                        ) : null}
                      />
                    </Grid2>
                  )}

                  <Grid2 item xs={12}>
                    <Button fullWidth variant="contained" type="submit" color="primary">
                      Save Address
                    </Button>
                  </Grid2>
                </Grid2>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  )
}

export default Cart
