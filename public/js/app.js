const config = {
    authDomain: "protaski-9.firebaseapp.com",
    databaseURL: "https://protaski-9.firebaseio.com",
    storageBucket: "protaski-9.appspot.com"
};

firebase.initializeApp(config);

let contactInfo = firebase.database().ref("email subscribers");
document.querySelector(".form-inline").addEventListener("submit", submitForm);
document.querySelector(".form-inline-mobile").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    let email = document.querySelector(".email").value;

    if (email != "") {
        const timestamp = Math.floor(Date.now() / 1000);

        saveContactInfo(email, timestamp);
        document.querySelector(".form-inline").reset();
    }
}

function saveContactInfo(email, timestamp) {
    let newContactInfo = contactInfo.push();
    newContactInfo.set({
        email: email,
        timestamp: timestamp
    });
}