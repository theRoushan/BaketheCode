// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAhqCG0zNjGhYKGLeEQfXMcdzbb8oHrRyE",
    authDomain: "bakethecode.firebaseapp.com",
    databaseURL: "https://bakethecode.firebaseio.com",
    projectId: "bakethecode",
    storageBucket: "bakethecode.appspot.com",
    messagingSenderId: "500298729385",
    appId: "1:500298729385:web:f976d794c09f415413a6b8",
    measurementId: "G-2XX6K8LV35"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
/*Variables */
var userEmail;
var userPass;
const Auth = firebase.auth();
const db = firebase.firestore();

function redirect_to_homepage() {
    location.replace("practice.html")
};

function mobileNav() {
    var height = document.getElementById("header");
    if (height.style.height === "70px") {
        document.getElementById("nav").style.display = "block";
        document.getElementById("authentication-state-links").style.display = "block";
        document.getElementById("header").style.height = "340px";
    } else {
        document.getElementById("header").style.height = "70px";
        document.getElementById("nav").style.display = "none";
        document.getElementById("authentication-state-links").style.display = "none";
    }
}

/* JQuery for Modal */

function showRegisterForm() {
    $('.loginBox').fadeOut('fast', function() {
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast', function() {
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Register with');
    });
    $('.error').removeClass('alert alert-danger').html('');

}

function showLoginForm() {
    $('#loginModal .registerBox').fadeOut('fast', function() {
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast', function() {
            $('.login-footer').fadeIn('fast');
        });

        $('.modal-title').html('Login with');
    });
    $('.error').removeClass('alert alert-danger').html('');
}

function openLoginModal() {
    showLoginForm();
    setTimeout(function() {
        $('#loginModal').modal('show');
    }, 230);

}

function openRegisterModal() {
    showRegisterForm();
    setTimeout(function() {
        $('#loginModal').modal('show');
    }, 230);

}


function wrongCred() {
    $('#loginModal .modal-dialog').addClass('shake');
    $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
    $('input[type="password"]').val('');
    setTimeout(function() {
        $('#loginModal .modal-dialog').removeClass('shake');
    }, 1000);
    $("#login-form")[0].reset();

}

function userNotFound() {
    $('#loginModal .modal-dialog').addClass('shake');
    $('.error').addClass('alert alert-danger').html("User not Found.");
    $('input[type="password"]').val('');
    setTimeout(function() {
        $('#loginModal .modal-dialog').removeClass('shake');
    }, 1000);
    $("#login-form")[0].reset();

}

function hideModal() {
    location.replace(window.location.pathname);
}


/* ******************* */
function checkAuthentication() {
    Auth.onAuthStateChanged(function(user) {
        console.log('checkAuthentication() loaded successfully.');
        if (user) {
            // User is signed in.
            var user = Auth.currentUser;

            if (user != null) {
                alert("User is logged in");
                //redirects the user to haomepage if the user is already loggedin.
                redirect_to_homepage();
            }

        } else {
            // No user is signed in.
            alert("user is not logged in.");

        }
    });
}

function login() {

    userEmail = document.getElementById("login-email").value;
    userPass = document.getElementById("login-password").value;
    Auth.signInWithEmailAndPassword(userEmail, userPass).then(function() {
        if (Auth.currentUser.emailVerified) {
            hideModal();
        } else {
            location.replace("user/profile.html");
        }
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/user-not-found") {
            userNotFound();
        } else if (errorCode == "auth/wrong-password") {
            wrongCred();
        }

    });

}

function signup() {
    userEmail = document.getElementById("signup-email").value;
    userPass = document.getElementById("signup-password").value;
    confirm_userPass = document.getElementById("signup-password-confirmation").value;

    if (userPass == confirm_userPass) {
        Auth.createUserWithEmailAndPassword(userEmail, userPass).then(function(user) {
            Auth.currentUser.sendEmailVerification().then(function() {
                // Email sent.
                alert("Email verification has been sent to " + userEmail);
                location.replace("user/profile.html");
            }).catch(function(error) {
                // An error happened.
            });
        }).catch(function(error) {
            // Handle Errors here.
            $("#signup-form")[0].reset();
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ...
        });
    } else
        alert("Both Password donot match. Try Again.")

}

function signInWithGoogle() {
    Auth.signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

function resetPassword() {
    var emailAddress = document.getElementById("resetEmail").value;
    Auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        document.getElementById("forgot-password").style.cssText = "display:none";
        document.getElementById("password-sent").style.cssText = "display:flex";
    }).catch(function(error) {
        // An error happened.
        alert(error);
    });
}

function logout() {
    Auth.signOut().then(function() {
        // Sign-out successful.
        alert("Logged Out. Successfully.");
    }).catch(function(error) {
        // An error happened.
    });
}