import React from "react";
import "./DayListItem.scss";
import classnames from 'classnames';

export default function DayListItem(props) {
  const daysLeft = props.spots 

  const formatSpots = function() { 
    if(daysLeft > 1) {
      return daysLeft + " spots remaining";
    }
    if(daysLeft === 1) {
      return daysLeft + " spot remaining";
    }
    if(daysLeft === 0) {
      return "no spots remaining";
    }
  }

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected, 
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}