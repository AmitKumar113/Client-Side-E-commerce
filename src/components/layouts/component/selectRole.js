import React from 'react'
import SelectRoleBuyer from './SelectRoleBuyer';
import SelectRoleSeller from './SelectRoleSeller';

export default function selectRole() {
  return (
    <div className=' select-role-container bg-gradient-to-r from-[#ee40d7c4]'>
      <div className='text-3xl text-center mt-3 mb-8'>Signup as</div>
      <div className='flex flex-col md:flex-row justify-center align-middle box-border'>
        <SelectRoleSeller/>
        <SelectRoleBuyer/>
      </div>
      </div>
  )
}
