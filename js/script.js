// Main code for our web app
//
//
console.log("** script.js **");


document.addEventListener('DOMContentLoaded', function () {

  // var btnPush = document.getElementById('push');
  // btnPush.addEventListener('click', PushNotification);

  var btnCopy = document.getElementById('copy');
  btnCopy.addEventListener('click', Copy);

  var btnClear = document.getElementById('clear');
  btnClear.addEventListener('click', Clear);


});

function Copy(){

  var firstName = document.getElementById("fname").value;
  document.getElementById("s_fname").value = firstName;

  var lastName  = document.getElementById("lname").value;
  document.getElementById("s_lname").value = lastName;

  var country  = document.getElementById("country").value;
  document.getElementById("s_country").value = country;

  var city  = document.getElementById("lcity").value;
  document.getElementById("s_lcity").value = city;

  var address  = document.getElementById("laddress").value;
  document.getElementById("s_laddress").value = address;
}


function Clear(){

  document.getElementById("s_fname").value = "";

  document.getElementById("s_lname").value = "";

  document.getElementById("s_country").value = "select"; //pay attention

  document.getElementById("s_lcity").value = "";

  document.getElementById("s_laddress").value = "";
}



// Detect when we are online / offline
//
window.addEventListener('load', function() {
  var status = document.getElementById("status");

  function updateOnlineStatus(event) {
    var condition = navigator.onLine ? "online" : "offline";

    status.className = condition;
  }

  window.addEventListener('online',  updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});



























function PushNotification(){

  initializeUI(registration);

}

















/*  PUSH NOTIFICATION  */



function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


const applicationServerPublicKey = 'BJ5IxJBWdeqFDJTvrZ4wNRu7UY2XigDXjgiUBYEYVXDudxhEs0ReOJRBcBHsPYgZ5dyV8VjyqzbQKS8V7bUAglk';

function subscribeUser() {
  const applicationServerKey = urlBase64ToUint8Array(applicationServerPublicKey);
  registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed.');

    // updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    // updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    // updateBtn();
  });
}

function unsubscribeUser() {
  registration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    // updateSubscriptionOnServer(null);

    console.log('User is unsubscribed.');
    isSubscribed = false;

    // updateBtn();
  });
}


function initializeUI() {
  // self.addEventListener('click', function() {
  //   debugger;
  //   self.disabled = true;
  //   if (isSubscribed) {
  //     // TODO: Unsubscribe user
  //   } else {
  //     subscribeUser();
  //   }
  // });

  subscribeUser();

  // Set the initial subscription value
  registration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    // updateSubscriptionOnServer(subscription);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    // updateBtn();
  });
}


