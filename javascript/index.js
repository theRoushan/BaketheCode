var isLogged; //variable to chcek if the user is logged

function redirect_to_homepage() {
    location.replace("practice.html")
};


function checkAuthentication() {
    firebase.auth().onAuthStateChanged(function(user) {
        console.log('checkAuthentication() loaded successfully.');
        if (user) {
            // User is signed in.
            var user = firebase.auth().currentUser;

            if (user != null) {
                var email_id = user.email;
                Swal.fire({
                        position: 'top-end',
                        title: "Welcome User : " + email_id,
                        showConfirmButton: false,
                        timer: 1500,
                        width: 300,
                        height: 30
                    })
                    //redirects the user to haomepage if the user is already loggedin.
                redirect_to_homepage();
            }

        } else {
            // No user is signed in.



        }
    });
}

function login() {

    var userEmail = document.getElementById("email").value;
    var userPass = document.getElementById("password").value;
    var confirm_userPass = document.getElementById("confirm-password").value;

    if (userPass == confirm_userPass) {
        firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert("Error : " + errorMessage);

            // ...
        });
    } else
        alert("Both Password donot match. Try Again.")

}

function signup() {
    var userEmail = document.getElementById("email").value;
    var userPass = document.getElementById("password").value;
    var confirm_userPass = document.getElementById("confirm-password").value;

    if (userPass == confirm_userPass) {
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(function() {

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ...
        });
    } else
        alert("Both Password donot match. Try Again.")

}

function resetPassword() {
    var auth = firebase.auth();
    var emailAddress = document.getElementById("resetEmail").value;
    auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        document.getElementById("forgot-password").style.cssText = "display:none";
        document.getElementById("password-sent").style.cssText = "display:flex";
    }).catch(function(error) {
        // An error happened.
        alert(error);
    });
}

function logout() {
    firebase.auth().signOut();
    Swal.fire({
        position: 'top-end',
        title: 'Logged Out. Successfully.',
        showConfirmButton: false,
        timer: 1500,
        width: 300,
        height: 30
    })
}