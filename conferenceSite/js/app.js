
//JQuery Code for scrolling up and down
$(".menu-toggle").on('click', function () {
    $(".navigation").toggleClass("active");
});

$("nav a").click(function(e) {
    var btnID = e.currentTarget.id + "Section";
    $("html, body").animate({
        scrollTop: $("#" + btnID).offset().top
    }, 900);

});

$("a").click(function(e) {
    var btnID = e.currentTarget.id + "Section";
    $("html, body").animate({
        scrollTop: $("#" + btnID).offset().top
    }, 900);

});

/* ======================================================== */
// ADDING A REALTIME LISTENER
/* ======================================================== */
firebase.auth().onAuthStateChanged(function(firebaseUser) {
      if(firebaseUser) {  
          console.log(firebaseUser);
          $(".loginContent").css("display", "none");
          $(".signUpContent").css("display", "none");
          $(".updateContent").css("display", "block");
      }
      else {
          console.log("no user is signed in");
          $(".loginContent").css("display", "block");
          $(".signUpContent").css("display", "block");
          $(".updateContent").css("display", "none");
      }
  })   

function speaker() {

  FIREBASE_PROVIDER.getAllDataOnce();     

  /* ======================================================== */
  // CREATING A NEW USER
  /* ======================================================== */
  $(".speaker-signUp .submit").click(function(e) {

    e.preventDefault();
    alert("User created!")

    var name = $(".speaker-signUp .name").val(),
        email = $(".speaker-signUp .email").val(),
        password = $(".speaker-signUp .password").val(),
        twitter = $(".socialEntry .twitter").val(),
        instagram = $(".socialEntry .instagram").val(),
        facebook = $(".socialEntry .facebook").val();

    var newUserObj = {
      "name": name,
      "email": email,
      "password": password,
      "twitter": twitter,
      "instagram": instagram,
      "facebook": facebook
    };

    FIREBASE_PROVIDER.createNewUser(newUserObj);

  });
    
  /* ======================================================== */
  // UPDATING A USER
  /* ======================================================== */
  $(".update").click(function(e) {
     
    e.preventDefault();
      
    alert("User info updated!")  
      
    var updateName = $(".updateInformation .name").val(),
        updateTwitter = $(".updateSocialEntry .twitter").val(),
        updateInstagram = $(".updateSocialEntry .instagram").val(),
        updateFacebook = $(".updateSocialEntry .facebook").val();
    
    var updateUserObj = {
        "name": updateName,
        "twitter": updateTwitter,
        "instagram": updateInstagram,
        "facebook": updateFacebook
    };
      
    FIREBASE_PROVIDER.updateUser(updateUserObj);
      
  }); 

  /* ======================================================== */
  // LOGGING IN WITH A USER
  /* ======================================================== */
  $(".login-form .log-in").click(function(e) {

    e.preventDefault();

    var email = $(".login-form .email").val(),
        password = $(".login-form .password").val();

    var loginObj = {
      "email": email,
      "password": password
    };

    FIREBASE_PROVIDER.login(loginObj);

  });

  /* ======================================================== */
  // LOGGING OUT THE USER
  /* ======================================================== */
  $(".log-out").click(function() {
    FIREBASE_PROVIDER.logout();
  });
    
  /* ======================================================== */
  // DELETING THE USER
  /* ======================================================== */
  $(".delete").click(function(e){
      e.preventDefault();
      //window.alert("Your account has now been deleted!");
      FIREBASE_PROVIDER.delete();
  })

}

$(document).ready(function() {
  speaker();
})
