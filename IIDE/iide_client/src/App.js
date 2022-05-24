import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Add_data from './components/Add_data';
import {Routes, Route} from "react-router-dom";
import Editdata from './components/Editdata';
import Details from './components/Details';


function App() {
  return (
    
      <>
        <Navbar />
        <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/add_data" element={<Add_data />}></Route>
        <Route exact path="/Edit/:id" element={<Editdata />}></Route>
        <Route exact path="/details/:id" element={<Details />}></Route>
        </Routes>
        
      </>
    
  );
}
export default App;

