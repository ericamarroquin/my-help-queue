import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm"
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { withFirestore, isLoaded } from 'react-redux-firebase';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTicket: null,
      editing: false
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() => 
      this.updateTicketElapsedWaitTime(),
    60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.mainTicketList).forEach(ticket => {
      const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    })
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        selectedTicket: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action); // dispatches action and updates the store
  }

  handleChangingSelectedTicket = (id) => {
    this.props.firestore.get({collection: 'tickets', doc: id}).then((ticket) => { // returns a pending promise, a 'DocumentSnapshot', a Firestone object that has read-only data
      const firestoreTicket = {
        names: ticket.get("names"),
        location: ticket.get("location"),
        issue: ticket.get("issue"),
        id: ticket.id
      }
      this.setState({selectedTicket: firestoreTicket});
    });
  }

  handleDeletingTicket = (id) => {
    this.props.firestore.delete({collection: 'tickets', doc: id});
    this.setState({selectedTicket: null})
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingTicketInList = () => {
    this.setState({
      editing: false,
      selectedTicket: null
    }); 
  }

  render(){
    const auth = this.props.firebase.auth();
    if (!isLoaded(auth)) {
      return (
        <React.Fragment>
          <h1>Loading...</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser == null)) {
      return (
        <React.Fragment>
          <h1>You must be signed in to access the queue.</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser != null)) {
      let currentlyVisibleState = null;
      let buttonText = null;
  
      if (this.state.editing) {
        currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} />
        buttonText = "Return to Ticket List";
      } else if (this.state.selectedTicket != null) {
        currentlyVisibleState = <TicketDetail ticket={this.state.selectedTicket} 
                                              onClickingDelete={this.handleDeletingTicket}
                                              onClickingEdit={this.handleEditClick} />
        buttonText = "Return to Ticket List";
      } else if (this.props.formVisibleOnPage) {
        currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}/> //passes function into child as a prop
        buttonText = "Return to Ticket List";
      } else {
        currentlyVisibleState = <TicketList ticketList={this.props.mainTicketList} 
                                            onTicketSelection={this.handleChangingSelectedTicket} />
        buttonText = "Add ticket";
      }
      return (
        <React.Fragment>
          {currentlyVisibleState}
          <button onClick={this.handleClick}>{buttonText}</button>
        </React.Fragment>
      );
    }
  }
}

TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => { // making state accessible as props
  return {
    formVisibleOnPage: state.formVisibleOnPage // key-value pairs determine the state slices that should be mapped to the components props
  }
}

TicketControl = connect(mapStateToProps)(TicketControl); // connect() is a higher order component (HOC), that takes an existing component, wraps it with additional functionality, and then returns it

export default withFirestore(TicketControl); // adds Firestore to a components props .. use this.props.firebase