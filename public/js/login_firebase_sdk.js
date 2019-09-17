
var firebaseConfig = {
    apiKey: "AIzaSyBwNopBF7icBYCqRvFacEfLNSa0Yg2E1io",
    authDomain: "framweb-79896.firebaseapp.com",
    databaseURL: "https://framweb-79896.firebaseio.com",
    projectId: "framweb-79896",
    storageBucket: "framweb-79896.appspot.com",
    messagingSenderId: "162491477012",
    appId: "1:162491477012:web:c50ba3d9fca5ed5e3e0b01"
};
firebase.initializeApp(firebaseConfig);  

// 檢查是否載入成功
let db = firebase.firestore();
let auth = firebase.auth();
//console.log(db);

//===================================
//        判斷使用者目前狀態
//===================================

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user)
    // User is signed in.
  } else {
    // No user is signed in.
    console.log(null)
  }
});



//===================================
//      "登入"與"登出"文字切換
//===================================

//當登入成功時 "登入" 文字更改成 "登出"
function ChangeUserIn(){
  let loginText = document.querySelector(".logintext");
  let logoutText = document.querySelector(".logouttext");
  loginText.classList.add("loginStatus");
  logoutText.classList.remove("loginStatus");
}

//當登出成功時 "登出" 文字更改成 "登入"
function ChangeUserOut(){
  let loginText = document.querySelector(".logintext");
  let logoutText = document.querySelector(".logouttext");
  logoutText.classList.add("loginStatus");
  loginText.classList.remove("loginStatus");
}


let UserToken

//==========================
//    建立google登入系統
//==========================

let Googleprovider = new firebase.auth.GoogleAuthProvider();
let btnGooglePopup = document.getElementById('googleSingUpPopup');

btnGooglePopup.onclick = function() {
    firebase.auth().signInWithPopup(Googleprovider).then(function(result) {
    // 可以獲得 Google 提供 token，token可透過 Google API 獲得其他數據。  
    UserToken = result.credential.accessToken;
    let user = result.user;
    checkLogin(); 
    //console.log(user)
    }); 

}

//==========================
//  建立 facebook 登入系統
//==========================

let faceprovider = new firebase.auth.FacebookAuthProvider();
let btnFacePopup = document.getElementById('faceSingUpPopup');

btnFacePopup.onclick = function(){
firebase.auth().signInWithPopup(faceprovider).then(function(result) {
  let UserToken = result.credential.accessToken;
  let user = result.user;
  checkLogin(); 
  //console.log(user)

});

}


//==========================
//          會員登出
//==========================
let signOutbtn=document.querySelector(".logoutbtn-user");
signOutbtn.onclick = function(){
  firebase.auth().signOut().then(function() {
    checkLogin();
    // Sign-out successful.
    let token = result.credential.accessToken;
    // ChangeUserOut();
    // console.log(token)
  }).catch(function(error) {
    // An error happened.
    //alert("登出失敗")
  });
}

//==========================
//  判斷會員是否登入還是登出
//==========================
function checkLogin(){
  let user = firebase.auth().currentUser;
  if (user) {
  //console.log(UserToken) 
  ChangeUserIn();
  loginSuccess();
  } else {
  // No user is signed in.
  ChangeUserOut();
  logoutSuccess();
  };

}



//顯示與關閉 登入對話框
let loginBox
window.onload = function(){
       loginBox = document.querySelector(".login-box"); 
} 
let loginBtn = document.querySelector('.loginbtn-user');    
    loginBtn.addEventListener('click',function(){ 
        loginBox.style.display="block";
    });

let loginBoxBtn = document.querySelector(".login-box-btn");
    loginBoxBtn.addEventListener("click",function(){
      loginBox.style.display="none";
    });
 
//當會員登入成功 開啟登入成功視窗
let loginBoxSuccess = document.querySelector(".login-box-success");
    function loginSuccess(){
    loginBox.style.display="none";
    loginBoxSuccess.style.display="block";
    };
//關閉登入成功按鈕
let loginBoxSuccessBtn = document.querySelector(".login-box-success-btn");
    loginBoxSuccessBtn.addEventListener("click",function(){
    loginBoxSuccess.style.display="none"; 
      
    }); 

//當會員登出成功 開啟登出成功視窗
let logoutBoxSuccess = document.querySelector(".logout-box-success");
    function logoutSuccess(){
    loginBox.style.display="none";
    logoutBoxSuccess.style.display="block";
    };
//關閉登出成功按鈕
let logoutBoxSuccessBtn = document.querySelector(".logout-box-success-btn");
    logoutBoxSuccessBtn.addEventListener("click",function(){
    logoutBoxSuccess.style.display="none";  
    });


    

//判斷會員是否登入
// let user = firebase.auth().currentUser;
// if (user) {
//   console.log(UserToken) 
//   ChangeUserIn()
// } else {
//   console.log(UserToken) 
//   // No user is signed in.
// }
