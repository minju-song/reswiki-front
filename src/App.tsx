import React from 'react';
import logo from './logo.svg';
import './App.css';
import BaseLayout from './layouts/BaseLayout';
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import RestaurantPage from './pages/restaurant/RestaurantPage';
import AddRestaurant from './pages/restaurant/AddRestaurant';
import Login from './pages/member/Login';
import Register from './pages/member/Register';
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/searchPage' element={<Search/>}/>
        <Route path='/restaurant/:id' element={<RestaurantPage/>}/>
        <Route path='/restaurant/add' element={<AddRestaurant />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BaseLayout>
  );
}

export default App;
