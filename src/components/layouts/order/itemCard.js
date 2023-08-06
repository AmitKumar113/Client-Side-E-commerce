import React from 'react'

export default function itemCard(props) {

    const { id, name, price, ratings, quantity, image_url, Stock } = props.item 

  return (
    <div className='border-b-[1px] bg-gray-600/10 flex m-1 p-2 justify-center w-full h-28'>
      <div className={`bg-[url(${image_url})]  bg-center bg-cover border-2 w-24 h-24`}></div>
      <div className='flex flex-col sm:flex-row w-3/5 px-4 flex-1 justify-around md:items-center [&>*]:h-full [&>*]:flex [&>*]:items-center'>
                  <div className='flex-3 text-2xl border-[1px] border-l-gray'>{name}</div>
                  <div className=' text-xl'>Qty : {quantity}</div>
                  <div className=' font-bold text-xl'>₹{price}</div>
      </div>
    </div>
  )
}
