import React from "react";
import { useState } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETE";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
    .bookInterview(props.id, interview)
    .then(() => {transition(SHOW)})
    .catch(error => transition(ERROR_SAVE, true)); 
  };

  function destroy(event){
    transition(DELETE, true) 
    props
    .cancelInterview(props.id, props.interview)
    .then(() => {transition(EMPTY)})
    .catch(error => transition(ERROR_DELETE, true)); 
  };

  function confirm() {
    transition(CONFIRM)
  }
  
  function edit() {
    transition(EDIT)
  }

  return (
    <article className="appointment">
      {props.time}

      <Header />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={edit}
          onDelete={confirm}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
     )} 

     {mode === DELETE && (
        <Status message="delete" > </Status>
        )} 

    {mode === CONFIRM && (
        <Confirm message="Are you sure you want to delete this?" onCancel={back} onConfirm={destroy} > </Confirm>
        )} 

    {mode === EDIT && (
    <Form name={props.interview.student} interviewers={props.interviewers} onCancel={back} onSave={save} />
    )}

    {mode === ERROR_SAVE && (
      <Error message="ERROR" onClose={back}/>
    )}

    {mode === ERROR_DELETE && (
      <Error message="ERROR" onClose={back}/>
    )}  

    </article>
  );
}
