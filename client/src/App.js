import { useEffect } from 'react';
import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUserAuthenticated } from './redux/userSlice';

import './App.css';
import "./index.css";


import Navbar from './components/Navbar';

//Pages
// import {Home, Auth, AvailablePickups,ScheduledPickUps,History, Order, About, CollectorRequest,CollectorOrders, Contact} from "./pages"
import Home from './pages/Home';
import Auth from "./pages/Auth";
import Leaderboard from './pages/LeaderBoard';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenExpiration = () => {
      console.log("Called");
      const token = localStorage.getItem("profile");
      if (token) {
        if (Date.now() / 1000 > jwtDecode(token).exp) { 
          localStorage.clear();
          dispatch(setUserAuthenticated(false));
        } else {
          dispatch(setUserAuthenticated(true));
        }
      }
    };
    const tokenCheckInterval = setInterval(checkTokenExpiration, 30 * 60 * 1000);
    return () => clearInterval(tokenCheckInterval);
  }, [dispatch]); 

  return (
    <BrowserRouter>
         <div className="App relative font-primary">
            <Navbar/>
            <Routes>
            <Route path = '/' exact element = {<Navigate to = '/home'/>}/>
            <Route path = '/home' exact element = {<Home/>}/>
            <Route path ='/auth' element={<Auth/>}/>
            <Route path = '/leaderBoard' exact element = {<Leaderboard/>}/>
            </Routes>
        </div>
        </BrowserRouter>
  );
}

export default App;
