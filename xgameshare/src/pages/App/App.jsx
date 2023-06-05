import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';

import HomePage from '../HomePage/HomePage';
import SignupForm from '../../components/SignupForm/SignupForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useState } from 'react';
import { getUserToken } from '../../services/users/users-service';
import { auth, getTwitchAccessToken ,getAccessTokenExpiresIn, isTokenExpiring } from '../../services/auth/twitch/twitch-auth-service';

// import TwitchAuth from '../../components/TwitchAuth/TwitchAuth';


export default function App() {

  //Storing the user token at the App state level
  const [user, setUser] = useState(getUserToken());

  //Storing the Twich access token at the App state level
  const [twitchAccessToken, setTwitchAccessToken] = useState(getTwitchAccessToken());

  useEffect(() => {

    // Trigger the cascade of requests on component mount
    const fetchData = async () => {
        if (isTokenExpiring(getAccessTokenExpiresIn())) {
          const token = await auth();
          setTwitchAccessToken(token);
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
      </Routes>
    </>
  );
};


