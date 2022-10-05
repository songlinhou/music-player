let firebaseApp = null;
let provider = null;
let firebaseUser = null;
let isFirebaseInit = false;

function initFirebase(){
    if(isFirebaseInit){
        return;
    }
    const firebaseConfig = {
        apiKey: "AIzaSyCZmI21jpt4QNDuP70PhLzum4fgF8yKxcM",
        authDomain: "music-player-premium.firebaseapp.com",
        projectId: "music-player-premium",
        storageBucket: "music-player-premium.appspot.com",
        messagingSenderId: "717948093311",
        appId: "1:717948093311:web:516d5deccfed469c2b104a"
    };
    try {
        firebaseApp = firebase.initializeApp(firebaseConfig);
        provider = new firebase.auth.GoogleAuthProvider();
        checkAuthState();
        isFirebaseInit = true;
    } catch (error) {
        console.log("cannot init firebase due to error", error);
        isFirebaseInit = false;
    }
    
}


function startLoginWithGoogle(onLoginSucceed, onLogoutSucced){    
      // Initialize Firebase

    const app = firebase.initializeApp(firebaseConfig);
    $("#login").on("click",()=>{
        googleLogin();
    });

    $("#logout").on("click",()=>{
        googleLogout();
    });

    checkAuthState();
    

    function googleLogin(){
        console.log("login");
        firebase.auth().signInWithPopup(provider)
        .then(res=>{
            console.log(res);
        //   showUserDashboard(res.user);
            firebaseUser = res.user;
            onLoginSucceed(res.user);
        })
        .catch(e=>{
            console.log("Error=", e);
        //   $("#error").html("" + e);
        });
    }

    function googleLogout(){

        console.log("logout");
        firebase.auth().signOut().then(()=>{
        console.log("logout succeed");
        onLogoutSucced();
        //   showLogin();
        })
        .catch(e=>{
            console.log("Error=", e);
        //   $("#error").html("" + e);
        });
    }

    function showUserDashboard(user){
        let userID = user.displayName;
        let email = user.email;
        let photoURL = user.photoURL;
        $("#loginScreen").hide();
        $("#dashboard").show();
        $("#userID").html(userID);
        $("#email").html(email);
        $("#photo").attr("src", photoURL);
    }

    function showLogin(){
        $("#loginScreen").show();
        $("#dashboard").hide();
    }

      
}

function checkAuthState(){
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
            console.log("already logged in");
            firebaseUser = user;
            showUserDashboard(user);
            syncLocalAndRemoteLikedSongs(); // sync
        }
        else{
            console.log("not logged in");
            loginUIStatus();
        }
    })
}

function setupLoginTriggers(){
    $("#user-login-google").on("click",()=>{
        if(firebaseUser){
            // log out current user
            console.log("logout");
            firebase.auth().signOut().then(()=>{
                console.log("logout succeed");
                loginUIStatus();

            })
            .catch(e=>{
                console.log("Error=", e);
                $("#sync-playlist-btn").addClass("d-none");
            });
        }
        else{
            // log in
            console.log("login");
            firebase.auth().signInWithPopup(provider)
            .then(res=>{
                console.log(res);
                firebaseUser = res.user;
                showUserDashboard(firebaseUser);
            })
            .then(()=>{
                syncLocalAndRemoteLikedSongs(); // sync
            })
            .catch(e=>{
                console.log("Error=", e);
                loginUIStatus();
                
            });
        }
    });
}

function loginUIStatus(){
    let img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_A1KWEAF8xoaZLlOT1PbmJv2H-46t7witrnmDyA&s";
    $("#user-login-google").html("Login with Google");
    $("#user-name-settings").html("Guest");
    $("#user-email-settings").html("");
    $("#user-photo-settings").attr("src", img);
    $("#user-login-google").html("Login with Google");
    $("#sync-playlist-btn").addClass("d-none");
}


function showUserDashboard(user){
    let userID = user.displayName;
    let email = user.email;
    let photoURL = user.photoURL;
    $("#user-name-settings").html(userID);
    $("#user-email-settings").html(email);
    $("#user-photo-settings").attr("src", photoURL);
    $("#user-login-google").html("Login out");
    $("#sync-playlist-btn").removeClass("d-none");
}

function setupAuth(){
    initFirebase();
    setupLoginTriggers();
}