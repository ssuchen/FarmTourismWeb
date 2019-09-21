//console.log("wish")

//=======================================
//  判斷是否登入會員 取得相關的會員資料
//=======================================
let userName
let userEmail="html4well@gmail.com"
let userPhoto
let user

// firebase.auth().onAuthStateChanged(function(user){
// if(user == null){
//     user = firebase.auth.currentUser;
//    // Using a popup.
//     let provider = new firebase.auth.GoogleAuthProvider();
//     provider.addScope('profile');
//     provider.addScope('email');
//     firebase.auth().signInWithPopup(provider).then(function(result) {
//     // This gives you a Google Access Token.
//     let token = result.credential.accessToken;
//     // The signed-in user info.
//     let user = result.user;
//     console.log(user)
//     userName = user.displayName; 
//     console.log(userName)
//     userEmail = user.email;
//     console.log(userEmail)
//     userPhoto = user.photoURL;  
//     console.log(userPhoto) 

//     });
           
// }

// })

//=======================================

//=======================================
//  切換  按鈕 樣式(css出現底線)
//=======================================

let wishBtn = document.querySelectorAll(".wish-btn");
for(let i=0 ;i<wishBtn.length;i++){
    wishBtn[i].addEventListener("click",function(){
        let removeBtn = document.querySelector(".wishBtn-click");
        removeBtn.classList.remove('wishBtn-click')
        wishBtn[i].classList.add("wishBtn-click");
    })
}

//=======================================
//  切換 wishTravel 按鈕 切換相對應的內容
//=======================================

//  抓出使用者e-mail
let wishTravel=document.querySelector("#wishTravel");
wishTravel.addEventListener("click",wishTravelText);
function wishTravelText(){
let Travellist=[]   
console.log(userEmail)
db.collection("user").get().then(function(snapshop){
    //console.log(snapshop.docs)
    snapshop.docs.forEach(function(doc) {
        //將符合email的資料放入陣列
        if(userEmail == doc.data().email){
        console.log(doc.data().travellist)  
        Travellist = doc.data().travellist
        }    
    });
    console.log(Travellist)
    let str=""
    Travellist.forEach(function(item){
        let name = item.title
        let photo = item.img
        let town = item.text
        let city = item.country
        let id = item.id
        str += '<a  href= " travelPagination.html?id=' + id +'"class="wish-card"><div class="wish-img"><img src=' + photo 
            + '><i class="far fa-heart like-btn" data-tag="travel" id = '+ id
            + '></i></div><div class="wish-title">' + name 
            +'</div><div class="wish-place"><div class="wish-country">'
            + city +'</div> <div class="wish-text">' + town + '</div></div></a>';
        
    })
    let travelMainContent = document.querySelector('.wish-main-content');
        travelMainContent.innerHTML = str;


    })


}

//=======================================
//  切換 wishPresent 按鈕 切換相對應的內容
//=======================================

let wishPresent=document.querySelector("#wishPresent");
wishPresent.addEventListener("click",wishPresentText);
function wishPresentText(){
   // console.log("text2")
}

//=======================================
//  切換 wishJourney 按鈕 切換相對應的內容
//=======================================

let wishJourney=document.querySelector("#wishJourney");
wishJourney.addEventListener("click",wishJourneyText);
function wishJourneyText(){
   // console.log("text3")
}

//=======================================
//  切換 wishJourney 按鈕 切換相對應的內容
//=======================================

let wishFood =document.querySelector("#wishFood");
wishFood.addEventListener("click",wishFoodText);
function wishFoodText(){
    //console.log("text4")
}
