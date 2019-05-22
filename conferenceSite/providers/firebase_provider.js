
// This works as a backend for making the FireBase work.

/* This is being created in a separate file because we know this is not going
to be messed with. */

// This also helps getting the database information from the FireBase account
// var FIREBASE_PROVIDER = function () {

var FIREBASE_PROVIDER = (function () {

  var speakerID = '';

   var config = {
    apiKey: "AIzaSyBD9ECnp899Z1kb5Xjd6Gr7pL6ysE_YXas",
    authDomain: "conference-website-f32e7.firebaseapp.com",
    databaseURL: "https://conference-website-f32e7.firebaseio.com",
    projectId: "conference-website-f32e7",
    storageBucket: "conference-website-f32e7.appspot.com",
    messagingSenderId: "224621079700"
  };
  firebase.initializeApp(config);
    
  firebase.auth().onAuthStateChanged(function(firebaseUser) {
      if(firebaseUser) {
          console.log(firebaseUser.uid);
          speakerID = firebaseUser.uid;
      }
      else {
      }
  })       

  var _databaseReference = firebase.database();
  var _speakersReference = _databaseReference.ref("Speakers");

  /* ======================================================== */
  // CREATING A NEW USER
  /* ======================================================== */
  var _createNewUser = function(newUserObj) {
    
    var newInfo = {
      name: newUserObj.name,
      email: newUserObj.email,
      twitter: newUserObj.twitter,
      instagram: newUserObj.instagram,
      facebook: newUserObj.facebook
    };

    firebase.auth().createUserWithEmailAndPassword(newUserObj.email, newUserObj.password).then(function (value) {

      user = firebase.auth().currentUser;
      speakerID = user.uid;
      _databaseReference.ref(`/Speakers/${user.uid}`)
        .set(newInfo);
        

    }).catch(function (error) {
      var errorCode = error.code;
      console.log('errorCode', errorCode);
      var errorMessage = error.message;
      console.log('errorMessage', errorMessage);
    });

  };
    
  /* ======================================================== */
  // UPDATING A USER
  /* ======================================================== */
  var _updateUser = function(updateUserObj) {
    
  console.log(speakerID);
      
  firebase.database().ref("Speakers").child(speakerID).update({
        name: updateUserObj.name,
        twitter: updateUserObj.twitter,
        instagram: updateUserObj.instagram,
        facebook: updateUserObj.facebook
    });
      
  };

  /* ======================================================== */
  // LOGGING IN WITH A USER
  /* ======================================================== */
  var _login = function (loginObj) {

    firebase.auth().signInWithEmailAndPassword(loginObj.email, loginObj.password).then(function (value) {

      console.log(value);
      speakerID = value.uid;

    }).catch(function (error) {
      var errorCode = error.code;
      console.log('errorCode', errorCode);
      var errorMessage = error.message;
      console.log('errorMessage', errorMessage);
    });
  };

  /* ======================================================== */
  // LOGGING OUT THE USER
  /* ======================================================== */
  var _logout = function () {
    firebase.auth().signOut();
  };
    
  /* ======================================================== */
  // DELETING THE USER
  /* ======================================================== */
  var _delete = function(e) {
    
      var user = firebase.auth().currentUser;

        user.delete().then(function() {
          _speakersReference.child(speakerID).remove();
            speakerID = "";
        }).catch(function(error) {
            console.log("error is " + error);
        });

  };

  /* ======================================================== */
  // GETTING ALL THE DATA AT ONCE
  /* ======================================================== */
  var _getAllDataOnce = function () {
    return firebase.database().ref('/Speakers/').once('value').then(function (snapshot) {
      console.log(snapshot.val());
    });
  };

  return {
    createNewUser: _createNewUser,
    updateUser: _updateUser,
    login: _login,
    logout: _logout,
    delete: _delete,
    getAllDataOnce: _getAllDataOnce
  }

})();
