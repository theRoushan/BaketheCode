firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.


        var user = firebase.auth().currentUser;

        if (user != null) {

            var email_id = user.email;
            document.getElementById("welcome-status").innerHTML = "Welcome User : " + email_id;

        }

    } else {
        // No user is signed in.



    }
});

function login() {

    var userEmail = document.getElementById("email").value;
    var userPass = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);

        // ...
    });

}

function signup() {

}

function create_account() {


    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

function logout() {
    firebase.auth().signOut();
}