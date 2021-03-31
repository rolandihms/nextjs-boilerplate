// utils/AuthService.js
//Get Config From env Vars
import getConfig from 'next/config';
// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.
//const {  publicRuntimeConfig } = getConfig();


export default class AuthService {
    constructor(domain) {
      this.domain = domain || process.env.IA_BACKEND_URL
      this.fetch = this.fetch.bind(this)
      this.login = this.login.bind(this)
      this.getProfile = this.getProfile.bind(this)
    }
  
    login(email, password) {
      
      // Get a token
      return this.fetch(process.env.IA_BACKEND_URL+'/api/login/', {
        method: 'POST',
        body: JSON.stringify({
          bus_id: process.env.IA_BUS_ID,
          email: email,
          password: password,
          api_request: true,
          type: 'member'
        })
      }).then(res => {
        console.log('After Login')
        console.log(res);
        if(res.success){
            this.setToken(res.pass);
            this.setProfile(res.user);
            // /return Promise.resolve(res)
        }
        return Promise.resolve(res)
       /*  this.setToken(res.id_token)
        return this.fetch(`${this.domain}/user`, {
          method: 'GET'
        }) */
      })/* .then(res => {
        this.setProfile(res)
        return Promise.resolve(res)
      }) */
    }
  
    forgotPass(email) {
      
      // Get a token
      return this.fetch(process.env.IA_BACKEND_URL+'/api/password/', {
        method: 'POST',
        body: JSON.stringify({
          bus_id: process.env.IA_BUS_ID,
          email: email,
          api_request: true,
          type: 'member',
          redirect_url: 'https://www.wanderers.org.na/member/login/'
        })
      }).then(res => {
        console.log('After Login')
        console.log(res);
        if(res.success){
            //this.setToken(res.pass);
            //this.setProfile(res.user);
            // /return Promise.resolve(res)
        }
        return Promise.resolve(res)
       /*  this.setToken(res.id_token)
        return this.fetch(`${this.domain}/user`, {
          method: 'GET'
        }) */
      })/* .then(res => {
        this.setProfile(res)
        return Promise.resolve(res)
      }) */
    }



    loggedIn(){
      // Checks if there is a saved token and it's still valid
      const token = this.getToken()
      return !!token;
      //return !!token && !isTokenExpired(token) // handwaiving here
    }
  
    setProfile(profile){
      // Saves profile data to localStorage
      localStorage.setItem('profile', JSON.stringify(profile))
    }
  
    getProfile(){
      // Retrieves the profile data from localStorage
      const profile = localStorage.getItem('profile')
      return profile ? JSON.parse(localStorage.profile) : {
            first_name: '',
            last_name: '',
            contact_number: '',
            email: '',
            street: '',
            address: '',
            city: '',
            region: '',
            country: '',
            post_code: '',
            referal_name: '',
            referrer_name: ''
        }
    }
  
    setToken(idToken){
      // Saves user token to localStorage
      localStorage.setItem('id_token', idToken)
    }
  
    getToken(){
      // Retrieves the user token from localStorage
      return localStorage.getItem('id_token')
    }
  
    logout(){
      // Clear user token and profile data from localStorage
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
    }
  
    _checkStatus(response) {
      // raises an error in case response status is not a success
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }
  

    /* 

    Submit Member Application

    */
    async register(instance, param) {
      // submit
      param['bus_id'] = process.env.IA_BUS_ID;
      param['api_request'] = true;
      param['status'] = 3; //Requested
      return this.fetch(process.env.IA_BACKEND_URL+'/api/member_register/', {
        method: 'POST',
        body: JSON.stringify(param)
      }).then(res => {
        console.log('After Submit')
        console.log(res);
        if(res.success){
           
            // /return Promise.resolve(res)
        }
        res.instance = instance;
        return Promise.resolve(res)
      
      })/* .then(res => {
        this.setProfile(res)
        return Promise.resolve(res)
      }) */  

    }


    /* 

    Update Member Record

    */
   async update(instance, param) {
    // submit
    param['bus_id'] = process.env.IA_BUS_ID;
    param['api_request'] = true;
    param['status'] = 3; //Requested
    return this.fetch(process.env.IA_BACKEND_URL+'/api/member_update/', {
      method: 'POST',
      body: JSON.stringify(param)
    }).then(res => {
      console.log('After Submit')
      console.log(res);
      if(res.success){
          this.setProfile(param);
          // /return Promise.resolve(res)
      }
      res.instance = instance;
      return Promise.resolve(res)
    
    })/* .then(res => {
      this.setProfile(res)
      return Promise.resolve(res)
    }) */  

  }

    fetch(url, options){
      // performs api calls sending the required authentication headers
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
  
      if (this.loggedIn()){
        headers['Authorization'] = 'Bearer ' + this.getToken()
      }
  
      return fetch(url, {
        headers,
        ...options
      })
      .then(this._checkStatus)
      .then(response => response.json())
    }



  }