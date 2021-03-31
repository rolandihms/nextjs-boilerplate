import { combineReducers } from 'redux'
import loading from './loading'
import settings from './settings'
import general from './general'
import member from './member'

const show_menu = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      //console.log('IN TOGGLE_LOADING reducer');
      return action.payload
    default:
      return state
  }
}

const logged_in = (state = [], action) => {
    switch (action.type) {
      case 'SET_LOGIN_STATUS':
        //console.log('IN SET_LOGIN_STATUS reducer');
        return action.payload
      default:
        return state
    }
}


const url = (state = [], action) => {
  switch (action.type) {
    case 'SET_URL_DATE':
      //console.log('IN SET_URL_DATE reducer');
      return Object.assign({}, state, {
          query: action.payload.query, //set query string params
          
      })
    default:
      return state
  }
}

const seo = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEO_META':
      //console.log('IN SET_SEO_META reducer');
      return Object.assign({}, state, {
          title: action.payload.title,
          description: action.payload.description,
          fb: action.payload.fb,
      })
    default:
      return state
  }
}

const push_status = (state = [], action) => {
  switch (action.type) {
    case 'SET_PUSH_STATUS':
      //console.log('IN SET_SEO_META reducer');
      return action.payload
    default:
      return state
  }
}






const defaultState = {
  notifications: [],
};
const notifications = (state = defaultState, action) => {
  switch (action.type) {
      case 'ENQUEUE_SNACKBAR':
          /* return {
              ...state,
              notifications: [
                  ...state.notifications,
                  {
                      ...action.notification,
                  },
              ],
          }; */
          //console.log('Reducer notification')
          //console.log(action);
          var t = new Array();
          t.push(action.notification);
          return Object.assign([t], state, 
              t
          )
          //return [{action.notification}];
      case 'REMOVE_SNACKBAR':
          //console.log('Remove snack reducer');
          //console.log(action);
          //console.log(state);
          var n = state.filter(
              notification => notification.key !== action.key,
          );
          return Object.assign([n], state, 
              n
          )

      default:
          return state;
  }
};




export default combineReducers({
  loading,
  push_status,
  logged_in,
  notifications,
  url,
  seo,
  show_menu,
  settings,
  general,
  member
})