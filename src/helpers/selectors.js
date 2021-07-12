export function getAppointmentsForDay(state, day) {
  const returnAppointmentDays = [];
  let appointmentId = [];
  for (let elm of state.days) {
    if (elm.name === day) {
      appointmentId = elm.appointments;
    }
  }
  for (let app of appointmentId) {
    returnAppointmentDays.push(state.appointments[app]);
  }
  return returnAppointmentDays;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const id = interview.interviewer;
  const interviewer = state.interviewers[id];
  const result = { ...interview, interviewer };

  return result;
}

export function getInterviewersForDay(state, day) {
  const results = [];

  const dayObj = state.days.find((d) => d.name === day);

  if (!dayObj || !dayObj.interviewers) {
    return [];
  }
  

  for (const id of dayObj.interviewers) {
    const interviewer = state.interviewers[id];
    results.push(interviewer);
  }

  return results;
}
