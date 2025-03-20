import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import { categorizeIngredients } from '../utils/categorizedIngredients';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, findCart, updateCartItem } from '../state/cart/Action';

const demo = [
  {
    category: "Nuts and seeds",
    ingredients: ["Cashews"]
  },
  {
    category: "Protein",
    ingredients: ["Chicken", "Beef"]
  },
  {
    category: "Carbs",
    ingredients: ["Rice"]
  }
];


const MenuCard = ({ item }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const { cart } = useSelector(store => store)
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")

  const handleAddToCart = (e) => {
    e.preventDefault()
    const existingCartItem = cart?.cartItems?.find(cartItem => cartItem.food.id === item.id);
    console.log("Existing cart item: ", existingCartItem)

    if (existingCartItem) {
      const data = { cartItemId: existingCartItem.id, quantity: existingCartItem.quantity + 1 }
      dispatch(updateCartItem({ data: data, jwt: jwt }))
    }
    else {
      const reqData = {
        token: localStorage.getItem('jwt'),
        cartItem: {
          foodId: item.id,
          quantity: 1,
          ingredients: selectedIngredients
        }
      }
      dispatch(addItemToCart(reqData))
    }
    setTimeout(() => {
      dispatch(findCart(jwt));
    }, 500);
  }

  const handleCheckboxChange = (itemName) => {
    if (selectedIngredients.includes(itemName)) {
      setSelectedIngredients(selectedIngredients.filter(item => item !== itemName))
    } else {
      setSelectedIngredients([...selectedIngredients, itemName])
    }
  }
  return (
    <Accordion className="w-full max-w-4xl mx-auto">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content" // Ensure aria-controls is defined
        id="panel1-header" // Ensure id is defined
      >
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-5 w-full'>
            <img className='w-[7rem] h-[7rem] object-cover min-w-7' src={item?.foodImages?.[0]?.imageUrl} alt="" />
            <div className='space-y-1 max-w-2xl w-full'>
              <p className='font-semibold text-xl'>{item.name}</p>
              <p>₹ {item.price}</p>
              <p className='text-gray-400'>{item.description}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <form onSubmit={handleAddToCart}>
            <div className='flex gap-5 flex-wrap'>
              {
                Object.keys(categorizeIngredients(item.ingredients)).map((category) =>
                  <div>
                    <p>{category}</p>
                    <FormGroup>
                      {categorizeIngredients(item.ingredients)[category]?.map((item) =>
                        <FormControlLabel
                          key={item.id}
                          control={
                            <Checkbox
                              onChange={() => handleCheckboxChange(item)} />
                          } label={item.name}
                        />)}
                    </FormGroup>
                  </div>
                )
              }
            </div>
            <div className='pt-5'>
              <Button type='submit' variant='contained' disabled={false}>
                {true ? "Add to Cart" : "Out of stock"}
              </Button>
            </div>
          </form>
        </Typography>
      </AccordionDetails>
    </Accordion>

  )
}

export default MenuCard;

