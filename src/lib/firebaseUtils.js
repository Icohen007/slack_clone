import { auth, firebase } from '../firebaseConfig';

export const enhance = (hookResult) => {
  const [value, loading, error] = hookResult;
  const isReady = !loading && !error;
  return [value, isReady, loading, error];
};

export const addToCollection = async (collectionRef, doc) => {
  try {
    await collectionRef.add(doc);
  } catch (serverError) {
    console.error(serverError);
  }
};

export const updateUserCollection = async (usersRef, user) => {
  try {
    await usersRef.doc(user.uid)
      .set({
        displayName: user.displayName,
        photoURL: user.photoURL,
      }, { merge: true });
  } catch (serverError) {
    console.error(serverError);
  }
};

export const watchForStatus = () => {
  const userStatusDatabaseRef = firebase.database().ref(`/status/${auth.currentUser.uid}`);
  const userStatusFirestoreRef = firebase.firestore().doc(`/status/${auth.currentUser.uid}`);

  const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };

  const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };

  const isOfflineForFirestore = {
    state: 'offline',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const isOnlineForFirestore = {
    state: 'online',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  };

  firebase.database().ref('.info/connected').on('value', async (snapshot) => {
    if (snapshot.val() === false) {
      await userStatusFirestoreRef.set(isOfflineForFirestore);
      return;
    }

    userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(() => {
      userStatusDatabaseRef.set(isOnlineForDatabase);
      userStatusFirestoreRef.set(isOnlineForFirestore);
    });
  });
};
