const config = {
    apiKey: "AIzaSyBAJ3q09DlPGVll6OqhgGKKYMHx8Eme6GU",
    authDomain: "protaski-9.firebaseapp.com",
    databaseURL: "https://protaski-9.firebaseio.com",
    storageBucket: "protaski-9.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

document.getElementById('subscribe').addEventListener('click', event => {
    const leadEmail = document.getElementById('user_email').value;

    if (leadEmail != "") {

        const leadTimestamp = Math.floor(Date.now() / 1000);

        firebase.database().ref('leads').once('value', snapshot => {
            var totalLeads = snapshot.numChildren();
            totalLeads++;

            firebase.database().ref('leads').child(totalLeads).set({
                email: leadEmail,
                timestamp: leadTimestamp
            });
            alert('Subscribed!');

        }, function (error) {
            console.log(error);
        });
    } else {
        alert('Please fill all the fields.');
    }
});