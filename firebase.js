
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getDatabase,ref, set,onChildAdded, onChildRemoved} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
  import { getAuth, GoogleAuthProvider,createUserWithEmailAndPassword, signInWithPopup , signInWithEmailAndPassword,onAuthStateChanged,updateProfile} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDWImw04bhv87RemR9PByrhcLFk50Kr-pc",
    authDomain: "socialui-44a5b.firebaseapp.com",
    databaseURL: "https://socialui-44a5b-default-rtdb.firebaseio.com",
    projectId: "socialui-44a5b",
    storageBucket: "socialui-44a5b.appspot.com",
    messagingSenderId: "787896959658",
    appId: "1:787896959658:web:d44ee5e888ef70d59106d3"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
const auth = getAuth(app);
auth.languageCode = 'en';

// sign in with google auth

document.addEventListener('DOMContentLoaded', function () {
  const auth = getAuth(app);
  auth.languageCode = 'en';
  const provider = new GoogleAuthProvider();

  const googleSignIn = document.getElementById("googleSignInBtn");

  if (googleSignIn) {
      googleSignIn.addEventListener('click', function (event) {
          event.preventDefault();

          signInWithPopup(auth, provider)
              .then((result) => {
                  // User is signed in
                  const user = result.user;
                  window.location.assign("home.html");
                  // You can redirect the user to another page or perform additional actions here.
              })
              .catch((error) => {
                  // Handle errors here
                  const errorCode = error.code;
                  const errorMessage = error.message;
              
                  alert(errorMessage, errorCode)
              });
      });
  }

  const loginButton = document.getElementById("googleLogInBtn");

  if (loginButton) {
      loginButton.addEventListener('click', function (event) {
          event.preventDefault();

          signInWithPopup(auth, provider)
              .then((result) => {
                  // User is signed in
                  const user = result.user;

                  
                  window.location.assign("home.html");
                  // You can redirect the user to another page or perform additional actions here.
              })
              .catch((error) => {
                  // Handle errors here
                  const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage, errorCode)
              });
      });
  }

 

});


// create user with email and password
const signup = document.getElementById('signUp');

 if(signup){
signup.addEventListener('click', (e) =>{
e.preventDefault();
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const username = document.getElementById('Username').value;

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
       // After signing up, update the user profile with the provided username
       return updateProfile(userCredential.user, { displayName: username });
      })
      .then(() => {
        // Successfully updated the user profile
        const user = auth.currentUser;
        window.location.assign("home.html");
      })

  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage, errorCode)
    // ..
  });

})
 }

// login with email and password

const login = document.getElementById('login');

if(login){
  login.addEventListener('click', (e) =>{
  e.preventDefault();
  const email = document.getElementById('emaillogin').value;
  const password = document.getElementById('passwordlogin').value;
  
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location.assign("home.html");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage, errorCode)
  });
  
  })
   }

// google
   const user= auth.CurrentUser;

   function updateUSerProfile(user){
      const userName = user.displayName;
      const email = user.email;
      const userPicture = user.photoURL;
      
  
      console.log("userName:", userName);
      console.log("email:", email);
      console.log("userPicture:", userPicture);
      
    

      document.getElementById('userName').textContent = userName;
      document.getElementById('e-mail').textContent = email;
      document.getElementById('userPicture').src = userPicture;

  //      console.log("userNameElement:", userNameElement);
  //  console.log("emailElement:", emailElement);
  //  console.log("userPictureElement:", userPictureElement);
  
   };
   onAuthStateChanged(auth, (user) =>{
  if(user){
      updateUSerProfile(user);
      const uid = user.uid;
  
      return uid;
  }
   })
  

  //  chatroom
  //
  //
  //viarables
  var msgTxt = document.getElementById('msgTxt');
  var sender;
  const msgbtn = document.querySelector('#msgBtn');
  const chatmsg = document.querySelector('#chatmessages');
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Set the sender variable to the user's username or any other identifier
       sender = user.displayName; // Assuming displayName is set during authentication
    }
  });

  //to send message

  msgbtn.addEventListener('click', () => {
    var msg = msgTxt.value;
    var timestamp = new Date().getTime();
    set(ref(db,"chatmsg/"+timestamp),{
        msg :msg,
        sender : sender
        
    })
    .then(() => {
      // Clear the input field after successfully sending the message
      msgTxt.value = "";
    })
  });

  
   // Receive message
onChildAdded(ref(db, "chatmsg"), (Data) => {
  if (Data.val().sender == sender) {
    chatmsg.innerHTML += "<li class='inner' id='" + Data.key + "'><h4>you: </h4>" + Data.val().msg + "<br><button style='background:none' class='dltMsg' data-key='" + Data.key + "'><i class='bx bxs-trash-alt'></i></button></li>";
  } else {
    chatmsg.innerHTML += "<li style='float:left' class='other' id='" + Data.key + "'>" +"<h4>"+ Data.val().sender + ":  </h4>"  + Data.val().msg + "</li>";
  }
});

// Event delegation for Delete Button
const dltmsg = document.getElementsByClassName('dltmsg');

// Add event listener to each element with the class 'dltmsg'
for (let i = 0; i < dltmsg.length; i++) {
  dltmsg[i].addEventListener('click', (event) => {
    const target = event.target;

    // Check if the clicked element is a delete button with the class 'dltMsg'
    if (target.classList.contains('dltMsg')) {
      const key = target.getAttribute('data-key');

      // Delete the message with the specified key
      set(ref(db, "chatmsg/" + key), null);
    }
  });
}

// When messages are deleted
onChildRemoved(ref(db, 'chatmsg'), (Data) => {
  const msgBox = document.getElementById(Data.key);
  if (msgBox) {
    chatmsg.removeChild(msgBox); // Remove the message element from the UI
  }
});
// ...

let messageCount = 0;

// Set up a listener for new messages
onChildAdded(ref(db, "chatmsg"), (data) => {
  if (data.val().sender !== sender) {
    // Increment the message counter only for messages received from others
    messageCount++;
    updateMessageCounter();
  }

  // Rest of your existing code for displaying messages
  // ...

});

function updateMessageCounter() {
    const counterElement = document.getElementById('messageCounter');
    counterElement.textContent = ` ${messageCount}+`;

    //   // Automatically hide the counter after a delay (e.g., 5 seconds)
    //   setTimeout(() => {
    //     counterElement.style.display = 'none';
    // }, 2000); // Adjust the time delay as needed
}

// ...
