import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';

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

const MenuCard = () => {
  const handleCheckboxChange=()=>{
    console.log("value")
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
            <img className='w-[7rem] h-[7rem] object-cover' src="https://images.pexels.com/photos/1251208/pexels-photo-1251208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
            <div className='space-y-1 max-w-2xl w-full'>
              <p className='font-semibold text-xl'>Steak</p>
              <p>499</p>
              <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, quia.</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <form>
            <div className='flex gap-5 flex-wrap'>
              {
                demo.map((item) =>
                  <div>
                    <p>{item.category}</p>
                    <FormGroup>
                      {item.ingredients.map((item) => <FormControlLabel control={
                        <Checkbox onChange={() => handleCheckboxChange()} />
                        } label={item} 
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

