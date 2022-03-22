import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import "./index.scss"


const image_icon = <FontAwesomeIcon icon={faImage}/>;


export default function Gallery() {
  const [post, setPost] = React.useState(null);
  let   [picture, setPicture] = useState("");
  const [message, setMessage] = useState(""); 
  const [processing,setProcessing] = useState(false);
  const [category,setCategory] = useState("interior");

  // getting image url
  let handleImgUrl = (e)=>{
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = ()=>{
            picture = reader.result
    }
    reader.readAsDataURL(file)
  }

  let handleSubmit = async (e) => {
    if(picture == ""){
      alert("Invalid Input")
      return;
    }
   
   e.preventDefault();
   setProcessing(true);
   try{
     axios.post("https://ramin-final-default-rtdb.firebaseio.com/gallery.json", {
       id : Date.now(),
       picture: picture,
       category : category,
       
     })
     .then((response) => {
       setPost(response.data);
       if (response.status === 200) {
           setProcessing(false);
           setPicture("");
           setMessage("Uploaded");
         } else {
           setMessage("Some error occured");
       }
     });
   }catch (err) {
     console.log(err);
   }

   setPost(null);
   setMessage(null);
 }

  return (

    <div className='gallery'>
         <div className="title">
           <h1>GALLERY</h1>
         </div>

         <div className="input">
             <div className="label">
                <h2>PICTURES</h2>
             </div>
             <div className="pic">
               <form onSubmit={handleSubmit}>
                   <label className='category' htmlFor="category_">Category</label>
                   <select name="category" onChange={(e)=>{
                     let value = e.target.options[e.target.selectedIndex].value;
                     setCategory(value)
                   }} id="category_" required>
                            <option value="interior">Interior</option>
                            <option value="food">Food</option>
                            <option value="events">Events</option>
                            <option value="vip">VIP Guests</option>
                  </select>

                   <label className='picture_' htmlFor="card_image"><span>Picture</span> {image_icon} </label>
                   <input type="file" accept="image/*,.jpg" onChange={handleImgUrl} id="picture_" required/>
                   
                   
                   { !processing && <button type="submit">Submit</button>} 
                   { processing && <button type="submit" disabled>Submitting...</button>} 

                   {message ? <p>{message}</p> : null}
              </form>
             </div>
         </div>
         
    </div>
  )
}
