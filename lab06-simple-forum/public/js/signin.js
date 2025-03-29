// Custom alert
function create_alert(type, message) {
    var alertarea = document.getElementById('custom-alert');
    if (type == "success") {
        str_html = "<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Success! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        alertarea.innerHTML = str_html;
    } else if (type == "error") {
        str_html = "<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Error! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        alertarea.innerHTML = str_html;
    }
}

function initApp() {
    // Login with Email/Password
    var txtEmail = document.getElementById('inputEmail');
    var txtPassword = document.getElementById('inputPassword');
    var btnLogin = document.getElementById('btnLogin');
    var btnGoogle = document.getElementById('btngoogle');
    var btnSignUp = document.getElementById('btnSignUp');

    // SIGN UP
    btnSignUp.addEventListener('click', function() {
        // TODO 2: Add email signup button event
        //     Steps:
        //     1. Get user input email and password to signup
        //     2. Show success message using custom alert by calling "create_alert()" and clear input field
        //     3. Show error message using custom alert by calling "create_alert()" and clear input field
        var email = txtEmail.value;
        var password = txtPassword.value;
        // Step 1: Sign up with email and password
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(userCredential) {
                // Step 2: Show success message and clear input fields
                create_alert('success', 'Sign up successful!');
                txtEmail.value = '';
                txtPassword.value = '';
                const user = userCredential.user;
            })
            .catch(function(error) {
                // Step 3: Show error message and clear input fields
                create_alert('error', error.message);
                txtEmail.value = '';
                txtPassword.value = '';
            });
    });

    // SIGN IN
    btnLogin.addEventListener('click', function() {
        // TODO 3: Add email login button event
        //     Steps:
        //     1. Get user input email and password to login
        //     2. Show success message using custom alert by calling "create_alert()" and clear input field
        //     3. Redirect to index.html when login success
        //     4. Show error message using custom alert by calling "create_alert()" and clear input field
        var email = txtEmail.value;
        var password = txtPassword.value;
        // Step 1: Sign in with email and password
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(userCredential) {
                // Step 2: Show success message, redirect, and clear input fields
                create_alert('success', 'Login successful!');
                window.location.href = "index.html"; // Redirect to index.html
                txtEmail.value = '';
                txtPassword.value = '';
            })
            .catch(function(error) {
                // Step 4: Show error message and clear input fields
                create_alert('error', error.message);
                txtEmail.value = '';
                txtPassword.value = '';
            });

    });

    // GOOGLE SIGN IN
    btnGoogle.addEventListener('click', function() {
        // TODO 4: Add google login button event
        //     Steps:
        //     1. Use pop-up function to login with google account
        //     2. Redirect to index.html when login success
        //     3. Show error message by "create_alert()"
        var provider = new firebase.auth.GoogleAuthProvider();
        // Step 1: Sign in with Google account using popup
        firebase.auth().signInWithPopup(provider)
            .then(function(result) {
                // Step 2: Show success message and redirect
                create_alert('success', 'Google login successful!');
                window.location.href = "index.html"; // Redirect to index.html
            })
            .catch(function(error) {
                // Step 3: Show error message
                create_alert('error', error.message);
            });
        
    });


}

window.onload = function() {
    initApp();
};