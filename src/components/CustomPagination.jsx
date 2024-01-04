import React from 'react'
import {Pagination} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { PageSetUp } from '../redux/features/home'

const CustomPagination = ({totalPages}) => {
  const {currentPage} = useSelector((state)=>state.allProducts)
    const dispatch = useDispatch()
    const handleChange=(page)=>{
        dispatch(PageSetUp(page))
        
    }
  return (
    <Pagination shape='rounded' color='primary' count={totalPages} page={Number(currentPage)} onChange={(e)=>handleChange(e.target.textContent)} />
  )
}

export default CustomPagination