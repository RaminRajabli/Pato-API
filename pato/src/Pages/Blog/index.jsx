import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import "./index.scss"

const image_icon = <FontAwesomeIcon icon={faImage}/>;


export default function Blog() {
  const [post, setPost] = React.useState(null);
  const [message, setMessage] = useState(""); 
  const [processing,setProcessing] = useState(false);


  const [headline,setHeadline] = useState("");
  let   [card_img, setCard_img] = useState("");
  const [description, setDescription] = useState("");


   // getting image url
  let handleImgUrl = (e)=>{
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = ()=>{
            card_img = reader.result
    }
    reader.readAsDataURL(file)
  }

  let date = new Date();
  let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  
  let handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    console.log(date);
    try{
      axios.post("https://ramin-final-default-rtdb.firebaseio.com/blog.json", {
        id : Date.now(),
        description : description,
        headline: headline,
        card_img: card_img,
        year : date.getFullYear(),
        month : month[date.getMonth()],
        day : date.getDate(),
      })
      .then((response) => {
        setPost(response.data);
        if (response.status === 200) {
            setProcessing(false);
            setHeadline("");
            setDescription("");
            setCard_img("");
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
    <div className='blog'>
         <div className="title">
           <h1>Blog</h1>
         </div>

         <div className="input">
             <div className="label">
                <h2>CARDS</h2>
             </div>
             
             <div className="card">
              <form onSubmit={handleSubmit}>
                   <label htmlFor="headline">Headline</label>
                   <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} id="headline" required />

                   <label htmlFor="description">Description</label>
                   <textarea  type="text" value={description} onChange={(e) => setDescription(e.target.value)} id="main_name"  required/>
                   
                   
                   
                   <label className='card_image' htmlFor="card_image"><span>Card Image</span> {image_icon} </label>
                   <input type="file" accept="image/*,.jpg" onChange={handleImgUrl} id="card_image" required/>
                   { !processing && <button type="submit">Submit</button>} 
                   { processing && <button type="submit" disabled>Submitting...</button>} 

                   {message ? <p>{message}</p> : null}
              </form>

              
            </div>
         </div>
         
    </div>
  )
}
