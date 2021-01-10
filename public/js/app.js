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
        const timestamp = Math.floor(Date.now() / 1000);

        saveSubscriber(email, timestamp);
        document.querySelector(".form-inline").reset();
    }
}

function saveSubscriber(email, timestamp) {
    let newSubscriberInfo = newSubscriber.push();
    newSubscriberInfo.set({
        email: email,
        timestamp: timestamp
    });
}

// retrieve subscriber
let ref = firebase.database().ref("email subscribers");
ref.on("value", getData);

function getData(data) {
    let info = data.val();
    let keys = Object.keys(info);

    for (let i = 0; i < keys.length; i++) {
        let i = keys[i];
        let email = info[i].email;
        let timestamp = info[i].timestamp;
        console.log(email);
    }
}