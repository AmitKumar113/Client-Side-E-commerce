import React from 'react'
import { useSelector } from 'react-redux/es/exports'

export default function Profile() {
  
  const { user } = useSelector(state => state.user)
  console.log(user)

  return (
    //to add - address, email, mobile no, delete account option
    <>
    <div className='flex justify-center min-h-[80vh]'>
    <div className='flex flex-col w-full md:w-4/5 border my-2 px-8 [&>*]:my-3'>
        <div className='text-2xl text-center'>My Account</div>
        <div className='flex flex-col flex-1 [&>*]:my-2 [&>*]:py-2'>
          <div className={`w-40 h-40 border-2 border-gray-500/40 bg-[url(${user.avatar.url})] mx-auto bg-cover bg-center rounded-full`}>
          </div>

          <div className='flex flex-wrap text-xl border-b-[1px]  [&>*]:mx-3'>
              <div>Full Name :</div>
              <div className='flex-1'>{user.name}</div>
              <div className='hidden text-sky-500 cursor-pointer hover:underline'>edit</div>
          </div>  
          <div className='flex flex-wrap text-xl border-b-[1px] [&>*]:mx-3'>
              <div>E-mail :</div>
              <div className='flex-1'>{user.email}</div>
              <div className='hidden text-sky-500 cursor-pointer hover:underline'>edit</div>
          </div> 
          <div className='flex flex-wrap text-ellipsis text-xl border-b-[1px] [&>*]:mx-3'>
              <div>Role :</div>
              <div className='flex-1'>{user.role}</div>
              {/* <div className='text-sky-500 cursor-pointer hover:underline'>edit</div> */}
          </div> 
        </div>
        <div >
          <p className='text-center text-xl cursor-pointer text-red-600 bg-slate-300 '>delete account</p>
        </div> 
    </div>
    </div>
    </>
  )
}
