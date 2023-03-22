import React, { Component, useRef } from 'react'
import './Contact.css'
// import 'https://smtpjs.com/v3/smtp.js'
// import ContactImage from '../../../assets/contact.png'
import emailjs from 'emailjs-com'
import Profile from './../../../images/Profile.png'
import { displayActionMessage } from '../popups/alert'
import contactimage from './../../../images/contactimage.jpg'
import backgroundPic from './../../../images/background-pic.jpg'

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
              displayActionMessage("Offline?", "error");
          });
    }catch(error){
        console.log(error);
    }

      e.target.reset();
  }


  render() {

    return (
      <div className={`container-contact flex-container`}>
          <div className={`image-container-contact flex justify-center bg-[url(${backgroundPic})] bg-cover bg-center`}>
          <div className='form-container border'>
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
