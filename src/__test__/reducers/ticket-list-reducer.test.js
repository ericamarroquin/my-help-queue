import ticketListReducer from '../../reducers/ticket-list-reducer';

describe ('testListReducer', () => {
  let action;
  const ticketData = {
    names: 'Ryan & Amir',
    location: '4b',
    issue: 'Redux no work',
    id: 1
  };

  const currentState = {
    1: {names: 'Ryan & Amir',
    location: '4b',
    issue: 'Redux no work',
    id: 1},
    2: {names: 'Jasmine & Justine',
    location: '2a',
    issue: 'Reducer has side effects',
    id: 2}
  };

  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(ticketListReducer({},{ type: null })).toEqual({});
  });

  test('Should successfully add new ticket data to mainTicketList', () => {
    const { names, location, issue, id } = ticketData;
    action = {
      type: 'ADD_TICKET',
      names: names,
      location: location,
      issue: issue,
      id: id
    };
    expect(ticketListReducer({}, action)).toEqual({
      [id] : {
        names: names,
        location: location,
        issue: issue,
        id: id
      }
    });
  });

  test('Should successfully delete a ticket', () => {
    action = {
      type: 'DELETE_TICKET',
      id: 1
    };
    expect(ticketListReducer(currentState, action)).toEqual({
      2: {names: 'Jasmine & Justine',
      location: '2a',
      issue: 'Reducer has side effects',
      id: 2 }
    });
  });
});