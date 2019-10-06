
//============================  
//    顯示與關閉 登入對話框
//============================

// 打開登入視窗
let loginBox = document.querySelector(".login-box"); 
let loginBtn = document.querySelector('.loginbtn-user'); 
let cover = document.querySelector(".cover");
let body = document.querySelector(".body");

loginBtn.addEventListener('click',function(){ 
    loginBox.classList.add('box-open');
    cover.style.display="block";
    body.classList.add("fixed");
});


//最後一頁視窗

//let lestPageBox = document.querySelector(".lest-page-box");



// 關閉彈跳視窗
let boxClose = document.querySelectorAll(".alert-box"); 
let boxBtn = document.querySelectorAll(".box-btn");
for(let i =0 ; i<boxBtn.length ; i++){
    boxBtn[i].addEventListener("click",function(){
        boxClose[i].classList.remove("box-open");
        cover.style.display="none";
        body.classList.remove("fixed");
    });
}
    

