import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Create from './pages/createOffer/createOffer'; 
import Item from './pages/itemPage';
import Login from './pages/login';
import Offers from './pages/offers';
import Profile from './pages/profile';
import About from './pages/about';
import Register from './pages/register';
import Chat from './pages/chatPage';
import OfferPublished from './pages/createOffer/offerPublished';
import Test from "./pages/test";

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={ <Offers /> } />
            <Route path='/offers/item/:id' element={ <Item /> } />
            <Route path='/login' element={ <Login /> }/>
            <Route path='/register' element={ <Register /> }/>
            <Route path='/profile/:id' element={ <Profile /> }/>
            <Route path='/create' element={ <Create /> }/>
            <Route path='/about' element={ <About /> }/>
            <Route path='/chat' element={ <Chat /> }/>
            <Route path='/create/published' element={ <OfferPublished /> }/>
            <Route path='/test' element={<Test/>}/>
        </Routes>
    );
}

export default AppRouter;