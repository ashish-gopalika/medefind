import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import {getAuth,GoogleAuthProvider,signInWithPopup,onAuthStateChanged,signOut} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import {getFirestore,collection, addDoc,getDocs,updateDoc,arrayUnion,doc} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';


const firebaseApp= initializeApp({
    apiKey: "AIzaSyABE_VhKMetakp6u3az65jRzck3zCJPHJQ",
    authDomain: "healthfire-8b279.firebaseapp.com",
    projectId: "healthfire-8b279",
    storageBucket: "healthfire-8b279.appspot.com",
    messagingSenderId: "48632438260",
    appId: "1:48632438260:web:f6a1d28622503d68c8ada1"
});

const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

var uemail;

function goToLink(link) {
    location.replace(link)
  }

const stateCheck=()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid);
          uemail=user.email;
          console.log(uemail)
          try {
            console.log("Hello, "+user.displayName); 
          } catch (error) {
              console.log("Not a user");
          }
          
          // ...
        } else {
            goToLink('/src/signin.html')
        }
      });
    }



const signOutUser=()=>{
    signOut(auth).then(() => {
        console.log("Sign-out successful.");
        goToLink('/src/signin.html');
      }).catch((error) => {
        console.error(error);
      });
}



stateCheck();

document.getElementById("signout").addEventListener("click", signOutUser)


