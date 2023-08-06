import './App.css';
import Navbar from './components/layouts/component/Navbar';
import SelectRole from './components/layouts/component/selectRole';
import Signup from './components/layouts/auth/signup'
import Login from './components/layouts/auth/login'
import Home from './components/layouts/home/Home'
import ProductDetails from './components/layouts/productDetails/productDetails';
import CategoryPage from './components/layouts/home/category/categoryPage'
import AddProduct from './components/layouts/home/products/addProduct';
import Profile from '../src/components/layouts/component/Profile'
import CartItems from './components/layouts/cart/cartItems';
import Footer from './components/layouts/component/Footer';
import OrderSummary from './components/layouts/order/orderSummary';
import ShippingDetails from './components/layouts/order/confirmShippingInfo'
import Payment from './components/layouts/order/Payment'
import ProtectedRoute from './ProtectedRoute/protectedRoute'
import AddProductBtn from './components/layouts/popups/addProductBtn';
import Contact from './components/layouts/Contact/Contact'
import About from './components/layouts/Contact/about'
import Shop from './components/layouts/component/Shop/shop';
import { BrowserRouter as Router, Route,Routes,  } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getSellerProducts } from './Actions/productActions';
import EditProduct from './components/layouts/component/Shop/EditProduct'

function App() {

const { isAuthenticated, user } = useSelector(state => state.user)
const dispatch = useDispatch()
console.log({user})
if(user)
dispatch(getSellerProducts(user._id))

  return (
    <Router>
      <div className='min-h-screen flex flex-col'>
      <Navbar/>
      <div className='h-14'></div>
      <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/product/details/:id" element={<ProductDetails/>} />
      <Route exact path="/product/:category" element={<CategoryPage/>} />
      
      <Route exact path="/addProduct" element={
        // <ProtectedRoute isAuthenticated={isAuthenticated} isAdminRoute={true} isAdmin={true}>
        <ProtectedRoute isAuthenticated={isAuthenticated} isAdminRoute={true} isAdmin={true}>
          <AddProduct/>
        </ProtectedRoute>
      } />
      
      
      {/* // can use outlet in sign and login route - if authorised already navigate to home  */}
      
      {/* <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/>}> */}
        <Route exact path="/signup" element={<SelectRole/>} />
        <Route exact path="/Signup/seller" element={<Signup/>} />
        <Route exact path="/Signup/buyer" element={<Signup/>} />
      {/* </Route> */}
       
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/shop" element={<Shop/>} />
        <Route exact path="/product/:id/edit" element={<EditProduct/>} />


      <Route exact path="/profile" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Profile/>
        </ProtectedRoute>  
      }/>
      <Route exact path="/cart" element={<CartItems/>} />
      <Route exact path="/order/order-summary" element={<OrderSummary/>} />
      <Route exact path="/order/shipping-details" element={<ShippingDetails/>} />
      <Route exact path="/order/payment" element={<Payment/>} />
      <Route exact path="/contactus" element={<Contact/>} />
      <Route exact path="/about" element={<About/>} />
      {/* <Route path='/' element={<Home/>}/> */}
      </Routes>
      {/* <Alert/> */}
      </div>
      {
        // console.log(user)
        isAuthenticated && user && user.role=="seller" ? (
          <AddProductBtn/>
        ) : (<></>)
      }
      <Footer/>
    </Router>
  )
}

export default App;
