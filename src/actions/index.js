// ACTIONS
  
    
  export const getSettings = (settings) => dispatch => {
    //console.log('In GET_SETTINGS step action');
    //console.log(settings)
    return dispatch({ type: 'GET_SETTINGS', payload: settings })
  }
  
  export const toggleLoading = (loading) => dispatch => {
    //console.log('In Laoding step action');
    //console.log(loading)
    return dispatch({ type: 'TOGGLE_LOADING', payload: loading , ts: Date.now()})
  }

  export const toggleMenu = (open) => dispatch => {
    console.log('In toggleMenu step action');
    console.log(open)
    return dispatch({ type: 'TOGGLE_MENU', payload: open })
  }

  export const setMenu = (menu) => dispatch => {
    //console.log('In setMenu step action');
    //console.log(menu)
    if(typeof menu !== 'undefined'){
      //console.log(menu)
      return dispatch({ type: 'SET_MENU', payload: menu })
    }
    

  }

  export const setSettings = (settings) => dispatch => {
    //console.log('In setSettings step action');
    //console.log(settings)
    return dispatch({ type: 'SET_SETTINGS', payload: settings })
  }

  export const setPageContent = (page) => dispatch => {
    //console.log('In setPageContent step action');
    //console.log(page)
    return dispatch({ type: 'SET_PAGE_CONTENT', payload: page })
  }
  
  export const setSeoMeta = (seo) => dispatch => {
    //console.log('In setSeoMeta step action');
    //console.log(seo)
    return dispatch({ type: 'SET_SEO_META', payload: seo })
  }

  export const setPosts = (posts) => dispatch => {
    //console.log('In setPosts step action');
    //console.log(posts)
    return dispatch({ type: 'SET_POSTS', payload: posts })
  }
  export const setPost = (post) => dispatch => {
    //console.log('In setPost step action');
    //console.log(post)
    return dispatch({ type: 'SET_POST', payload: post })
  }
  
  export const setPostContent = (post) => dispatch => {
    //console.log('In setPostContent step action');
    //console.log(post)
    return dispatch({ type: 'SET_POST_CONTENT', payload: post })
  }
  
  export const setURL = (data) => dispatch => {
    //console.log('In setURL step action');
    //console.log(data)
    return dispatch({ type: 'SET_URL_DATA', payload: data })
  }
  
  export const setPackages = (packages) => dispatch => {
    //console.log('In setPackages step action');
    //console.log(packages)
    return dispatch({ type: 'SET_PACKAGES', payload: packages })
  }
  export const setPackage = (packageS) => dispatch => {
    //console.log('In setPackage step action');
    //console.log(packageS)
    return dispatch({ type: 'SET_PACKAGE', payload: packageS })
  }
  
  
  export const setContent = (content) => dispatch => {
    //console.log('In setContent step action');
    //console.log(content)
    return dispatch({ type: 'SET_CONTENT', payload: content })
  }
  

  
  
  export const setMemberRegistration = (content) => dispatch => {
    //console.log('In setMemberRegistration step action');
    //console.log(content)
    return dispatch({ type: 'SET_MEMBER_REGISTRATION_DETAIL', payload: content })
  }
  
  
  export const setMemberOptions = (content) => dispatch => {
    //console.log('In setMemberOptions step action');
    //console.log(content)
    return dispatch({ type: 'SET_MEMBER_OPTIONS', payload: content })
  }
  
  
  export const setLogin = (loggedIn) => dispatch => {
    //console.log('In setLogin step action');
    //console.log(loggedIn)
    return dispatch({ type: 'SET_LOGIN_STATUS', payload: loggedIn , ts: Date.now()})
  }
  export const setMember = (member) => dispatch => {
    //console.log('In setLogin step action');
    //console.log(loggedIn)
    return dispatch({ type: 'SET_MEMBER', payload: member , ts: Date.now()})
  }
  
  export const setPushStatus = (subscription) => dispatch => {
    //console.log('In setPushStatus step action');
    //console.log(subscription)
    return dispatch({ type: 'SET_PUSH_STATUS', payload: subscription , ts: Date.now()})
  }

  export const enqueueSnackbar = (notification) => dispatch => {
      console.log('In enqueueSnackbar step action');
      console.log(notification);
      return dispatch({ type: 'ENQUEUE_SNACKBAR',
                      notification: {
                          key: new Date().getTime() + Math.random(),
                          message: notification.message,
                          options: notification.options
                      } 
                  })
  }


  export const removeSnackbar = (key) => dispatch => {
    //console.log('In removeSnackbar step action');
    //console.log(key)
    return dispatch({ type: 'REMOVE_SNACKBAR',key })
  }
