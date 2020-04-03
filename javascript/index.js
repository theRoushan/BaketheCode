function redirect_to_homepage() {
    location.replace("index.html")
};

firebase.auth().onAuthStateChanged(function(user) {
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