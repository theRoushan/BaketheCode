//To update the user personal information from profile.html
function submitUsers() {
    var firstName = document.getElementById("fname").value;
    var lastName = document.getElementById("lname").value;
    var fullName = firstName + " " + lastName;
    var mobile = document.getElementById("mobile").value;
    var course = document.getElementById("course").value;
    var degree = document.getElementById("degree").value;
    var startingYear = document.getElementById("starting-year").value;
    var graduatingYear = document.getElementById("graduating-year").value;
    var collegeName = document.getElementById("college-name").value;
    var collegeLocality = document.getElementById("college-locality").value;
    var collegeCity = document.getElementById("college-city").value;
    var collegeState = document.getElementById("college-state").value;
    var collegePinCode = document.getElementById("college-pincode").value;
    var collegeCountry = document.getElementById("college-country").value;
    var updatedFlag = "false";
    console.log("Button Clicked Successfully.");
    db.collection("users").doc(Auth.currentUser.uid).set({
        name: fullName,
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        course: course,
        degree: degree,
        startingYear: startingYear,
        graduatingYear: graduatingYear,
        collegeName: collegeName,
        collegeLocality: collegeLocality,
        collegeCity: collegeCity,
        collegeState: collegeState,
        collegePinCode: collegePinCode,
        collegeCountry: collegeCountry,
        updatedFlag: "true"
    }, {
        merge: true
    }).then(function() {
        Swal.fire({
            title: 'Data Saved Successfully',
            text: 'We have updated your Personal Information',
            icon: 'success',
            onClose: () => {
                window.location.replace("../index.html");
            }
        });
    });

}

function getUserProfile() {
    firebase.auth().onAuthStateChanged(function(user) {
        var docRef = db.collection("users").doc(user.uid);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                document.getElementById("fname").value = doc.data().fname;
                document.getElementById("lname").value = doc.data().lname;
                document.getElementById("mobile").value = doc.data().mobile;
                document.getElementById("course").value = doc.data().course;
                document.getElementById("degree").value = doc.data().degree;
                document.getElementById("starting-year").value = doc.data().startingYear;
                document.getElementById("graduating-year").value = doc.data().graduatingYear;
                document.getElementById("college-name").value = doc.data().collegeName;
                document.getElementById("college-locality").value = doc.data().collegeLocality;
                document.getElementById("college-city").value = doc.data().collegeCity;
                document.getElementById("college-state").value = doc.data().collegeState;
                document.getElementById("college-pincode").value = doc.data().collegePinCode;
                document.getElementById("college-country").value = doc.data().collegeCountry;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    })
}

/*It is used to load the question from database to te frontend*/
const questionList = document.querySelector(".main-content");
const setupQuestion = (data) => {
    let html = '';
    let navbtn = `<div class="toggle-question">
    <button class="backward">Previous</button>
    <button class="forward">Next</button>
</div>`;
    data.forEach(doc => {
        const question = doc.data();
        console.log(question);
        const problem = `<div class="problems hvr-grow">
        <div class="properties">
            <div class="level">
                <label for="level">Level : </label>
                <p class="level">${question.level}</p>
            </div>
            <div class="max-score">
                <label for="max-score">Max Score : </label>
                <p class="max-score">${question.maxScore}</p>
            </div>
            <div class="accuracy">
                <label for="accuracy">Accuracy : </label>
                <p class="accuracy">${question.accuracy}</p>
            </div>
        </div>
        <div class="problem-name">
            <h5>${question.name}</h5>
        </div>
        <div class="problem-statement">
            <p>${question.statement}</p>
        </div>
        <button class="read-more">See More</button>
    </div>`;
        html += problem
    });
    questionList.innerHTML = html + navbtn;
}

function getQuestion() {
    db.collection('questions').onSnapshot(snapshot => {
        setupQuestion(snapshot.docs)
    });

}