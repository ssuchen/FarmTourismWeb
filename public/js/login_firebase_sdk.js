
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

//=======================================
//  判斷是否登入會員 取得相關的會員資料
//=======================================
let userName
let userEmail
//let userEmail="html4well@gmail.com"
let userPhoto
let user
let UserToken
let provider

firebase.auth().onAuthStateChanged(function(user){
if(user != null){
  ChangeUserIn()
  //loginSuccess()
    //user = firebase.auth.currentUser;
    //console.log(user)
    userName = user.displayName; 
   // console.log(userName)
}
else{
  console.log("no")
  
}

})

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     console.log(user)
//     // User is signed in.
//   } else {
//     // No user is signed in.
//     console.log("no")
//   }
// });


//==========================
//    建立google登入系統
//==========================


let btnGooglePopup = document.getElementById('googleSingUpPopup');

btnGooglePopup.onclick = function() {
    provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
    // 可以獲得 Google 提供 token，token可透過 Google API 獲得其他數據。  
    UserToken = result.credential.accessToken;
    let user = result.user;
    //checkLogin(); 
    console.log(user)
    console.log("google登入")
    location.reload()
    }); 

}

//==========================
//  建立 facebook 登入系統
//==========================


let btnFacePopup = document.getElementById('faceSingUpPopup');

btnFacePopup.onclick = function(){
provider = new firebase.auth.FacebookAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
  let UserToken = result.credential.accessToken;
  let user = result.user;
  //checkLogin(); 
  console.log(user)
  console.log("fb登入")
  location.reload()

});

}


//==========================
//          會員登出
//==========================
let signOutbtn=document.querySelector(".logoutbtn-user");
signOutbtn.onclick = function(){
  firebase.auth().signOut().then(function() {
    //checkLogin();
    console.log("已登出")
    location.reload()
    //logoutSuccess();
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

// function checkLogin(){
 
//   firebase.auth().onAuthStateChanged(function(user){
//     if(user==null){
//       ChangeUserOut();
//       logoutSuccess();
//     }else{
//       ChangeUserIn();
//       loginSuccess();
//     }
//   })
  
//   }







//============================
//    顯示與關閉 登入對話框
//============================

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




//===================================
//      "登入"與"登出"文字切換
//===================================

//當登入成功時 "登入" 文字更改成 "登出"
function ChangeUserIn(){
  let logintext = document.querySelector(".loginbtn-user");
  logintext.style.display="none"
  let logouttext = document.querySelector(".logoutbtn-user");
  logouttext.style.display="block"
}

//===================================
//===================================
  

//判斷會員是否登入
// user = firebase.auth().currentUser;
// if (user) {
//   console.log(UserToken) 
//   ChangeUserIn()
// } else {
//   console.log(UserToken) 
//   ChangeUserOut()
//   // No user is signed in.
// }
