import React,{useState} from 'react'
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addtoCart } from '../redux/features/cart';
import {toast} from 'react-hot-toast'

const ProductCard = ({item}) => {
  const [ratingValue, setRatingValue] = useState(item.rating.rate);

  const handleRatingChange = (newValue) => {
    setRatingValue(newValue);
  };
  const dispatch = useDispatch()

  const handleSubmit=(value)=>{
    dispatch(addtoCart(value))
    toast.success("Product Added")

  }
  
  return (
    <Link>
    <div className=' md:w-96 h-[450px] w-full shadow-lg   flex flex-col justify-center items-center  hover:scale-105 duration-500'>
      <div className=' w-64 h-64  shadow-sm '>
        <img className=' w-64 h-64 object-contain  ' src={item.image} alt={item.name} />
      </div>
      <h1 className='font-semibold text-lg '>{item.title}</h1>
      <div className='flex justify-between  w-full mt-3'>
        <div>
        <Rating
              name="half-rating-read"
              value={ratingValue}
              precision={0.5}
              readOnly
              onChange={(event, newValue) => handleRatingChange(newValue)}
            />

        </div>
        <h1 className=' mr-9 text-lg font-semibold'>{item.price}$</h1>
      </div>
      <div className=' mb-3'>
      <Button className='' variant="contained" onClick={()=>{ handleSubmit({...item,qty:1}) } 
      
     }>Add to cart</Button>
      </div>

      
    </div>
    
    </Link>
  )
}

export default ProductCard