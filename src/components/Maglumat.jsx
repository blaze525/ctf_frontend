import React from "react";
import "../fontawesome/css/font-awesome.css";

export default function Maglumat(props) {
  const [hidden,setHidden] = React.useState(true)
  function toggleContent() {
    if (hidden) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }
  return (
    <div className="div-maglumat">
      <div className="row-information">
        <button onClick={toggleContent} className={hidden ? "maglumat-button" : "gray-button"}> 
          {props.title} <i className="fa fa-sort-down fa-lg triangle-icon"></i>
        </button>
        { props.special &&
        <button className="delete-button-3" onClick={(()=>props.deleteInformation(props.id))}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button> 
        }
      </div>
      <div className={hidden ? "hidden-content" : "open-screen" }>
        {props.subtitle}
      </div>
    </div>
  )
}