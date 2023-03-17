import React from 'react'
import { useSelector } from 'react-redux'
import StepsCount from './stepsCount'
import ItemCard from './itemCard'
import { Link } from 'react-router-dom'

export default function OrderSummary() {
  
  const cart = useSelector(state => state.cart)

  return (
    <div className='flex-1'>
        <StepsCount op1={80} op2={0} op3={0}/>
        <div>
          <div className='flex flex-wrap justify-center mb-4'>{
                      cart.cartItems.map(item => {
                          return (
                              <ItemCard item={item}></ItemCard>
                              )
                          })
                      }
          </div>
            <div className='flex border-b-[1px] my-2 py-2'>
                    <span className='flex-1 text-right text-xl'>Cart Subtotal: ₹</span>
                    <span className='mr-3 text-2xl'>{cart.cartSubTotal}</span>
                    <Link to={'/order/shipping-details'}><div className='bg-cyan-500 cursor-pointer px-3 py-1 mx-4 rounded-lg text-xl'>Continue</div></Link>
            </div>
        </div>
    </div>
  )
}