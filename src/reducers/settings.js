const settings = (state = [], action) => {
    switch (action.type) {
      case 'GET_SETTINGS':
        console.log('IN GET_SETTINGS reducer');
        return Object.assign({}, state, {
            settings: action.payload
        })
      case 'SET_SETTINGS':
        return action.payload || null;
      default:
        return state
    }
  }
  
  export default settings