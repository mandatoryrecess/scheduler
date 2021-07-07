import React from 'react'
import styles from "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  
  
  return (
    <article className="appointment"> 
    {props.time}
     <Header /> 
      {props.interview ? <Show {...props}/> : <Empty {...props}/>}
    </article>
  );
}

