import React from "react";
import "../styles/chart.css"


export default function Chart(props) {
  const precentage = props.number!=0 && props.done!=0 ? (parseInt(props.done/props.number*100)).toString() : '0';
  const coloredPortion = {
    position: 'absolute',
    top: '1px',
    left: '1px',
    width: precentage+'%',
    height:'85%',
    backgroundColor: props.color,
    zIndex: '1',
    borderRadius: '20px',
    opacity: '0.8',
  }
  return (
    <tbody>
      <tr className={!props.number ? "offscreen" : "div-chart"}>
        <td><div  className="stats-name">{props.name}</div></td>
        <td>
          <div className="each-chart">
            <div className="content">
              {props.done} / {props.number}
            </div>
            <div style={coloredPortion}></div>
          </div>
        </td>
      </tr>
    </tbody>
  )
}
