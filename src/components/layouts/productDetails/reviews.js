import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getProduct } from '../../../Actions/productActions'
import ReviewCard from './reviewCard'

export default function Reviews(props) {

  const product = useSelector(state => state.product)
  const reviews = product.product.reviews || []
  const dispatch = useDispatch()

  const HandleAddReview = async (e)=>{
    e.preventDefault();
    const rating = document.querySelector('[name="rating"]').value;
    const comment = document.querySelector('[name="comment"]').value;

    const authToken =  localStorage.getItem('auth-token')
    try{

        const config = { headers: {"Content-Type": "application/json","auth-token": authToken}};
        const { data } =  await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/product/${props.id}/addReview`,
              {rating, comment},
              config
            );
    
            
            console.log(data.product)
            e.target.reset()
            dispatch(getProduct(props.id))
    }catch(error){
      console.log({error})
    }
    }


  return (
    <>
        <span className='text-2xl'>Write a review</span> 
    <form className=' flex mb-4  h-52 items-center' onSubmit={HandleAddReview}>
        <div className='flex flex-col w-[100%] h-full'>
          <div className='flex h-3/4 items-center'>
            <select name='rating' className='w-12 h-10 text-xl text-center ml-4' defaultValue='5'>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <textarea required name="comment" placeholder='write here' className='h-[80%] mx-2 flex-1 border-2 border-gray-700'></textarea>
          </div>
          <div className='flex justify-end'>
              <button type='submit' className='py-2 px-6 mx-4 bg-green-600'>Add Review</button>
          </div>
        </div>
    </form>
    <div className='text-2xl'>Reviews :</div>
    { reviews==0 ? (<div className='my-4 text-gray-600'>be the first one to rate this product.</div>):(<></>)}
    <div className='mx-4'>
      {
        
       reviews.map( review => {
        return( <ReviewCard key={review._id} review={review}></ReviewCard>)
      }
      )}
    </div>
    </>
  )
}
