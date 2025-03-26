import firebaseConfig from '../src/firebaseConfig.js';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

import '../src/styles.css';

// Initialize Firebase app and get Database instance
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ----- Email Submission -----

/**
 * Submits the email provided by the user and stores it in the database.
 */
function submitEmail() {
  const email = document.getElementById('emailInput').value;
  if (email) {
    // Track subscription event if dataLayer is available
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'subscribed',
        email: email,
      });
    }
    
    // Save email to Firebase Database
    const emailsRef = ref(database, 'emails');
    push(emailsRef, { email: email })
      .then(() => {
        alert("Welcome to Protaski! 🚀 You're on the list.");
        document.getElementById('emailInput').value = '';
      })
      .catch((error) => {
        console.error('Error saving email:', error);
      });
  }
}

// ----- Feedback Submission -----

/**
 * Submits the feedback provided by the user and stores it in the database.
 */
function submitFeedback() {
  const feedback = document.getElementById('feedbackInput').value;
  if (feedback) {
    // Save feedback to Firebase Database
    push(ref(database, 'feedback'), { feedback })
      .then(() => {
        alert('Thank you for your feedback!');
        document.getElementById('feedbackInput').value = '';
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error);
      });
  }
}

// ----- Expose Functions Globally -----

window.submitEmail = submitEmail;
window.submitFeedback = submitFeedback;

// Conditionally load Google Analytics for non-EEA visitors
fetch('https://ipapi.co/json/')
  .then(res => res.json())
  .then(data => {
    const isEEA = [
      'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
      'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU',
      'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
    ].includes(data.country_code);
    if (!isEEA) {
      loadGoogleAnalytics();
    }
  })
  .catch(error => {
    console.error('Error detecting location:', error);
  });

function loadGoogleAnalytics() {
  const script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=GTM-57FZP5N';
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'GTM-57FZP5N');
  };
}