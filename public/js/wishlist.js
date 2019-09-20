//console.log("wish")


//切換按鈕樣式
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

let wishTravel=document.querySelector("#wishTravel");
wishTravel.addEventListener("click",wishTravelText);
function wishTravelText(){
   // console.log("text")

   
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
