import axios from "axios";
import React, { useState, useEffect } from "react";
import { getSpotsForDay } from "helpers/selectors";

const useApplicationData = function () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayObj = state.days.find((item) => item.name == state.day);
    const spots = getSpotsForDay(dayObj, appointments);
    const newDay = { ...dayObj, spots };
    const newStateDays = state.days;
    newStateDays[newDay.id - 1] = newDay;

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...state, appointments, days: newStateDays });
    });
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayObj = state.days.find((item) => item.name == state.day);
    const spots = getSpotsForDay(dayObj, appointments);
    const newDay = { ...dayObj, spots };
    const newStateDays = state.days;
    newStateDays[newDay.id - 1] = newDay;

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({ ...state, appointments, days: newStateDays });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
