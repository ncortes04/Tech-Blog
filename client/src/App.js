import logo from './logo.svg';
import Nav from './components/nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import authService from './utils/auth'
import { useState, useEffect } from 'react';
import Profile from './components/Profile';
import './App.css';
import Login from './components/login';
import { getSingle } from './utils/API'
import Singleposts from './components/Singleposts';
import Landing from './components/Landing';
import { getPostData } from "./utils/API";
import ViewProfile from './components/ViewProfile';
function App() {  
  const [userData, setUserData] = useState({});
  const [itemData, setItemData] = useState({items: {}, trending: {}});
  
  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = authService.loggedIn() ? authService.getToken() : null;
  
        if (!token) {
          return false;
        }
  
        const response = await getSingle(token);
  
        if (!response.ok) {
          throw new Error('something went wrong!');
        }
  
        const user = await response.json();
        setUserData(user.foundUser);
      } catch (err) {
        console.error(err);
      }
    };
  
    getUserData();
  }, []);
  
  useEffect(() => {

    const getItems = async () => {
      const response = await getPostData();
      const resItems = await response.json();
      const top = await [...resItems].sort((b, a) => a.comments.length -  b.comments.length)
      setItemData({items: resItems, trending: top});
    };
  
    getItems();
  }, [])
  return (
    <Router>
         <Nav/>
         <Routes>
            <Route path='/' element={<Landing trending={itemData.trending} posts={itemData.items}/>}/>
            <Route path='/viewprofile' element={<ViewProfile />} />
            <Route path='/profile'  element={ <Profile myself={userData}/>}/>
            <Route path='post' element={<Singleposts myself={userData.id} trending={itemData.trending}/>}/>
            <Route path='/login' element={<Login/>}/>
         </Routes>
    </Router>
  );
}

export default App;
