//registrasiya
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import CardInfo from "./CardInfo";
import Search from "./Search";
import PaginationButtons from "./Button";
import Chart from "./chart.jsx";
import StatisticTable from "./StatisticTable.jsx";
import axiosInstance from "../utils/axiosInstance.jsx"; 

export default function MainContent({login, special}) {
  const [data, setData] = useState([]);
  const [allQuestion, setAllQuestion] = useState([])
  const [displayData, setDisplayData] = useState(data)
  const [cotName, setCotName] = React.useState([]);
  const [numberOfCot, setNumberOfCot] = React.useState(0);
  const [cotButton, setCotButton] =useState("magic")
  const history = useNavigate()


  const deleteCotegory = async (id) => {
    try {
      await axiosInstance.delete(`/categories/delete_categories/${id}`,
      {
        headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("my_ctf_token")}`,
      }
      }
      );
      const postsList = cotName.filter(post => post.id !== id);
      setCotName(postsList);
      history('/', { replace: true })    } 
       catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }//poka duzetmeli yeri bar

  // poka duzetmeli

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/categories/get_subcategories');
        setCotName(response.data.categories);
        setNumberOfCot(response.data.len);
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

  


  const cotItems=cotName.map(item=>{
    return (
      <button className="cot-item-button" onClick={()=>  {
        setCotButton(item.id)
        }} key={item.id}>
        {item.categories_name} {item.subcategories_len!==0 && `(${item.subcategories_len})`}
        { special && <button className="delete-button" onClick={()=>deleteCotegory(item.id)}><i className="fa fa-trash" aria-hidden="true"></i></button>}
      </button>
    )
    }
  )
  
  return (
      <div className="main-content">
        <div className="min-column">
        <div className={login ? "gozleg" : "offscreen"}>
            <p className="gozleg-text">Statistika</p>
            <StatisticTable />
          </div>
          <div className="gozleg">
            <p className="gozleg-text">Kotegoriýalar</p>
            <div className="column-cotegories">
            <button className="cot-item-button" onClick={()=>window.location.reload()} key={"Hemmesi"}>
              Hemmesi ({allQuestion})
            </button>
              {cotItems}
            </div>
          </div>
        </div>
        <PaginationButtons 
          url = {"/question/get_subcategories"}
          page_size = {12}
          setData = {setData}
          data = {data}
          special = {special}
          setAllQuestion={setAllQuestion}
          cotButton = {cotButton}
          setDisplayData = {setDisplayData}
          displayData = {displayData}
        />
      </div>  
  )
}