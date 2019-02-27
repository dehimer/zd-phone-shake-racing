const defaultState = {};

export default function reducer(state = defaultState, action) {
  console.log('action');
  console.log(action);
  const { type, data } = action;

  switch (type) {
    case 'server/selectedperson':
      return { ...state, person: data };
    case 'server/unselectedperson':
      return { ...state, person: null };
    case 'server/persons':
      return { ...state, persons: data };
    default:
      return state;
  }
}
