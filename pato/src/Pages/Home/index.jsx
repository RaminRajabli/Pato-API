import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Ratings from '../../components/ratings';

import "./index.scss";


const image_icon = <FontAwesomeIcon icon={faImage}/>;

export default function Home() {
  const [post, setPost] = React.useState(null);
  const [entering, setEntering] = useState("");
  let [background, setBackground] = useState("");
  const [r_name, setR_name] = useState("");
  const [message, setMessage] = useState("");
  const [processing,setProcessing] = useState(false);



  // getting image url
  let handleImgUrl = (e)=>{
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = ()=>{
            background = reader.result
    }
    reader.readAsDataURL(file)
  }
  let handleTitle = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try{
      axios.post("https://ramin-final-default-rtdb.firebaseio.com/home/entrance.json", {
        id : Date.now(),
        entering : entering,
        r_name : r_name,
        background : background,
      })
      .then((response) => {
        setPost(response.data);
        if (response.status === 200) {
            setProcessing(false);
            setEntering("");
            setR_name("");
            setBackground("");
            setMessage("Uploaded");
          } else {
            setMessage("Some error occured");
        }
      });
    }catch (err) {
      console.log(err);
    }

    setPost(null);
  }

  //discover section
  const [headline,setHeadline] = useState("");
  let [discoverimg, setDiscoverimg] = useState("");
  const [description, setDescription] = useState("");
  const [message2, setMessage2] = useState(""); 

  let handleImgUrl_card = (e)=>{
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = ()=>{
            discoverimg = reader.result
    }
    reader.readAsDataURL(file)
  }

  let handleDiscover = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try{
      axios.post("https://ramin-final-default-rtdb.firebaseio.com/y.json", {
        id : Date.now(),
        headline : headline,
        discoverimg : discoverimg,
        description : description,
      })
      .then((response) => {
        setPost(response.data);
        if (response.status === 200) {
            setProcessing(false);
            setHeadline("");
            setDescription("");
            setDiscoverimg("");
            setMessage2("Uploaded");
          } else {
            setMessage2("Some error occured");
        }
      });
    }catch (err) {
      console.log(err);
    }

    setPost(null);
  }

  // comments section
  const [comment,setComment] = useState({
    customerName: "",
    customerComment : "",
    customerOrigin : "",
    profilePicture :"",
    rates : "",
  })

  const {customerName,customerComment,customerOrigin} = comment;
  
  const getValue =(value)=>{
    comment.rates = value;
  }

  let handleProfileUrl=(e)=>{
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = ()=>{
            comment.profilePicture = reader.result;
    }
    reader.readAsDataURL(file)
  }
  
  let onInputChange = (e)=>{
    setComment({...comment,[e.target.name]:e.target.value})
  }

  let handleComments= async (e) =>{
    e.preventDefault();
    if(comment.rates ==""){
      alert("Please, rate!")
    }else{
      setProcessing(true);
    try{
      axios.post("https://ramin-final-default-rtdb.firebaseio.com/comments.json", {
        id : Date.now(),
        ...comment,
      })
      .then((response) => {
        setPost(response.data);
        if (response.status === 200) {
            setProcessing(false);
            setComment({
              customerName: "",
              customerComment : "",
              customerOrigin : "",
              profilePicture :"",
              rates : "",
            })
            
            setMessage2("Uploaded");
          } else {
            setMessage2("Some error occured");
        }
      });
    }catch (err) {
      console.log(err);
    }

    setPost(null);
    }
  }
  return (
    <div className='home'>

        <div className="title">
           <h1>HOME</h1>
        </div>
        
        <div className="main_entrance_input">
             <div className="label">
                <h2>Main Title</h2>
             </div>

             <div className="main_entrance">
              
               
               <form onSubmit={handleTitle}>
                    <label htmlFor="main_title">What to say to users?...</label>
                    <input type="text" value={entering} onChange={(e) => setEntering(e.target.value)} id="main_title" required />

                    <label htmlFor="main_name">Restaurant Name</label>
                    <input  type="text" value={r_name} onChange={(e) => setR_name(e.target.value)} id="main_name"  required/>
                    

                    <label className='background_image' htmlFor="main_background"><span>Background</span> {image_icon} </label>
                    <input type="file"  accept="image/*,.jpg" onChange={handleImgUrl} id="main_background" required/>
                    { !processing && <button type="submit">Submit</button>} 
                    { processing && <button type="submit" disabled>Submitting...</button>} 

                    {message ? <p>{message}</p> : null}
               </form>

               
             </div>
        </div>


        <div className="main_entrance_input">
             <div className="label">
                <h2>Discover</h2>
             </div>

             <div className="inputs_">
              
               
               <form onSubmit={handleDiscover}>
                    <label htmlFor="headline">Headline</label>
                    <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} id="headline" required />

                    <label htmlFor="description">Description</label>
                    <textarea  type="text" value={description} onChange={(e) => setDescription(e.target.value)} id="main_name"  required/>
                    

                    <label className='card_image' htmlFor="card_image"><span>Card Image</span> {image_icon} </label>
                    <input type="file"  accept="image/*,.jpg" onChange={handleImgUrl_card} id="card_image" required/>
                    { !processing && <button type="submit">Submit</button>} 
                    { processing && <button type="submit" disabled>Submitting...</button>} 

                    {message2 ? <p>{message2}</p> : null}
               </form>

               
             </div>
        </div>     

        <div className="main_entrance_input">
             <div className="label">
                <h2>Comments</h2>
             </div>

             <div className="inputs_">
              
               
               <form onSubmit={handleComments}>
                    <label htmlFor="customer_name">Customer Name</label>
                    <input type="text" name='customerName' value={customerName} onChange={(e) => onInputChange(e)} id="customer_name" required />

                    <label htmlFor="customer_from">Customer Origin</label>
                    <input type="text" name="customerOrigin" value={customerOrigin} onChange={(e) => onInputChange(e)} id="customer_from" required />

                    <label htmlFor="comment_">Comment</label>
                    <textarea  type="text" name="customerComment" value={customerComment} onChange={(e) => onInputChange(e)} id="comment_"  required/>
                    
                    <label className='customer_pic' htmlFor="customer_pic"><span>Customer Profile</span> {image_icon} </label>
                    <input type="file"  accept="image/*,.jpg" onChange={handleProfileUrl} id="customer_pic" required/>
                    

                    <Ratings func = {getValue} />

                    { !processing && <button style={{marginTop:"20px"}} type="submit">Submit</button>} 
                    { processing && <button style={{marginTop:"20px"}} type="submit" disabled>Submitting...</button>} 

                    {message2 ? <p>{message2}</p> : null}
               </form>

               
             </div>
        </div>
        
        
    </div>
  )
}

