import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
//import moment from 'moment';
//import {fn as moment} from 'moment'

//import {toggleLoading} from './actions/index';

//import {actionTypes} from './constants/index';

import rootReducer from "./src/reducers/index";

const exampleInitialState = {
  loading: false,
  logged_in: false,
  push_status: false,
  notifications: [

  ],
  url: {
    query:{

    },
    body:{
      
    }
  },
  settings: {
    title: 'Wanderers Sports Club'
  },
  seo: {
    title: 'Wanderers Sports Club in Namibia',
    description: 'Wanderers Sports Club',
    fb:{

    }
  },
  general: {
    menu: {
      menu: []
    },
    page:{
      title: '',
      heading: '',
    },
    packages: {
      
    },
    package: {
      
    },
    content: {
      
    },
    posts: {

    },
    post:{
      
    }
  },
  member: {

  },
  show_menu:false
}

export function initializeStore (initialState = exampleInitialState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}