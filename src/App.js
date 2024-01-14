
import logo from './logo.svg';
import React from 'react';
import './App.css'; 
import { BrowserRouter, Routes,Route, Link } from 'react-router-dom';
import Prooducts from './components/Prooducts';
import Home from './components/Home';
import Footer from './components/Footer';
import Header from './components/Header';
import SideNav from './components/SideNav';
import Card from './components/Card';
import { useEffect, useState } from 'react';
import  "bootstrap/dist/css/bootstrap.min.css"
import CreateEmployee from './components/CreateEmployee';
function App() {
  //hooks = fct retourner l'etat actuel 
//séparer le code le statepar défaullt 1-LA VALEUR l'accesseur   2- l'umutateur por modifier setc
 const[currentRoute,setCurrentRoute]= useState();
  useEffect(()=>{
    const path=window.location.pathname;
   console.log(path);
     setCurrentRoute(path.slice(1,path.length));
   //path de lurl 
    // console.log("Message");
    //je voudrai que cettte execute achaque fois x et y change [x,y]
  },[]);

  //geerer les sidde efect 
  return ( 
<BrowserRouter>
<div >
<Header/>


<br>
</br>

<div>{/* Content Wrapper. Contains page content */}
    <div >
<ul className='nav na-pills'>
<li>
<Link onClick={()=>setCurrentRoute("card")}
className=
{ currentRoute=="card"?"btn btn-info ms-1":"btn btn-outline-info ms-1"} to={"/card"}>Stade</Link>
</li>
<li>
  <Link  onClick={()=>{setCurrentRoute("products")}}
className={ currentRoute == 'products' ? "btn btn-info ms-1":"btn btn-outline-info ms-1"} 
to={"/products"}>
Products</Link>
</li>
<li>
  <Link  onClick={()=>{setCurrentRoute("client")}}
className={ currentRoute == 'client' ? "btn btn-danger ms-1":"btn btn-outline-info ms-1"} 
to={"/client"}>
client</Link>
</li>
</ul>

<Routes>
  <Route path="/card" element={<Card/>}></Route>
  <Route path="/products" element={<Prooducts/>}></Route>
  <Route path="/add-stade" element={<CreateEmployee/>}></Route>
  <Route path="/Home" element={<Home/>}></Route>

</Routes>

</div>
</div></div>
</BrowserRouter> 
 );
}

export default App;
