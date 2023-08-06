import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateQuantityOfItem, removeItem } from '../../../Actions/cartActions'
import reactStars from 'react-rating-stars-component'
import { options } from '../../../constants/productConstant'
import ReactStars from 'react-rating-stars-component'
import { Link } from "react-router-dom";


export default function Item(props) {
    const dispatch = useDispatch()
    const { id, name, price, ratings, quantity, image_url, Stock } = props.item
    options.value = ratings
    
    const HandleRemoveItem = ()=>{
            dispatch(removeItem(id))
    }

    const decQuantity = ()=>{
        if(quantity > 1){
            let updatedQty = quantity -1;
            dispatch(updateQuantityOfItem({id, updatedQty}))
        }
    }
    
    const incQuantity = ()=>{
            let updatedQty = quantity +1;
            dispatch(updateQuantityOfItem({id, updatedQty}))
    }


    return (
    <div className='border-[1px] border-gray-600/40 flex flex-col md:flex-row m-1 p-2 justify-center w-full md:w-[45%]'>
        <div className={`bg-[url(${image_url})]  bg-center bg-cover border-2 w-full md:w-2/5 h-60`}>
            <Link to={`/product/details/${id}`}><div className='w-full h-full'></div></Link>
        </div>
        <div className='flex flex-col w-full md:w-3/5 px-4'>
            <div className='flex-1'>
                <p className='text-2xl '>{name}</p>
                <div className='flex'>
                    <span className='w-1/2 text-lg'>Price: <span className='font-bold text-xl'>₹{price}</span></span>
                    <span className='w-1/2 text-right'><ReactStars {...options}/> </span>
                </div>
            </div>
            { Stock >= 1 ? 
                        (<span className='border-[1px] w-fit rounded-xl px-4 border-green-700 text-green-700 bg-gray-200/50'>Available</span>):
                        (<span className='border-[1px] w-fit rounded-xl px-4 border-orange-700 text-orange-700 bg-gray-200/50'>out of stock</span>)
            }
            
            <span className='mt-3'>Quantity :</span>
            <div className='mb-3 [&>*]:w-10 [&>*]:h-10 [&>*]:rounded-lg flex'>
                <button className=' bg-slate-500/40 hover:bg-slate-500 text-3xl' onClick={()=>decQuantity()}>-</button>
                <span className='py-2 px-4'>{quantity}</span>
                <button className=' bg-slate-500/40 hover:bg-slate-500 text-3xl' onClick={()=>incQuantity()}>+</button>
            </div>
            <div className='flex justify-end [&>*]:text-center [&>*]:cursor-pointer' >
                 <div className='w-1/2 py-2 hover:text-red-500 ' onClick={()=>HandleRemoveItem()}> remove</div>
                 {/* <div className='w-1/2 py-2 bg-cyan-500 rounded-lg'>Buy Now</div> */}
            </div>
        </div>
    </div>
  )
}
