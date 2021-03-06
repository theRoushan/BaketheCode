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
const Auth = firebase.auth();
const db = firebase.firestore();


function redirect_to_homepage() {
    console.log("redirecting to homepage");
    location.replace("../index.html");
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
    $("login-form")[0].reset();

}

function hideModal() {
    location.replace(window.location.pathname);
}

function login() {

    var userEmail = document.getElementById("login-email").value;
    var userPass = document.getElementById("login-password").value;
    Auth.signInWithEmailAndPassword(userEmail, userPass).then(function() {
        localStorage.setItem("isLogged", "yes");
        if (Auth.currentUser.emailVerified) {
            hideModal();
            location.replace("../practice.html");
        } else {

        }
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/user-not-found") {
            userNotFound();
            console.log("User is not registered with us.");
        } else if (errorCode == "auth/wrong-password") {
            wrongCred();
            console.log("Wrong Email/Password entered. Try Again!!");
        }

    });

}

function signup() {
    var userEmail = document.getElementById("signup-email").value;
    var userPass = document.getElementById("signup-password").value;
    var confirm_userPass = document.getElementById("signup-password-confirmation").value;
    var username = document.getElementById("user-name").value;

    if (userPass == confirm_userPass) {
        Auth.createUserWithEmailAndPassword(userEmail, userPass).then(function(user) {
            console.log("user account created" + Auth.currentUser.email);
            localStorage.setItem("isLogged", "yes");
            Auth.currentUser.updateProfile({ displayName: username, photoURL: "https://pngimage.net/wp-content/uploads/2018/05/button-profile-png-7.png" });
            db.collection("username").doc(Auth.currentUser.uid).set({ username: username })
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error.code);
                });
            db.collection("users").doc(Auth.currentUser.uid).set({ username: username }, { merge: true });
        }).catch(function(error) {
            // Handle Errors here.
            $("signup-form")[0].reset();
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        });
    } else
        alert("Both Password donot match. Try Again.")
}

function verifyAccount() {
    Auth.currentUser.sendEmailVerification().then(function() {
        // Email sent.
        console.log("Email sent to " + Auth.currentUser.email);
    }).catch(function(error) {
        // An error happened.
        console.log("Email not set. Error : " + error.code);
    });
}

function sweeetAlertEmailVerification() {
    Swal.fire({
        title: 'Please Verify Account',
        text: "You won't be able to access our services without verification. Please Login after verifying your account.",
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Send Verification Email',
    }).then((result) => {

        if (result.value) {
            Swal.fire({
                title: 'Email sent to ' + Auth.currentUser.email,
                text: 'Check your email inbox for verification Link',
                icon: 'success',
                onClose: () => {
                    verifyAccount();
                    logout();
                }
            })
        }
    })
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
        console.log("Logged Out Successfully.");
        location.replace("../index.html");
        localStorage.setItem("isLogged", "no");
    }).catch(function(error) {
        // An error happened.
        console.log("Logout Error" + error.message);
    });
}