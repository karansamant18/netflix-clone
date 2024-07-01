
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDMgole8ft6rB7AEd3LdEBwvGheOQsUysQ",
    authDomain: "react-netflix-clone-e5074.firebaseapp.com",
    projectId: "react-netflix-clone-e5074",
    storageBucket: "react-netflix-clone-e5074.appspot.com",
    messagingSenderId: "544814093353",
    appId: "1:544814093353:web:cc4ddf522dfd5f956ff838"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);