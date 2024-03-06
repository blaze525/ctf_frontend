import React, {useEffect} from "react";
import Chart from "./chart.jsx";
import axiosInstance from "../utils/axiosInstance.jsx";

export default function StatisticTable() {
  const [cotName, setCotName] = React.useState([])
  const [numberOfCot, setNumberOfCot] = React.useState(0)
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
  const pointItem = {
    name:"Utuk",
    number: 320,
    done: 9,
    color:"#00FFC2",
  }

  const statItems = cotName.map(item=> {
    return <Chart 
      key = {item.id}
      {...item}
    />
  })

  statItems.push(
  <Chart 
    key = {"point"}
    {...pointItem}
  />)
  return (
    <table className="stats-table">
      {statItems}
    </table>
  )
}