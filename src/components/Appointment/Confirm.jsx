import React from "react";
import Button from "../Button";

export default function Confirm(props) {


  return (
    <main alt="appointment_confirm" className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button alt="confirmDelete" danger onClick={props.onConfirm}>Confirm</Button>
      </section>
    </main>
  );
}

