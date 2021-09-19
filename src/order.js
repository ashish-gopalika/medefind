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
// {
//     pname:'',
//     sname:'',
//     quantity:0,
//     price:0,
//     rating:0
// }

var docus=[],keyus=[];
async function getProducts(){
  const querySnapshot = await getDocs(collection(db, "adminproducts"));
  querySnapshot.forEach((doc) => {
        getSnameById(doc.data().store,doc.data());
        docus.push(doc.data().product.pname); 
    });
    return arr;
}

var arr=[];
function getSnameById(storeid){
    console.log(typeof(storeid));
    for(var i of storeid){
        var key = Object.keys(i)[0]
        console.log(key)
        keyus.push(i)
        arr.push(key)
    }
}

async function getSname(key,docm,i){
    var details
    const querySnapshot = await getDocs(collection(db, "admincart"));
      querySnapshot.forEach((doc) => {
          
        if(doc.data().store.suid==key)
        {
            details={
                pname:docm,
                sname:doc.data().store.sname,
                quantity: i[key]['quantity'],
                price: i[key]['price'],
                rating: doc.data().store.rating
            }
          
        }

    });
    return details;
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

var finaldata=[]
// document.getElementById("signout").addEventListener("click", signOutUser)

getProducts().then((products) => {
    console.log(products)
    for(var j of docus){
    var c=0;
    for(var i of products) {
        getSname(i,j,keyus[c]).then((details) =>{
            finaldata.push(details)
        })
        c++;
    }

    }
    insertData();
    console.log(finaldata)

});

// pname: "ambroxyl"
// price: 12
// quantity: 90
// rating: 3
// sname: "medicao"
// [[Prototype]]: Object
// 1:
// pname: "ambroxyl"
// price: 10
// quantity: "100"
// rating: 2
// sname: "manas"



function insertData(){
    
    var s;
    s=`<div class="project-card">
    <h1 id="pname">${'ambroxyl'}</h1>
    <table class="tab">
        <tr>
            <th>Store</th>
            <th>Rating</th>
            <th>Price</th>
            <th>Quantity</th>
        </tr>
        <tr>
            <td>${'medicao'}</td>
            <td>${'3'}</td>
            <td>${'12'}</td>
            <td>${'90'}</td>
        </tr>
        <tr>
            <td>${'manas'}</td>
            <td>${'2'}</td>
            <td>${'10'}</td>
            <td>${'100'}</td>
        </tr>
    </table>
    
</div>`
    document.getElementById('getproduct').innerHTML=s;
}


// document.getElementById("arr").addEventListener("click", printarr)