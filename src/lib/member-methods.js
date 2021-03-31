//Web API content methods for Members
/* 
Roland Ihms

 */

//Get Config From env Vars
import getConfig from 'next/config';
// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.
//const {  serverRuntimeConfig, publicRuntimeConfig } = getConfig();
require('isomorphic-fetch');

const api_url = process.env.IA_API_URL;
const bus_id = process.env.IA_BUS_ID;
const app_key = process.env.IA_APP_KEY;
const app_secret = process.env.IA_APP_SECRET;
const backend_url = process.env.IA_BACKEND_URL;
const publicVapidKey = process.env.IA_PUBLIC_VAPID_KEY;

//Content-Methods / Functions
import { getToken} from './content-methods';

import AuthService from './auth-service';



/* 

Get Wanderers Million Draw Ticket lookup

*/
export async function getTicket(param) {
    //build query string
    var esc = encodeURIComponent;
    var query = Object.keys(param)
        .map(k => esc(k) + '=' + esc(param[k]))
        .join('&'); 

    //Get Token for web api requests
    const token = await getToken();


    //get Menus
    try {
        const ticketRes = await fetch(backend_url+'/api/ticket_search/?bus_id='+bus_id+'&'+query+'&token='+token.token)
        var ticket = await ticketRes.json()

        if(ticket.success){
            
        }
        return ticket;
    } catch (e){
        var ticket = {
            'error': e.toString()
        }
        return ticket;
    }
}

/* 

Get Member Types

*/
export async function getMemberTypes(param) {
    //build query string
    var esc = encodeURIComponent;
    var query = Object.keys(param)
        .map(k => esc(k) + '=' + esc(param[k]))
        .join('&'); 

    //Get Token for web api requests
    const token = await getToken();


    //get Menus
    try {
        const typeRes = await fetch(api_url+'/api/v1/member_types/?bus_id='+bus_id+'&'+query+'&token='+token.token)
        var types = await typeRes.json()

        if(types.result){
            types = types.result;
            return types;
        }
    } catch (e){
        var types = {
            'error': e.toString()
        }
        return types;
    }
}

/* 

Submit Member Application

*/
export async function submitMemberApplication(param) {
    //submit
    try {
        //Add bus_id
        param['bus_id'] = bus_id;
        //Get Packages

        const rawResponse = await fetch(api_url+'/api/v1/packages', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        });
        var content = await rawResponse.json();
        if(content.result){
            content = content.result;
        }
        return content;


    }catch (e) {
        var content = {
            'error': e.toString()
        }
        return content;
    }
}


/* 

Send PUSH Notification

*/
export async function sendPushNotification(param) {
    //submit
    try {

        //Get Token for web api requests
        const token = await getToken();
        //Add bus_id
        param['bus_id'] = bus_id;
        //Send Push Notification
        console.log('Sending device detail');
        const rawResponse = await fetch(api_url+'/api/v1/push_message&token='+token.token, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        });
        var content = await rawResponse.json();
        if(content.result){
            content = content.result;
        }
        return content;


    }catch (e) {
        var content = {
            'error': e.toString()
        }
        return content;
    }
}


  /* 

Register the Service Worker
 
*/
async function registerSW() {

    //submit
    try {
       
        console.log('Registering service worker');
        const registration = await navigator.serviceWorker.
            register('/service-worker.js', {scope: '/'});
        console.log('Registered service worker');
        return registration;


    }catch (e) {
        var content = {
            'error': e.toString()
        }
        return content;
    }
}

/* 

Subscribe the Service Worker
PushManager
 
*/
export async function subscribeSW(profile) {
    //submit
    try {


        console.log('Registering service worker');
        const registration = await navigator.serviceWorker.
            register('/service-worker.js', {scope: '/'});
        console.log('Registered service worker');

        console.log('Registering push');
        var subscription = await registration.pushManager.
            subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
            });

        //Submit Subscription to Server
        const res = await updatePushSubscription(subscription);
        
        //IE FIX to hid Subscription Buttons
        if (document.querySelectorAll) {
            var els = document.querySelectorAll(".alert-push-button");
            for (var x = 0; x < els.length; x++){
              // Set your UI to show they have subscribed for
              // push messages
              //els[x].textContent = 'Disable Push Messages';
              els[x].style.display = 'none';
            }
        }
        return res;
       

    }catch (e) {
        var res = {
            'error': e.toString()
        }
        return res;
    }
    
    
}
/* 

Subscribe the Service Worker
PushManager
 
*/
export async function updatePushSubscription(subscription) {
    //submit
    try {
        console.log('In update Subscription');
        const Auth = new AuthService(process.env.IA_BACKEND_URL);
        //Get User if logged in
        var user = {};
        if (Auth.loggedIn()) {
            //console.log('LOOOOOOOOOOOOOOOOOedddi in');
            user = Auth.getProfile();
            //console.log(user);
        }
        //console.log('Registered push');
        var sendData = {
            bus_id: bus_id,
            member_id: user.member_id || null,
            subscription: subscription
        }

        //console.log('Sending device detail with');
        //console.log(subscription);
        //Get Token for web api requests
        const token = await getToken();
        sendData['token'] = token.token;
        await fetch(api_url+'/api/v1/push_subscribe?token='+token.token, {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                'content-type': 'application/json'
            }
        });
        ///console.log('Sent push Subscription');

    }catch (e) {
        var content = {
            'error': e.toString()
        }
        return content;
    }
    
    
}





function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }