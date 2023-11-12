import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Create from './pages/createOffer'; 
import Item from './pages/itemPage';
import Login from './pages/login';
import Offers from './pages/offers';
import Profile from './pages/profile';
import About from './pages/about';
import Register from './pages/register';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={ <Offers /> } />
            <Route path='/offers/item' element={ <Item /> } />
            <Route path='/login' element={ <Login /> }/>
            <Route path='/register' element={ <Register /> }/>
            <Route path='/profile' element={ <Profile /> }/>
            <Route path='/create' element={ <Create /> }/>
            <Route path='/about' element={ <About /> }/>
        </Routes>
    );
}

export default AppRouter;