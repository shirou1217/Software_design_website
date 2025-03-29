// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA1NkIAasI3UIl4k_wlIasr03cNFSozbMk",
    authDomain: "chatroom-110081014.firebaseapp.com",
    projectId: "chatroom-110081014",
    storageBucket: "chatroom-110081014.appspot.com",
    messagingSenderId: "1070451919175",
    appId: "1:1070451919175:web:c0f1742fa3b56c252da462"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Please fill in correct Email or Password !!')
      return
      // Don't continue running the code
    }
    if (validate_field(full_name) == false) {
      alert('Please fill in your name')
      return
    }
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        last_login : Date.now(),
        uid : user.uid
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
      // DOne
      alert('User Created!!')
      email.value = '';
      password.value = '';
      full_name='';
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Please fill in correct Email or Password !!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
      // Add this user to Firebase Database
      var database_ref = database.ref()
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)

      // Set full_name in sessionStorage
      sessionStorage.setItem('sender', full_name);

      // DOne
      alert('User Logged In!!')
      window.location.href = "chat.html"; // Redirect to index.html
      email.value = '';
      password.value = '';
      full_name='';
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }