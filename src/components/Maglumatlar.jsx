import React, { useEffect } from "react";
import "../styles/maglumatlar.css";
import "../styles/card-info.css";
import Header from "./Header.jsx";
import Maglumat from "./Maglumat.jsx";
import axiosInstance from "../utils/axiosInstance.jsx";



export default function Maglumatlar({login, setLogin, special}) {
  const [information, setInformation] = React.useState([])

  const deleteInformation = async (id) => {
    try {
      await axiosInstance.delete(`/information/delete_categories/${id}`,
      {
        headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("my_ctf_token")}`,
      }
      }
      );
      const postsList = information.filter(post => post.id !== id);
      setInformation(postsList);
    }
       catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/information/get_subcategories');
        setInformation(response.data)
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }
    fetchPosts();
  }, [])
  const infoButtons = information.map(item => {
    return (
      <Maglumat 
        key={item.id}
        {...item}
        deleteInformation = {deleteInformation}
        special = {special}
      />
    )
  })
  return (
    <div className="main">
      <Header 
         login={login }
         setLogin={setLogin}  
      />
      <div className="div-maglumatlar">
        {infoButtons}
      </div>
    </div>
  )
}