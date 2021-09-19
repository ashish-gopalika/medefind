import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import {getAuth,GoogleAuthProvider,signInWithPopup,onAuthStateChanged,signOut} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import {getFirestore,collection, addDoc,getDocs,updateDoc,arrayUnion,doc} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';

var userresult

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

function goToLink(link) {
    location.replace(link)
  }



const makeAuth =()=>{
    const provider = new GoogleAuthProvider(firebaseApp);
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        userresult=user
        // ...
        console.log("SignIn successful.")
        
        if(user)
          {
          var putdatayes;
          localStorage.clear()
          localStorage.setItem('email',userresult.email)         
            console.log(checkEmail(user));
            checkEmail(user).then(function(val) {
              putdatayes=val;
              console.log("value of putdatayes: "+putdatayes)
              if(putdatayes)
                postUserData(user)
            })
            
          goToLink('/src/index.html');  
          }
          
        
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
    
}
const stateCheck=()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid);
          console.log(userresult);
          try {
            console.log("Hello, "+userresult.displayName);
            loginstate=true;   
          } catch (error) {
              console.log("Not a user");
          }
          
          // ...
        } else {
          console.log("User is signed out");
          // ...
        }
      });
    }
// const signOutUser=()=>{
//     signOut(auth).then(() => {
//         console.log("Sign-out successful.") 
//       }).catch((error) => {
//         // An error happened.
//       });
// }

async function postUserData(user){
    try {
      const docRef = await addDoc(collection(db, "users"), {
        email: user.email,
        uname: user.displayName,
        orderhistory: []
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}


async function checkEmail(user){
  var putdatayes=1;

  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    if(doc.data().email==user.email)
    {
      putdatayes=0;
    }
});
return putdatayes;
}

document.getElementById("signinbutton").addEventListener("click", makeAuth);

