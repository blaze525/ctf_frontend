import React from "react";
import Header from "./Header.jsx";
import StatisticTable from "./StatisticTable.jsx";
import "../styles/statistika.css";
import RatingUsers from "./ratingUsers.jsx";



export default function Statistika({login, setLogin}) {
  return (
    <div>
      <Header 
        login={login }
        setLogin={setLogin}  
      />
      <div className="column-statistic">
        <div className="statistics">
          <p className="result-showing">Siziň görkezen netijäňiz:</p>
          <StatisticTable  />
        </div>
        <RatingUsers />
      </div>
    </div>
  )
}