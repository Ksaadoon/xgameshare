import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes , Route} from 'react-router-dom';

import HomePage from '../HomePage/HomePage';
import SignupForm from '../../components/SignupForm/SignupForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function App() {
  return (
    <>
    {/* Client side routes */}
    <Routes>
      <Route path="/login" element={ <LoginForm /> } />
      <Route path="/signup" element={ <SignupForm /> } />
      <Route path="/" element={<HomePage />} />
    </Routes>
    </>
  );
};


