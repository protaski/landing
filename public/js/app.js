const config = {
    authDomain: "protaski-9.firebaseapp.com",
    databaseURL: "https://protaski-9.firebaseio.com",
    storageBucket: "protaski-9.appspot.com"
};

firebase.initializeApp(config);

let contactInfo = firebase.database().ref("info");
document.querySelector(".form-inline").addEventListener("submit", submitForm);
document.querySelector(".form-inline-mobile").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    let email = document.querySelector(".email").value;
    saveContactInfo(email);
    document.querySelector(".form-inline").reset();
}

function saveContactInfo(email) {
    let newContactInfo = contactInfo.push();
    newContactInfo.set({
        email: email,
    });
}