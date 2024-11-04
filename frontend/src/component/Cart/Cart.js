import { Divider, Modal, Box, Grid2 } from '@mui/material'
import React from 'react'
import CartItem from './CartItem'
import AddressCard from './AddressCard'
import { Card } from '@mui/material';
import { Button } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from "yup";
import TextField from '@mui/material/TextField';

const items = [1, 1]

const style = {
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
  streetAddress: "",
  state: "",
  pincode: "",
  city: ""
}
const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street address is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string().required("Pincode is required"),
  city: Yup.string().required("City is required")
});

const Cart = () => {
  const createOrdersUsingSelectedAddress = () => {

  }
  const handleOpenAdressModal = () => setOpen(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleSubmit = (value) => {
    console.log(value)
  }
  return (
    <>
      <main className='lg:flex justify-between'>
        <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
          {items.map((item) => (<CartItem />))}
          <Divider />
          <div className='billDetails px-5 text-sm'>
            <p className='font-extralight py-5'>Bill Details</p>
            <div className='space-y-3'>
              <div className='flex justify-between text-gray-400'>
                <p>Item Total</p>
                <p>599</p>
              </div>
              <div className='flex justify-between text-gray-400'>
                <p>Delivery Charge</p>
                <p>25</p>
              </div>
              <div className='flex justify-between text-gray-400'>
                <p>GST</p>
                <p>19</p>
              </div>
              <Divider />
            </div>
            <div>
              <div className='flex justify-between text-gray-400'>
                <p>Total Pay</p>
                <p>633</p>
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
              {[1, 1, 1].map((item) =>
                <AddressCard handleSelectAddress={createOrdersUsingSelectedAddress} item={item} showButton={true} />)}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid2 container spacing={2}>
                  <Grid2 item xs={12}>
                    <Field
                      as={TextField}
                      name="streetAddress"
                      label="Street Address"
                      fullWidth
                      variant="outlined"
                      error={touched.streetAddress && !!errors.streetAddress}
                      helperText={
                        touched.streetAddress && errors.streetAddress ? (
                          <span className="text-red-600">{errors.streetAddress}</span>
                        ) : null
                      }
                    />
                  </Grid2>
                  <Grid2 item xs={12}>
                    <Field
                      as={TextField}
                      name="state"
                      label="State"
                      fullWidth
                      variant="outlined"
                      error={touched.streetAddress && !!errors.streetAddress}
                      helperText={
                        touched.streetAddress && errors.streetAddress ? (
                          <span className="text-red-600">{errors.streetAddress}</span>
                        ) : null
                      }
                    />
                  </Grid2>
                  <Grid2 item xs={12}>
                    <Field
                      as={TextField}
                      name="city"
                      label="City"
                      fullWidth
                      variant="outlined"
                      error={touched.streetAddress && !!errors.streetAddress}
                      helperText={
                        touched.streetAddress && errors.streetAddress ? (
                          <span className="text-red-600">{errors.streetAddress}</span>
                        ) : null
                      }
                    />
                  </Grid2>
                  <Grid2 item xs={12}>
                    <Field
                      as={TextField}
                      name="pincode"
                      label="Pincode"
                      fullWidth
                      variant="outlined"
                      error={touched.streetAddress && !!errors.streetAddress}
                      helperText={
                        touched.streetAddress && errors.streetAddress ? (
                          <span className="text-red-600">{errors.streetAddress}</span>
                        ) : null
                      }
                    />
                  </Grid2>
                  <Grid2 item xs={12}>
                      <Button fullWidth variant='contained' type='submit' color='primary'>Deliver Here</Button>
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
