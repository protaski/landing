const config = {
    authDomain: "protaski-9.firebaseapp.com",
    databaseURL: "https://protaski-9.firebaseio.com",
    storageBucket: "protaski-9.appspot.com"
};

firebase.initializeApp(config);

let emailSubscriber = firebase.database().ref("subscribers");
document.querySelector(".form-inline").addEventListener("submit", webForm);
document.querySelector(".form-inline-mobile").addEventListener("submit", mobileForm);

function webForm(e) {
    e.preventDefault();
    let email = document.getElementById("web-email").value;
    if (email != "") {
        firebase.database().ref("subscribers").orderByChild("email").equalTo(email).once("value", snapshot => {
            if (snapshot.exists()) {
                alert("You're already subscribed!");
            } else {
                const timestamp = Math.floor(Date.now() / 1000);
                saveSubscriber(email, timestamp);
                document.querySelector(".form-inline").reset();
            }
        });
    }
}

function mobileForm(e) {
    e.preventDefault();
    let email = document.getElementById("mobile-email").value;
    if (email != "") {
        firebase.database().ref("subscribers").orderByChild("email").equalTo(email).once("value", snapshot => {
            if (snapshot.exists()) {
                alert("You're already subscribed!");
            } else {
                const timestamp = Math.floor(Date.now() / 1000);
                saveSubscriber(email, timestamp);
                document.querySelector(".form-inline-mobile").reset();
            }
        });
    }
}

function saveSubscriber(email, timestamp) {
    let newSubscriberInfo = emailSubscriber.push();
    newSubscriberInfo.set({
        email: email,
        timestamp: timestamp
    });
}