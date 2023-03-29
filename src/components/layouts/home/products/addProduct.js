import React, { useState } from 'react'
import axios from 'axios'
import { CATEGORIES } from '../../../../constants/productConstant'
import { displayActionMessage } from '../../popups/alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getSellerProducts } from '../../../../Actions/productActions'

export default function AddProduct() {

  // const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [image, setImage] = useState('')
  const { user } = useSelector(state => state.user)

  const handleAddProduct = async (e)=>{
    e.preventDefault()
    const authToken = localStorage.getItem('auth-token');

    const config = { headers: {
                    "Content-Type": "multipart/form-data",
                     "auth-token":  authToken     
                     }};

    
    const myForm = new FormData();
    myForm.append('name', document.querySelector('[name="product-name"]').value);
    myForm.append('description', document.querySelector('[name="product-description"]').value);
    myForm.append('price', document.querySelector('[name="product-price"]').value);
    myForm.append('category', document.querySelector('[name="product-category"]').value);
    myForm.append('file', image);

    try{

    console.log("image"+ image)
           await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/addProduct`,
               myForm,
               config
        );

        e.target.reset();
        displayActionMessage("Product Added", "success")
        dispatch( getAllProducts )
        dispatch( getSellerProducts(user._id) )
      }catch(error){
              displayActionMessage("Some Error Occured!", "error")
           }

        // console.log(data.product)
  }

  return (<>
    <div className=' flex justify-center items-center'>
      <div className='login-container flex flex-col w-1/3 min-w-[25rem] py-4 bg-slate-300 my-8 '>
        <span  className='text-center text-3xl py-8'>Add Product</span>
        <form action="/addProduct" 
              method="POST" 
              encType="multipart/form-data" 
              className='flex-box-column [&>*]:w-2/3 [&>input]:h-12 [&>*]:my-1 [&>*]:px-6' 
              onSubmit={handleAddProduct}>
            <input type="text" name="product-name" placeholder="Title of product" required></input>
            <input type="number" name="product-price" placeholder="Selling Price" required></input>
            <label for="product-image" className='h-fit'>Product image: (max: 1mb) </label>
            <input type="file" name="file" onChange= {(e)=> setImage(e.target.files[0])} required></input>
            {/* <label for="product-category"></label> */}
            <select name='product-category' className='w-1/2 h-12'>
                    <option value="SELECT">SELECT</option>

                { CATEGORIES.map((category=>{
                    return(
                        <option key={category} value={category}>{category}</option>
                    )
                })) }
            </select>
            <textarea placeholder="Product Desription" name="product-description" className='h-24' required></textarea>
              <button className='w-full bg-green-600 h-12' type='submit'>Add Product</button>
      </form>
    </div>
  </div>
  </>
  )
}
