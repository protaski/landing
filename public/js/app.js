const config = {
    apiKey: "AIzaSyBAJ3q09DlPGVll6OqhgGKKYMHx8Eme6GU",
    authDomain: "protaski-9.firebaseapp.com",
    projectId: "protaski-9",
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
    console.log(email);
    saveContactInfo(email);
    document.querySelector(".form-inline").reset();
}

function saveContactInfo(email) {
    let newContactInfo = contactInfo.push();
    newContactInfo.set({
        email: email,
    });
}