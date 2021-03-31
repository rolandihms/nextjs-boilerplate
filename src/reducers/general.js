const general = (state = [], action) => {
    switch (action.type) {
      case 'LOAD_APP':
        //console.log('IN LOAD_APP reducer');
        return Object.assign({}, state, {
            show_menu: action.payload
        })
      case 'SET_MENU':
        //console.log('IN SET_MENU reducer');
        return Object.assign({}, state, {
            menu: action.payload 
        })
      case 'SET_PAGE_CONTENT':
        //console.log('IN SET_PAGE_CONTENT reducer');
        return Object.assign({}, state, {
            page: action.payload
        })
      case 'SET_PACKAGES':
        //console.log('IN SET_PACKAGES reducer');
        return Object.assign({}, state, {
            packages: action.payload
        })
      case 'SET_PACKAGE':
        //console.log('IN SET_PACKAGE reducer');
        return Object.assign({}, state, {
            package: action.payload
        })
      case 'SET_POSTS':
        //console.log('IN SET_POSTS reducer');
        return Object.assign({}, state, {
            posts: action.payload
        })
      case 'SET_POST':
        //console.log('IN SET_PACKAGE reducer');
        return Object.assign({}, state, {
            post: action.payload
        })
      case 'SET_CONTENT':
        //console.log('IN SET_CONTENT reducer');
        return Object.assign({}, state, {
            content: action.payload
        })
      default:
        return state
    }
  }
  
  export default general