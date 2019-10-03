
let firebaseConfig = {
    apiKey: "AIzaSyBwNopBF7icBYCqRvFacEfLNSa0Yg2E1io",
    authDomain: "framweb-79896.firebaseapp.com",
    databaseURL: "https://framweb-79896.firebaseio.com",
    projectId: "framweb-79896",
    storageBucket: "framweb-79896.appspot.com",
    messagingSenderId: "162491477012",
    appId: "1:162491477012:web:c50ba3d9fca5ed5e3e0b01"
};
firebase.initializeApp(firebaseConfig);  

let db = firebase.firestore();
let auth = firebase.auth();

//=======================================
//  判斷是否登入會員 取得相關的會員資料
//=======================================
let userName
let userEmail
let userPhoto
let user
let UserToken
let provider

firebase.auth().onAuthStateChanged(function(user){
//願望清單事件監聽
renderWishlistCheck();
if(user != null){
  ChangeUserIn();
  userName = user.displayName; 
}
else{
  console.log("no")
  
}

});

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
    console.log(user)
    //console.log("google登入")
    location.reload();
    }); 

}

//==========================
//  建立 facebook 登入系統
//==========================
let btnFacePopup = document.getElementById('faceSingUpPopup');
btnFacePopup.onclick = function(){
provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
    let user = result.user;
    console.log(user)
    //console.log("fb登入")
    location.reload()

    });

};

//==========================
//          會員登出
//==========================
let signOutbtn=document.querySelector(".logoutbtn-user");
signOutbtn.onclick = function(){
    firebase.auth().signOut().then(function() {
    console.log("已登出")
    location.reload();
    });
};

//============================
//    顯示與關閉 登入對話框
//============================

let loginBox = document.querySelector(".login-box"); 
let loginBtn = document.querySelector('.loginbtn-user'); 

    loginBtn.addEventListener('click',function(){ 
    loginBox.style.display="block";
    });

let loginBoxBtn = document.querySelector(".login-box-btn");
    loginBoxBtn.addEventListener("click",function(){
    loginBox.style.display="none";
    });
 

//===================================
//      "登入"與"登出"文字切換
//===================================

//當登入成功時 "登入" 文字更改成 "登出"
function ChangeUserIn(){
    let logintext = document.querySelector(".loginbtn-user");
        logintext.style.display="none";
    let logouttext = document.querySelector(".logoutbtn-user");
        logouttext.style.display="block";
};

//===================================
// 判斷使用這有沒有登入 再決定是否
// 開啟願望清單頁面
//===================================
  
function renderWishlistCheck (){
let userwish = document.querySelector(".user-wish")
    userwish.addEventListener("click",function(){
    console.log("test")
    console.log(userName)
  
    if(userName!=undefined){
    document.location.href="wishList.html";
    }else{
    alert("請先登入會員");
    }
    })

};
