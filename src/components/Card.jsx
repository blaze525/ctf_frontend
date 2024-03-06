import React from "react";
import Image from "../images/contact.png";
import "../styles/card.css"

export default function Card(props) {

  return (
    <div>
    <div className="card">
      <div className="div-cot-item">
        <div className="row-information" style={{"marginRight":"auto"}}>
        <p className="cot-item-text">{props.categories_name}</p>
        </div>
        <img src={Image} className="contact-img" />
        <p className="point-text">| {props.point} utuk</p>
      </div>
      <div className="card-in">
        <p className="problem-text">{props.name}</p>
        <hr className="ss"/>
        <p className="number-done">{props.done} çözen</p>
      </div>
    </div>
    { props.special &&
    <button className="delete-button-1" onClick={()=>{
      props.delete(props.id)
      props.setQuestion(props.data)
      }
      }><i className="fa fa-trash" aria-hidden="true"></i></button>}
    </div>
  )
}