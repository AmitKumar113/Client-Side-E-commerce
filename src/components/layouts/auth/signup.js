import React, { useState} from "react";
import axios from "axios";
import "./form.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Profile from '../../../images/Profile.png'
import { AVATAR_MAX_SIZE } from "../../../constants/productConstant";
import { displayActionMessage } from "../popups/alert";

// import { useState }
function Signup() {
  const navigate = useNavigate();
  const location = useLocation()

  const [avatar, setAvatar] = useState(Profile)
  const [avatarPreview, setAvatarPreview] = useState(Profile)

  const registerDataChange = (e) => {
    console.log(e.target.files[0].size)
    setAvatar(e.target.files[0]);
    console.log("avatar"+avatar)
//// ERROR : when file goes empty after selecting one as size is undefind
    if(e.target.name === "file" &&  e.target.files[0].size >=1000*1000){
        document.querySelector('#size-warning').classList.add('text-red-900');
        document.querySelector('#signup-btn').disabled = true;
        document.querySelector('#signup-btn').classList.add('cursor-not-allowed');
      } else {
        document.querySelector('#size-warning').classList.remove('text-red-900');
        document.querySelector('#signup-btn').classList.remove('cursor-not-allowed');
        document.querySelector('#signup-btn').disabled = false;
    }

      const reader = new FileReader();

      reader.onload = () => {
        // if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          // setAvatar(reader.result);
        // }
      };
      reader.readAsDataURL(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted");

    let role = location.pathname=='/signup/seller'?'seller':'buyer';
    
    const myForm = new FormData();
    myForm.append('name', document.querySelector('[name="name"]').value);
    myForm.append('email', document.querySelector('[name="email"]').value.toLowerCase() );
    myForm.append('password', document.querySelector('[name="password"]').value);
    myForm.append('role', role);
    myForm.append('avatar', avatar);

    const config = { headers: { "Content-Type": "multipart/form-data"} };

    try{
        await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/signup`,
          myForm,
          config
        );
        displayActionMessage("Signup Successful", "success")
      } catch(error){
        console.log({error})
        displayActionMessage("No Internet", "info")
    }
    //can we validate length of input in tag only ?
    // console.log({ data });
    
    if (navigate.length >= 2)
          navigate(-2)
     else navigate('/')
    
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center my-12">
      <div className=" flex flex-col justify-center w-1/3 pt-4 bg-slate-300">
        <span className="text-center text-3xl py-4">Signup</span>
        <div className=" flex justify-center ">
          <div className={`w-24 h-24 bg-slate-500 rounded-full bg-[url(${avatarPreview})] bg-cover bg-center`}>
          </div>
        </div>
        <p id="size-warning" className="px-2 w-full text-center">max : 1MB</p>
        <form
          className="flex-box-column [&>*]:w-4/5 [&>*]:h-12 [&>*]:my-1 [&>*]:px-2"
          onSubmit={handleSubmit}
        >
          <input name="avatar" type='file' onChange= {(e)=> registerDataChange(e)}></input>
          <input placeholder="Full Name" name="name" required></input>
          <input placeholder="Email" name="email" required></input>
          <input placeholder="Password" name="password" required></input>
          <button id="signup-btn" type="submit" className="btn py-4 px-12 bg-green-600 my-8">
            Signup
          </button>
          <p className="text-sm">
            Already have an account?
            <Link to="/login">
              <span className="underline pl-2">Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
