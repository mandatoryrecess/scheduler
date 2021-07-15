import Button from "../Button";
import InterviewerList from "../InterviewerList";
import React, { useState } from "react";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  console.log('PROPS.INTERVIEW from line 7 in form.jsx', props.interviewer)
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const cancel = function () {
    reset();
    props.onCancel();
  };
  const reset = function () {
    setName("");
    setInterviewer(null);
  };
  function validate(name, interviewer) {
    if (name === "") {
      setError("student name cannot be blank");
      return;
    }
    console.log("interviewer from function validate form.jsx", interviewer)
    if (!interviewer) {
      setError("no interviewer chosen")
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }
  console.log("INTERVIEWER line 31 FORM", interviewer)
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            id="studentNameInForm"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            data-testid="student-name-input"
          />
        <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          onChange={props.onSave}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button
          id="SaveButton"
            confirm
            onClick={() => {
              validate(name, interviewer);
            }}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
