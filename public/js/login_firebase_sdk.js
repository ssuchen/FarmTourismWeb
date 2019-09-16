
console.log("test")
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
//console.log(db);

var provider = new firebase.auth.GoogleAuthProvider();
var btnGooglePopup = document.getElementById('googleSingUpPopup');

btnGooglePopup.onclick = function() {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // 可以獲得 Google 提供 token，token可透過 Google API 獲得其他數據。  
    var token = result.credential.accessToken;
    var user = result.user;

  });  
}


//顯示與關閉 登入對話框
let loginBox
window.onload = function(){
       loginBox = document.querySelector(".login-box"); 
} 
let loginBtn = document.querySelector('.loginbtn-user');    
    loginBtn.addEventListener('click',function(){ 
        loginBox.style.display="block";
    })
    loginBoxBtn = document.querySelector(".login-box-btn");
    loginBoxBtn.addEventListener("click",function(){
    loginBox.style.display="none";
        
    })
