import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { setPushStatus } from '../actions/index';
//import { register, unregister } from 'next-offline/runtime';
import {updatePushSubscription } from '../lib/member-methods';

class OfflineSupport extends PureComponent {
  componentDidMount() {
    const {dispatch} = this.props;
    if ('serviceWorker' in navigator) {
      registerSW(this.props).catch(error => console.log(error));
      
    }
  }

  componentWillUnmount () {
    //unregister()
  }

  render() {
    return null;
  }
}




/* 

Register the Service Worker
 
*/
async function registerSW(props) {

    const {dispatch} = props;
    //console.log('Registering service worker');
    const registration = await navigator.serviceWorker.
      register('/service-worker.js', {scope: '/'});
    //console.log('Registered service worker');
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {

      if ('PushManager' in window) {
          // Do we already have a push message subscription?
          serviceWorkerRegistration.pushManager.getSubscription()
            .then(function(subscription) {
              // Enable any UI which subscribes / unsubscribes from
              // push messages.
              
              
      
              if (!subscription) {
                // We aren’t subscribed to push, so set UI
                // to allow the user to enable push
                //IE FIX to hid Subscription Buttons
                if (document.querySelectorAll) {
                    var els = document.querySelectorAll(".alert-push-button");
                    for (var x = 0; x < els.length; x++){
                        // Set your UI to show they have subscribed for
                        // push messages
                        //els[x].textContent = 'Disable Push Messages';
                        els[x].style.display = 'block';
                    }
                }
                dispatch(setPushStatus(false));
                return;
              }


              
              // Keep your server in sync with the latest subscriptionId
              //Submit Subscription to Server
              const res = updatePushSubscription(subscription);
              dispatch(setPushStatus(true));
              //isPushEnabled = true;
            })
            .catch(function(err) {
                console.log('Error during getSubscription()', err);
            });
        }
    });
}

/* 

Subscribe the Service Worker
PushManager
 
*/
/* async function subscribeSW() {

    console.log('Registering service worker');
    const registration = await navigator.serviceWorker.
      register('/service-worker.js', {scope: '/'});
    console.log('Registered service worker');

    console.log('Registering push');
    const subscription = await registration.pushManager.
      subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      });
    console.log('Registered push');

    console.log('Sending device detail');
    await fetch('http://localhost:3003/api/v1/push_subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'content-type': 'application/json'
      }
    });
    console.log('Sent push');
} */

//export default OfflineSupport;
export default connect(state => state)(OfflineSupport);