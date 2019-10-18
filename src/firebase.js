import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyAPjcXahVtkDLo3hUY2MV2yrI_7-91Pm2g",
    authDomain: "appsolides.firebaseapp.com",
    databaseURL: "https://appsolides.firebaseio.com",
    projectId: "appsolides",
    storageBucket: "appsolides.appspot.com",
    messagingSenderId: "455550629639",
    appId: "1:455550629639:web:1a63465c956c653600f7a2",
    measurementId: "G-WRDNGRWD41"
  };

class Firebase {
    constructor(){
        app.initializeApp(firebaseConfig);
        this.bd = app.database();
        this.auth = app.auth();

    }



  /** entrando no painel */
  login(email, password) {
    return app.auth().signInWithEmailAndPassword(email, password);
  }

  /** registando novo usuário */
  registerUser(email, password){
    return app.auth().createUserWithEmailAndPassword(email, password);
  }

  /** dados  usuário logado */
  async checkUser () {
    return await new Promise(resolve=> {
      app.auth().onAuthStateChanged(user=> {
        if(user) resolve(user);
      });
    });
  }

  isInitialized(){
    // retona um usuário logado
    return new Promise((resolve)=>{
        app.auth().onAuthStateChanged(resolve);
    });
  }

  /**Logout */
  logout(){
     return app.auth().signOut();
  }

    /** quantidade de item cadastrado */
    async  numRegister(userId) {
      return await new Promise(resolve => {
        app.database().ref('register').child(userId).on('value', snapshot => {
          resolve(snapshot.numChildren())
        });
      });
    }

}

export default new Firebase();