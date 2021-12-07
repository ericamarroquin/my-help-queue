import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";
import { firestoreConnect, useFirestore } from 'react-redux-firebase';

function EditTicketForm (props) {
  const firestore = useFirestore();
  const { ticket } = props;

  function handleEditTicketFormSubmission(event) {
    event.preventDefault();
    props.onEditTicket(); // changes which component is rendered in TicketControl.js
    const propertiesToUpdate = {
      names: event.target.names.value,
      location: event.target.location.value,
      issue: event.target.issue.value
    }
    return firestore.update({collection: 'tickets', doc: ticket.id}, propertiesToUpdate) // first argument describes item to be updated, second contains the properties we want to update
  }

  return(
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleEditTicketFormSubmission}
        buttonText="Update Ticket" />
    </React.Fragment>
  );
}

EditTicketForm.propTypes = {
  ticket: PropTypes.object,
  onEditTicket: PropTypes.func
}

export default EditTicketForm;