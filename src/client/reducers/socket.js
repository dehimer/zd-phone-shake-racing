export default function reducer(state = {}, action){
  console.log('action');
  console.log(action);
  switch(action.type){
    // case 'message':
    //   return { ...state, message: action.data };
    case 'disconnect':
      return { ...state, disconnected: true };
    case 'reconnect':
      return { ...state, disconnected: false };
    default:
      return state;
  }
}
