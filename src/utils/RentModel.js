import Config from "../config/config.env";
import * as firebase from "firebase";
import "firebase/firestore";

const {
  apiKey,
  appId,
  authDomain,
  projectId,
  databaseURL,
  storageBucket,
  messagingSenderId,
} = Config.firebase;

firebase.initializeApp({
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  databaseURL: databaseURL,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
});

let db = firebase.firestore();

export function insertRentData(link, price, space_size, comment) {
  db.collection("rents").add({
    link: link,
    price: price,
    space_size: space_size,
    comment: comment
  })
}

export function getRents() {
  db.collection("rents").get().then((querySnapshot) => {
    querySnapshot.forEach((rent) => {
        console.log(`${rent.id} => ${rent.data()}`);
    });
  });
}