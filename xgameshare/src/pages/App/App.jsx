import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes , Route} from 'react-router-dom';

import HomePage from '../HomePage/HomePage';
import SignupForm from '../../components/SignupForm/SignupForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useState } from 'react';
import { getUser } from '../../services/users/users-service';
import TwitchAuth from '../../components/TwitchAuth/TwitchAuth';


export default function App() {

  const [user, setUser] = useState(getUser());

  /*
  In order to force the first-time authentication
  */
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null)
  const [expiresIn, setExpiresIn] = useState(null);

  return (
    <>
    <TwitchAuth setIsAuthenticated={setIsAuthenticated} 
                isAuthenticated={isAuthenticated} 
                setAccessToken={setAccessToken} 
                accessToken={accessToken} 
                setExpiresIn={setExpiresIn} 
                expiresIn={expiresIn}/>
    {/* Client side routes */}
    <Routes>
      <Route path="/login" element={ <LoginForm setUser={setUser} user={user}/> } />
      <Route path="/signup" element={ <SignupForm setUser={setUser} user={user} /> } />
      <Route path="/" element={<HomePage setUser={setUser} user={user} />} />
    </Routes>
    </>
  );
};


