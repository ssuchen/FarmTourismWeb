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

    var uiConfig = {  
    signInSuccessUrl: 'index.html', 
    signInOptions: [  
     // Specify providers you want to offer your users.  
     firebase.auth.GoogleAuthProvider.PROVIDER_ID
     //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
     //firebase.auth.EmailAuthProvider.PROVIDER_ID  
    ],  
    // Terms of service url can be specified and will show up in the widget.  
    tosUrl: '<your-tos-url>'  
    };  
    
    // Initialize the FirebaseUI Widget using Firebase.  
    var ui = new firebaseui.auth.AuthUI(firebase.auth());  
    // The start method will wait until the DOM is loaded.  
    ui.start('#firebaseui-auth-container', uiConfig);  

    console.log(uiConfig)
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


    