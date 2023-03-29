import axios from "axios";
import { displayActionMessage } from "../components/layouts/popups/alert";

export const addToCart = (productId) => async(dispatch) =>{
    console.log("addToCart")

    const config = { headers: {"Content-Type": "application/json"}};
    const cartItems = JSON.parse(localStorage.getItem('cart-items')) || []
    console.log("cartItems.length"+cartItems.length)
    let i=0
    const func = (item)=>{
        console.log("first")
        return item.id==productId;
    }
    const arr = cartItems.filter(func)
    
    if(arr.length>0){
            displayActionMessage("Added Already!","info")
         return }

    // for(i=0; i<cartItems.lenth; i++){
    //     console.log("for----3#######")
    //     if(cartItems[i].id==productId){
    //         console.log("if")
    //         displayActionMessage("Added Already!","info")
    //         return
    //     }
    // }


try{

    const { data } =  await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/product/${productId}`,
          config
        );

        const item = {
            id : data.product._id,
            name : data.product.name,
            price : data.product.price,
            ratings : data.product.ratings,
            quantity : 1,
            image_url : data.product.image.url,
            Stock : data.product.Stock
        }
        

        let cartSubTotal = JSON.parse(localStorage.getItem('cart-subtotal')) || 0
        cartItems.push(item);
        cartSubTotal = cartSubTotal + data.product.price;
        localStorage.setItem('cart-items', JSON.stringify(cartItems))
        localStorage.setItem('cart-subtotal', JSON.stringify(cartSubTotal))

        dispatch({
            type: 'ADD_TO_CART',
            payload : {cartSubTotal, cartItems}
        })
      displayActionMessage("item added to cart", "success");
    } catch(error){
        if(window.navigator.onLine=='off')
            displayActionMessage("No Internet", "error");
            else 
                displayActionMessage("Some Error Occured!", "error");
    }

}

export const updateQuantityOfItem = ({id, updatedQty}) => async(dispatch) =>{
    console.log("updateQuantityOfItem")
    console.log("product id :" +  id)

    const cartItems = JSON.parse(localStorage.getItem('cart-items')) || []
    let cartSubTotal = JSON.parse(localStorage.getItem('cart-subtotal')) || 0

    cartItems.map( item => {
        if(item.id == id){
            if(item.quantity < updatedQty){
                cartSubTotal = cartSubTotal + item.price
            }else  cartSubTotal = cartSubTotal - item.price
            item.quantity = updatedQty
        }
    })
        
    localStorage.setItem('cart-items', JSON.stringify(cartItems))
    localStorage.setItem('cart-subtotal', JSON.stringify(cartSubTotal))

        dispatch({
            type: 'UPDATE_QUANTITY',
            payload : {cartSubTotal, cartItems}
        })
}

export const removeItem = (id) => async(dispatch) =>{
    console.log("removeitem")
    console.log("product id :" +  id)

    let cartItems = JSON.parse(localStorage.getItem('cart-items')) || []
    let cartSubTotal = JSON.parse(localStorage.getItem('cart-subtotal')) || 0

    let newCartItems = cartItems.filter( item => {
        if(item.id != id)
            return item
            cartSubTotal = cartSubTotal - item.price * item.quantity
    })
        
    localStorage.setItem('cart-items', JSON.stringify(newCartItems))
    localStorage.setItem('cart-subtotal', JSON.stringify(cartSubTotal))
    cartItems = newCartItems

        dispatch({
            type: 'DELETE_ITEM',
            payload : {cartSubTotal, cartItems}
        })
}