
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
 
  import {
    getDatabase,
    ref,
    child,
    get,
    push,
    set,
    onValue,
    serverTimestamp

  } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js"

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCIQGAj9VVGDUISdEBwoRfaVOve-jgOkDY",
    authDomain: "n01708514-http5214-firebase.firebaseapp.com",
    projectId: "n01708514-http5214-firebase",
    storageBucket: "n01708514-http5214-firebase.firebasestorage.app",
    messagingSenderId: "655525694624",
    appId: "1:655525694624:web:3bb4022242707e0d47cdc5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const database = getDatabase();

  const messages = ref(database, "/messages");


  //if messages changes, this code run automatically
  onValue(
    messages,
    (snapshot) => {

        //create a reference to the list
        const ul = document.getElementById('messages');

        ul.replaceChildren();

        // Loop through our messages collection
        snapshot.forEach((childSnapshot) => {

            // Get record data
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();

            console.log(childKey);
            console.log(childData);

            const text = document.createTextNode(
                childData.message + " ~ " + childData.name
            );
            const li = document.createElement("li");
            li.appendChild(text);
            ul.appendChild(li);
        })
    },
    {
        onlyOnce: false,
    }
  );

  const add = document.getElementById("add");

  add.addEventListener("click", function(e) {
  
      const name = document.getElementById("name");
      const message = document.getElementById("message");
  
      const newMessage = push(messages);
  
      set(newMessage, {
          name: name.value,
          message: message.value,
          createdAt: serverTimestamp(),
      });
  
      e.preventDefault();
  }); 