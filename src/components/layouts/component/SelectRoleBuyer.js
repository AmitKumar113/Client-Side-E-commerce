import React from 'react'
import './SelectRole.css'
import {Link} from "react-router-dom"

function SelectRoleBuyer() {
  return (
  <>
    <div className='flex flex-col Select-role-block border md:min-w-xs max-w-sm p-2 bg-white rounded-lg'>
      <div className='mx-2'>
        <p className='text-lg font-mono text-justify'> You should go with this option if you do not wish to sell any product on the platform for a better buying experience </p>
      </div>
      <div className='flex-1 mx-3 my-4'>
          <ul className='[&>*]:font-mono text-xl'>
            <li>✔  Buy Products</li>
            <li>✔  Manange Cart</li>
            <li>❌ Manage Shop</li>
            <li>❌ Sell Products</li>
          </ul>
      </div>
      <div className='flex justify-center'>
      <Link to='/signup/buyer' className='w-full'><div className='w-full py-2 text-center bg-green-500/90 hover:bg-green-500/50 text-xl'>Buyer</div></Link>
      </div>
    </div>
  </>
  )
}

export default SelectRoleBuyer