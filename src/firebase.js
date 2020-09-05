import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseconfig = {
    apiKey: "AIzaSyDTysmaRTD3vUAzLLamiMmln0K7KYuFoaA",
    authDomain: "turnoscasur-ab1df.firebaseapp.com",
    databaseURL: "https://turnoscasur-ab1df.firebaseio.com",
    projectId: "turnoscasur-ab1df",
    storageBucket: "turnoscasur-ab1df.appspot.com",
    messagingSenderId: "272650408036",
    appId: "1:272650408036:web:fafbeca5d250d92d7f4f71"
};

const fb = firebase.initializeApp(firebaseconfig);

export const db = fb.firestore();