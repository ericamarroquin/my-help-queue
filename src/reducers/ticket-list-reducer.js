export default (state = {}, action) => {
  const { names, location, issue, id } = action;
  switch (action.type) { //because the action parameter takes an object, the reducer needs to look at the actions' type property
    case 'ADD_TICKET':
    return Object.assign({}, state, {
      [id] : {
        names: names,
        location: location,
        issue: issue,
        id: id
      }
    });
    default:
      return state;
  }
};