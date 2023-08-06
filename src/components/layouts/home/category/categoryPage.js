import React from 'react'
import Card from '../products/card'
import { useSelector } from 'react-redux/es/exports'
import { useParams, Link } from 'react-router-dom'
import { CATEGORIES } from '../../../../constants/productConstant' 
import { COLORS } from '../../../../constants/productConstant'
// import Loader from '../../component/Loader/Loader'
// import { Link } from 'react-router-dom'

export default function CategoryPage() {
    const { category } = useParams()
    let i=0
    for(i=0; i<CATEGORIES.length; i++){
        if(CATEGORIES[i]==category)
            break;
    }

    const allCategoryProducts = useSelector(state => state.allProducts.allProducts[i])
    // console.log(allCategoryProducts)
  
    return (
    <div>
    <div className=' flex  justify-center mt-4'>
        <div className='w-4/5'>
            <ul className={`flex flex-wrap justify-center [&>*]:p-2 [&>*]:cursor-pointer [&>*:hover]:bg-[${COLORS.MAIN_THEME_COLOR}] [&>*]:border-[1px]` }>
                <Link to={`/product/${CATEGORIES[0]}`}><li className='focus:bg-green-600 '>{CATEGORIES[0].toUpperCase()}</li></Link>
                <Link to={`/product/${CATEGORIES[1]}`}><li>{CATEGORIES[1].toUpperCase()}</li></Link>
                <Link to={`/product/${CATEGORIES[2]}`}><li>{CATEGORIES[2].toUpperCase()}</li></Link>
                <Link to={`/product/${CATEGORIES[3]}`}><li>{CATEGORIES[3].toUpperCase()}</li></Link>
                <Link to={`/product/${CATEGORIES[4]}`}><li>{CATEGORIES[4].toUpperCase()}</li></Link>
            </ul>
        </div>
    </div>
    <div className=' flex justify-center'>
    <div className='flex flex-wrap justify-center w-4/5'>
    {
        allCategoryProducts.map(product =>  {
            return (
                <div className='m-3'>
                    <Card product={product}/>
                </div>
            )
        } )
    }
    </div>
    </div>
    </div>
  )
}
