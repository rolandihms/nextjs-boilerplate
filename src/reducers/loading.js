const loading = (state = [], action) => {
    switch (action.type) {
      case 'TOGGLE_LOADING':
        //console.log('IN TOGGLE_LOADING reducer');
        return action.payload
      default:
        return state
    }
  }
  
  export default loading