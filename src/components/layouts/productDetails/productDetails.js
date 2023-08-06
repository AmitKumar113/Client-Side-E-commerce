import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getProduct } from '../../../Actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../../store'
import { useParams } from 'react-router-dom'
import Reviews from './reviews'
import { COLORS } from '../../../constants/productConstant'
import { addToCart } from '../../../Actions/cartActions'
import ReactStars from "react-rating-stars-component";
import { displayActionMessage } from '../popups/alert'
import Loader from '../../layouts/component/Loader/Loader'


const ProductDetails = () =>{
    const { id } = useParams()
    const { product={} , loading=true  } = useSelector(state => state.product)
    // console.log(product)
    const dispatch = useDispatch()
    const options = {
        edit: false, // false: readonly
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true, //true: half star
    }

    const HandleAddToCart = () => {
          dispatch(addToCart(product._id))
        //   displayActionMessage("item added to cart", "success")
      }
    
    useEffect(()=>{
        console.log("product details")
        console.log({product})
        console.log({id})
        dispatch(getProduct(id))
    },[])

    return (
        <>
        { loading ?  ( <><Loader/></> ):(
        <div className='flex justify-center'>
            <div className='w-full  md:w-4/5'>
            <div className='details-conatiner bg-slate-300 flex flex-col md:flex-row m-5 p-3 justify-center min-h-2/3'>
                {/* ❌ ERROR-solved : when state is not initialised cant accesss image url thats gives error 
                    solution  - need to initialise the product on starting or even better implement loading*/}
                {
                product.Stock ? (
                    <div className={`bg-[url(${product.image.url})] bg-cover bg-center border-[1px] w-full md:w-1/3 h-80`}></div>
                    ):(
                        <div className={` bg-cover bg-center border-[1px] w-1/3 h-80`}></div>
                )
                }
                
                <div className='flex flex-col w-full md:w-2/5 p-3 bg-white'>
                    <div className=' flex mb-2'>
                        <span className='text-2xl flex-1'>{product.name || "no name"}</span>
                    </div>
                    <p className='flex-1'>{product.description || "NO description"}</p>
                    { product.Stock >= 1 ? 
                        (<span className='border-[1px] w-fit rounded-xl px-4 border-green-700 text-green-700 bg-gray-200/50'>In Stock</span>):
                        (<span className='border-[1px] w-fit rounded-xl px-4 border-orange-700 text-orange-700 bg-gray-200/50'>out of stock</span>)
                    }
                    <div className='flex mb-4'>
                        <p className='text-3xl flex-1 my-3'>₹{product.price || "NO description"}</p>
                        <div className='flex flex-col'>  
                        { product.ratings == 0 ? ( <span className=''> No reviews</span>):(
                            <>
                            <span className=''><ReactStars {...options} /></span>
                            <span className=''> {product.numOfReviews} reviews</span>
                            </>
                        )}
                        </div>
                    </div>
                    <div>
                        <div className=' flex justify-end  [&>*]:text-center [&>*]:cursor-pointer'>
                            <div className='w-1/2 py-1.5 bg-green-500/90 hover:bg-green-500/50' onClick={()=>{HandleAddToCart()}}>Add to cart</div>
                            {/* <div className={`w-1/2 mx-2 py-1.5 rounded-lg bg-[${COLORS.MAIN_THEME_COLOR}]`}>Buy Now</div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className='review-container px-4'>
                <Reviews id={id} reviews={product.reviews || []}/>
            </div>
        </div>
        </div>
    )}
    </>
  )
}

export default ProductDetails