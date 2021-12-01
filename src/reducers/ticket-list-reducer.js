import * as c from './../actions/ActionTypes';

export default (state = {}, action) => {
  const { names, location, issue, id } = action;
  switch (action.type) { // because the action parameter takes an object, the reducer needs to look at the actions' type property
    case c.ADD_TICKET:
      return Object.assign({}, state, {
        [id] : {
          names: names,
          location: location,
          issue: issue,
          id: id
        }
      });
    case c.DELETE_TICKET:
      let newState = { ...state };
      delete newState[id];
      return newState;
    default:
      return state;
  }
};