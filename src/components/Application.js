import "./Application.scss";
import DayList from  './DayList';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Appointment from "components/Appointment";




const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Al Lee",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 3,
    time: "6pm",
    interview: {
      student: "Bear Brun",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 6,
    time: "8am",
    interview: {
      student: "Cactus Kid",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  }
];


export default function Application(props) {
  const [days, setDays] = useState([]);

  const [day, setDay] = useState("Monday");

  
useEffect(() => {
  const dayData = 'http://localhost:8001/api/days';
  axios.get(dayData)
      .then(res => {
        console.log(res)
         setDays(res.data); });
  }, [])

  const appointmentList = appointments.map( (appointment)  => {
    return (
    <Appointment 
    key={appointment.id} 
    id={appointment.id} 
    time={appointment.time} 
    interview={appointment.interview} 
    />
    )
  
  });

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">

      <DayList days={days} day={day} setDay={setDay} />

      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
          { appointmentList }

        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>

    </main>
  );
}
