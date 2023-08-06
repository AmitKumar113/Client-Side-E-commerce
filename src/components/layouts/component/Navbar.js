import React from 'react'
import './Navbar.css'
import '../../../style.css'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { logoutUser } from '../../../Actions/userActions';
import cartIcon from '../../../images/icons/cart-icon.svg'
import logoutIcon from '../../../images/icons/logout-icon.svg'
import personIcon from '../../../images/icons/person-icon.svg'
import menuIcon from '../../../images/icons/menu-icon.svg'
import icon from '../../../images/large-logo.png'
import avatar from '../../../images/Profile.png'
import { COLORS } from '../../../constants/productConstant';

export default function Navbar() {

    const user = useSelector(state => state.user.user)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    
    const dispatch = useDispatch()
    document.addEventListener('click',(e)=>{
        if(e.target.id!='user-name'  && e.target.id!='popup'){
            const ele = document.querySelector('.absolute');
            ele.classList.add('hidden')
        }
    })

    const showProfileToggle = ()=>{
        console.log("showProfileToggle")
        const ele = document.querySelector('#popup');
        ele.classList.toggle('hidden')
    }

    const showPopup =()=>{
        document.querySelector('#logout-confirmation').classList.toggle('hidden')
    } 

    const handleMenuBarClick = ()=>{
        const ele = document.querySelector('.menu-nav-ul');
        ele.classList.toggle('hidden')
    }

  return (
    <header>
        <div className='navbar-container flex-box drop-shadow-[0px_2px_3px_rgba(0,0,0,0.3)] bg-white fixed z-30' >
            <Link to='/' >
            <div className={`logo-nav bg-[url(${icon})] bg-center bg-cover h-14 w-36 cursor-pointer`}></div>
            </Link>
            
            <div className='menu-nav'>
                <ul className='menu-nav-ul flex justify-center items-center' onClick={handleMenuBarClick }>
                        <Link to='/'  className='navbar-btn flex items-center'>Home</Link>
                        <Link to='/product/electronics'  className='navbar-btn flex items-center'>Products</Link>
                        <Link to='/about'  className='navbar-btn flex items-center'>About</Link>
                        <Link to='/contactus'  className='navbar-btn flex items-center'>Contact Us</Link>
                        {
                            isAuthenticated && user.role=='seller' ? (
                                <Link to='/shop'  className='navbar-btn flex items-center'>My Shop</Link>
                            ):(
                                <></>
                            )   
                        }
                        {
                            isAuthenticated ? ( <>
                                <Link to='/profile' className='navbar-btn flex items-center md:hidden'>Profile 
                                    <img src={personIcon} alt="image"></img>
                                </Link>   
                                <li className='navbar-btn flex items-center md:hidden' onClick={()=>showPopup()}>log out
                                    <div className='w-1/3 text-center'>
                                        <img src={logoutIcon} alt="image"></img>
                                    </div>
                                </li>
                            </> ) : (
                                <></>
                            )
                        }
                </ul>
            </div>
            
            {user.name!=undefined ? (
            
            <div className='flex mx-4'> 
                <Link to="/cart"><div className='flex items-center h-full'><img src={cartIcon} alt="image"></img></div></Link> 
                <div id='profile-name' className='mx-4 flex justify-center items-center'>
                    {/* USER AVATAR IMAGE */}
                    <div className={`border-[1px] w-8 h-8 bg-[url(${user==null? avatar: user.avatar.url})] bg-center bg-cover rounded-full mr-2`} onClick={showProfileToggle}>
                    </div>
                    {/* USER NAME */}
                    <div id='user-name' className='hidden md:inline cursor-pointer' onClick={showProfileToggle}>
                        {user.name || 'no user'}
                    </div>
                </div>
            </div>
            ) : (
                <div className='last-nav flex-box mr-4' >
                    <Link to='/login'  className='navbar-btn flex items-center'>login</Link>
                    <Link to='/signup'  className={`navbar-btn hidden md:flex items-center bg-[${COLORS.THIRD_THEME_COLOR}]`}>signup</Link>
                </div>
            )
            }
                {/* MENU ICON */}
                <div className='md:hidden px-2 mr-2' onClick={handleMenuBarClick}>
                    <img src={menuIcon} alt="image"></img>
                </div>

          <div id='popup' className='absolute top-10 right-2 hidden w-40 bg-white m-0'>
                <ul className='text-center cursor-pointer'>
                    <Link to='/profile'>
                        <li className='hover:bg-blue-400/40 py-2 flex border-b-gray-600/40 border-[1px]'>
                        <span className='w-2/3'>Profile</span>    
                            <div className='w-1/3 text-center '>
                                <img src={personIcon} alt="image"></img>
                            </div>
                        </li></Link>
                    <li className='hover:bg-blue-400/40 py-2 flex' onClick={()=>showPopup()}>
                            <span className='w-2/3'>log out</span>
                            <div className='w-1/3 text-center'>
                                <img src={logoutIcon} alt="image"></img>
                            </div>
                    </li>
                </ul>
            </div> 
                <div id='logout-confirmation'  className='hidden fixed top-0 left-0 w-screen h-screen'>
                    <div onClick={()=>showPopup()} className='flex fixed w-screen h-screen bg-slate-900 opacity-70 z-1'>
                    </div> 
                            {/* <div className='p-4 flex flex-col bg-white border-2  fixed w-1/3 h-1/4 z-2 top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]'> */}
                            <div className='p-4 flex flex-col bg-white border-2  fixed w-[500px] h-[200px] z-2 top-[300px] left-1/2 transform translate-x-[-50%] translate-y-[-50%]'>
                                <div className='flex-1'>
                                    <p className='text-2xl my-2'>are you sure?</p>
                                    <p>Do you want to logout?</p>
                                </div>
                                <div className='flex [&>*]:px-6 [&>*]:mx-2 [&>*]:py-1 justify-end [&>*]:rounded-lg'>
                                    <div className='cursor-pointer border bg-zinc-900 text-white hover:bg-zinc-900/90' onClick={()=>{showPopup(); dispatch(logoutUser) }}>Yes</div>
                                    <div className='cursor-pointer border hover:bg-slate-600/20' onClick={()=>showPopup()}>No</div>
                                </div>
                            </div>
                </div>
          
        </div>
    </header>
  )
}
