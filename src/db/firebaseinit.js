import firebase from 'firebase'
import config from './firebaseConfig'
import 'firebase/firestore'

  const firebaseApp = firebase.initializeApp(config);
 
  //const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firebase.firestore().settings(settings);

export default firebaseApp.firestore()


