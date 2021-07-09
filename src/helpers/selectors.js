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
