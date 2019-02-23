const defaultState = {
  persons: []
};

export default function reducer(state = defaultState, action) {
  console.log('action');
  console.log(action);
  const { type, data } = action;

  switch (type) {
    // case 'server/selectperson':
    //   return { ...state, persons: data };
    case 'server/persons':
      return { ...state, persons: data };
    default:
      return state;
  }
}
