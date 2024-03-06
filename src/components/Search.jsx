import React from "react";
import "../fontawesome/css/font-awesome.css";

export default function Search(props) {
    return (
        <div className="gozleg-1">
          <div className="gozleg-text">Gözleg</div>
          <div className="div-search">
            <input type="text" placeholder="Gözle ..." className="gozleg-input" onChange={
              (e) => props.setSearch(e.target.value)} />
            <button className="gozleg-button"><i className="fa fa-search search-icon" aria-hidden="true" /></button>
          </div>
        </div>
    )
}