const config = {
    authDomain: "protaski-9.firebaseapp.com",
    databaseURL: "https://protaski-9.firebaseio.com",
    storageBucket: "protaski-9.appspot.com"
};

firebase.initializeApp(config);

let newSubscriber = firebase.database().ref("email subscribers");
document.querySelector(".form-inline").addEventListener("submit", submitForm);
document.querySelector(".form-inline-mobile").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    let email = document.querySelector(".email").value;

    if (email != "") {
        firebase.database().ref("email subscribers").orderByChild("email").equalTo(email).once("value", snapshot => {
            if (snapshot.exists()) {
                console.log("User already exists");
                const email = snapshot.val();
            } else {
                const timestamp = Math.floor(Date.now() / 1000);
                saveSubscriber(email, timestamp);
                document.querySelector(".form-inline").reset();
            }
        });
    }
}

function saveSubscriber(email, timestamp) {
    let newSubscriberInfo = newSubscriber.push();
    newSubscriberInfo.set({
        email: email,
        timestamp: timestamp
    });
}