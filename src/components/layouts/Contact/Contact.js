import React, { Component, useRef } from 'react'
import './Contact.css'
// import 'https://smtpjs.com/v3/smtp.js'
// import ContactImage from '../../../assets/contact.png'
import emailjs from 'emailjs-com'
import Profile from './../../../images/Profile.png'
import { displayActionMessage } from '../popups/alert'

export default class Contact extends Component {
  
  
  sendMail = (e)=>{
    e.preventDefault();
    console.log('sendMail func calling');
    try{
        emailjs.sendForm('service_hettxjp', 'template_94z7n2e', e.target, 'XCPho5Q_zU-falZEU')
          .then((result) => {
              console.log(result.text);
                  displayActionMessage("Email Sent", "success");
          }, (error) => {
              console.log(error.text);
              displayActionMessage("No Internet!", "error");
            });
          }catch(error){
               displayActionMessage("Some error Occured", "error");
        // console.log(error);
    }

      e.target.reset();
  }


  render() {

    return (
      <div className={`container-contact flex-container`}>
          <div className={`image-container-contact flex justify-center bg-gradient-to-r from-cyan-500 to-blue-500  bg-cover bg-center`}>
          <div className='form-container border w-11/12 md:w-2/5'>
            <h1 className='text-2xl text-white'>Write to us</h1>
              <form className='contact-form' onSubmit={this.sendMail}>
                <input type='text' name='name' placeholder='Name' required className={`input-box `}></input>
                <input type='email' name='email' placeholder='Email ID' required className={`input-box `}></input>
                <input type='number' name='number' placeholder='Mobile number'  required className={`input-box `}></input>
                <input type='text' name='organisation' placeholder='Organisation' required className={`input-box `}></input>
                <textarea rows="5" name='message' placeholder='Type your message here.' required className={``}/>
                <input type='submit' className={`send-btn send-btn-${this.props.mode}`} value="SEND"></input>
              </form>

          </div>  
          </div>

      </div>
    )
  }
}
