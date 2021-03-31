const member = (state = [], action) => {
    switch (action.type) {
      case 'SET_MEMBER_REGISTRATION_DETAIL':
        console.log('IN SET_MEMBER_REGISTRATION_DETAIL reducer');
        return Object.assign({}, state, {
            detail: action.payload
        })
      case 'SET_MEMBER_OPTIONS':
        console.log('IN SET_MEMBER_OPTIONS reducer');
        return Object.assign({}, state, {
            options: action.payload
        })
      case 'SET_MEMBER':
          console.log('IN SET_MEMBER reducer');
          return Object.assign({}, state, {
              member: action.payload
          })
      default:
        return state
    }
  }
  
  export default member