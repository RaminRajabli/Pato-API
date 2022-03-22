import {
  Link,
  Routes,
  Route
} from "react-router-dom";

import Header from './components/Header';
import Menu from './Pages/Menu';
import Blog from "./Pages/Blog";
import Gallery from "./Pages/Gallery";
import Home from './Pages/Home';
import React from "react";

function App() {
  
  return (
    <div className="App">
      <Header/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/gallery" element={<Gallery/>}/>
      </Routes>

     
    </div>
  );
}
 
export default App;

