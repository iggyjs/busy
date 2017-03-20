/* eslint-disable */
//Change here to switch into development mode
//rename to just 'config.js'
//specify firebase details as listed below
const config = {
    DEVELOPMENT: false,
    firebase: {
        apiKey: '<FIREBASE_API_KEY>',
        authDomain: "<FIREBASE_AUTH_DOMAIN>",
        databaseURL: "<FIREBSE_DATABASE_URL>",
        storageBucket: "<FIREBASE_STORAGEBUCKET>",
        messagingSenderId: "<FIREBASE_MESSAGING_SENDER_ID>",
    }
};

module.exports = config;
