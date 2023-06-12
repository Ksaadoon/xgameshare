import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';

import HomePage from '../HomePage/HomePage';
import SignupForm from '../../components/SignupForm/SignupForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useState } from 'react';
import { getUserToken } from '../../services/users/users-service';
import { auth, getAccessTokenExpiresIn, isTokenExpiring } from '../../services/auth/twitch/twitch-auth-service';
import InviteFriendForm from '../../components/ContactForm/ContactForm';
import Profile from '../Profile/Profile';


// import TwitchAuth from '../../components/TwitchAuth/TwitchAuth';


export default function App() {

  //The user token is securely stored in the local storage
  //Storing the user token securely in local storage and 
  //then using it to set the initial state value using useState is generally considered safe.
  const [user, setUser] = useState(getUserToken());



  useEffect(() => {

    // Trigger call get an Twitch access token only once at loading (empty dependency array)
    // and if the token is about to expired. The access token is securely stored in local storage.
    const fetchData = async () => {
      if (isTokenExpiring(getAccessTokenExpiresIn())) {
        return await auth();
      }
    };
    fetchData();
  }, []);

  /*
  The code commented out below related to the TwitchAuth Component, was the
  first attempt to do Twitch authentication on the client side. 
  BUT it is much safer to do this on the express server side for security purpose
  to protect the secret and client id.

  The new twitch authentication is now done in the backend with the twith-auth-service.
  */

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [accessToken, setAccessToken] = useState(null)
  // const [expiresIn, setExpiresIn] = useState(null);

  return (
    <>
      {/* <TwitchAuth setIsAuthenticated={setIsAuthenticated} 
                isAuthenticated={isAuthenticated} 
                setAccessToken={setAccessToken} 
                accessToken={accessToken} 
                setExpiresIn={setExpiresIn} 
                expiresIn={expiresIn}/> */}
      {/* Client side routes */}
      
      <Routes>
        <Route path="/login" element={<LoginForm setUser={setUser} user={user} />} />
        <Route path="/signup" element={<SignupForm setUser={setUser} user={user} />} />
        <Route path="/" element={<HomePage setUser={setUser} user={user} />} />
        <Route path="/invite" element={<InviteFriendForm setUser={setUser} user={user} />} />
        <Route path="/profile" element={<Profile setUser={setUser} user={user} />} />
      </Routes>
    </>
  );
};


