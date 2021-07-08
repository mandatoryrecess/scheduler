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

