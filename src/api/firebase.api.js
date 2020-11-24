import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { firebaseConfig } from "../constants";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

/**
 * @name signInWithGoogle
 * @description Open (Prompt) Google Auth Modal for the user to login
 * @param provider
 */
export const signInWithGoogle = () => auth.signInWithPopup(provider);

/**
 * @name findOrCreateUser
 * @description create user on database using firebase firestore
 * Verify if the user exists on the database and return it if not it will create
 * the user
 * @param userAuth
 * @retun user
 */
export const findOrCreateUser = async (userAuth) => {
  if (!userAuth) return;

  const { displayName, email } = userAuth;
  const createdAt = new Date();

  const newUser = {
    uid: userAuth.uid,
    displayName,
    email,
    history: [],
    createdAt,
  };

  const userRef = firestore.doc(`users/${newUser.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    try {
      await userRef.set(newUser);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  return snapshot.data();
};

/**
 * @name addTripToUserHistory
 * @description create user on database using firebase firestore
 * Verify if the user exists on the database and return it if not it will create
 * the user
 * @param userAuth
 * @param data
 * @retun user
 */
export const addTripToUserHistory = async (uid, data) => {
  try {
    const userRef = firestore.collection("users").doc(uid);

    const snapshot = await userRef.get();
    const userData = snapshot.data();
    const createdAt = new Date();

    userData.history.push({
      ...data,
      createdAt,
    });

    await userRef.set({
      ...userData,
    });

    return userData;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @name convertCollectionsSnapshotToMap
 * @description Convert the collections from firebase snapshot to map
 * @param firebaseSnapshot
 * @return collections
 */
export const convertCollectionsSnapshotToMap = (firebaseSnapshot) => {
  const transformedCollection = firebaseSnapshot.docs.map((docSnapshot) => {
    const { title, items } = docSnapshot.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docSnapshot.id,
      title,
      items,
    };
  });

  const reducedCollection = transformedCollection.reduce(
    (accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    },
    {},
  );

  return reducedCollection;
};

export default firebase;
