
//=======================================
//  判斷是否登入會員 取得相關的會員資料
//=======================================

travelpageMessageBtn = document.querySelector(".travelpage-message-btn");
// 有登入時 留言按鈕出現
 userName
 userEmail
 userPhoto
 user
console.log(user)
 firebase.auth().onAuthStateChanged(function(user){

    let navname = document.querySelector(".user-name");
    let navphoto = document.querySelector(".user-photo");

    if(user != null){
        //user = firebase.auth.currentUser;
        console.log(user)
        userName = user.displayName; 
        console.log(userName)
        userEmail = user.email
        console.log(userEmail)
        userPhoto = user.photoURL;   
        console.log(userPhoto)

        
        //將大頭照放入 navbar
        let navimg = document.createElement("img");
        navimg.setAttribute("src",userPhoto);
        navphoto.appendChild(navimg)
 
        //將名子放入 navbar
        let navnameDiv = document.createElement("div");
        navnameDiv.textContent = userName +"  你好!";
        console.log(userName)
        navname.appendChild(navnameDiv);
        //navnameDiv.setAttribute("class","navname-Div");  
        navphoto.style.display="block"
        navname.style.display="block"

        
    }
    else{
      console.log("no")
      document.location.href="index.html";
    
    }
   
})


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

wishTravelText();
//=======================================
//  切換 wishTravel 按鈕 切換相對應的內容
//=======================================

//  抓出使用者e-mail
let wishTravel=document.querySelector("#wishTravel");
wishTravel.addEventListener("click",wishTravelText);
function wishTravelText(){
let Travellist=[]   

db.collection("user").get().then(function(snapshop){
    
    let docID
    //獲得 doc 的 id
    snapshop.docs.forEach(function(doc) {
        if(userEmail == doc.data().email){
        docID = doc.id
        //console.log(doc.id)
        } 
    });
    //將符合email的資料放入陣列
    let list = db.collection("user").doc(docID).collection("travellist")
    list.get().then(function(snapshop){
       // console.log(snapshop)
        snapshop.forEach(function(doc,index){
            console.log()
        Travellist.push(doc.data())
        })
        let str=""
        if(Travellist.length > 12){
        alert("收藏頁放不下太多願望")
        Travellist.length = 12
        }
        Travellist.forEach(function(item){
            let name = item.title
            let photo = item.img
            let town = item.text
            let city = item.country
            let id = item.id
            str += '<a  href= " travelPagination.html?id=' + id +'"class="travel-card"><div class="travel-img"><img src=' + photo 
                + '><i class="far fa-heart like-btn fas" data-tag="travel " id = '+ id
                + '></i></div><div class="travel-title">' + name 
                +'</div><div class="travel-place"><div class="travel-country">'
                + city +'</div> <div class="travel-text">' + town + '</div></div></a>';
                       
        })
        let travelMainContent = document.querySelector('.wish-main-content');
        travelMainContent.innerHTML = str;

        //點擊愛心按鈕 刪除卡片
        let btn = document.querySelectorAll(".like-btn")   
        for(let b = 0 ;b<btn.length ; b++){
        btn[b].addEventListener("click",function(e){
            e.preventDefault();
            //console.log(btn[b].id)
            list.where("id","==",btn[b].id).onSnapshot(function(snapshop){
                snapshop.docs.forEach(function(doc){
                    //console.log(doc.data())
                    //console.log(doc.id)
                    list.doc(doc.id).delete()
                })
            })
            wishTravelText();
        }) 
        }   


    })
    
    })
 

}


//=======================================
//  切換 wishPresent 按鈕 切換相對應的內容
//=======================================

let wishPresent=document.querySelector("#wishPresent");
wishPresent.addEventListener("click",wishPresentText);
function wishPresentText(){
let Presentlist=[]
db.collection("user").get().then(function(snapshop){
    
    let docID
    //獲得 doc 的 id
    snapshop.docs.forEach(function(doc) {
        if(userEmail == doc.data().email){
        docID = doc.id
        } 
    });
    //將符合email的資料放入陣列
    let list = db.collection("user").doc(docID).collection("presentlist")    
    list.get().then(function(snapshop){

        snapshop.forEach(function(doc){
        Presentlist.push(doc.data())
        })
        let str=""
        //console.log(Presentlist.length)
        if(Presentlist.length > 12){
        alert("收藏頁放不下太多願望")
        Presentlist.length = 12;
        }
        //console.log(Presentlist)
        Presentlist.forEach(function(item){
            //console.log(Presentlist)
            let name = item.title
            let photo = item.img
            let text = item.text
            let city = item.country
            let id = item.id
            str += '<a href="presentPagination.html?id='+ id
            +'" class="present-card"><div class="present-img"><img src="' + photo
            +'"><i class="far fa-heart like-btn fas" aria-hidden="true" id = '+ id 
            +'></i></div><div class="present-title">'+ name
            +'</div><div class="present-place"><div class="presentCountry">'+ city
            +' | </div><div class="present-text">'+ text
            +'</div></div></a>'

        })
        let PresentMainContent = document.querySelector('.wish-main-content');
        PresentMainContent.innerHTML = str;
        

        //點擊愛心按鈕 刪除卡片
        let btn = document.querySelectorAll(".like-btn")  
        //console.log(btn) 
        for(let b = 0 ;b<btn.length ; b++){
                btn[b].addEventListener("click",function(e){
                    e.preventDefault();
                    //console.log(btn[b].id)
                    list.where("id","==",btn[b].id).onSnapshot(function(snapshop){
                        snapshop.docs.forEach(function(doc){
                            // console.log(doc.data())
                            // console.log(doc.id)
                            list.doc(doc.id).delete();
                        })
                    })
                    wishPresentText();
                }) 
        };  


        

    })



    })

 

}


//=======================================
//  切換 wishJourney 按鈕 切換相對應的內容
//=======================================

let wishJourney=document.querySelector("#wishJourney");
wishJourney.addEventListener("click",wishJourneyText);
function wishJourneyText(){

let Journeylist=[]
db.collection("user").get().then(function(snapshop){
    
    let docID
    //獲得 doc 的 id
    snapshop.docs.forEach(function(doc) {
        if(userEmail == doc.data().email){
        docID = doc.id
        } 
    });
    //將符合email的資料放入陣列
    let list = db.collection("user").doc(docID).collection("journeylist")    
    list.get().then(function(snapshop){

        snapshop.forEach(function(doc){
        Journeylist.push(doc.data())
        })
        let journeyMainContent = document.querySelector('.wish-main-content');
            journeyMainContent.innerHTML=""
        
        if(Journeylist.length > 12){
            alert("收藏頁放不下太多願望")
            Journeylist.length = 12;
        }    

        Journeylist.forEach(function(item){
            let city = item.country
            let id = item.id
            let photo = item.img
            let tag = item.tag
            let text = item.text
            let name = item.title

            let journeyTag 
            let journeyCard = document.createElement("a");
                journeyCard.setAttribute("class","journey-card")
                journeyCard.setAttribute("href","journeyPagination.html?id="+id)
            let journeyImg = document.createElement("div");
                journeyImg.setAttribute("class","journey-img");
            let img = document.createElement("img");
                img.setAttribute("src",photo);
            let journeyBtn = document.createElement("i");
                journeyBtn.setAttribute("class","far fa-heart like-btn fas");
                journeyBtn.setAttribute("id",id);

            let journeyTitle = document.createElement("div");
                journeyTitle.setAttribute("class","journey-title");
                journeyTitle.textContent = name;

            let journeyGroup = document.createElement("div");
                journeyGroup.setAttribute("class","journey-group");
                 

            let journeyText = document.createElement("div");
                journeyText.setAttribute("class","journey-text");
                journeyText.textContent = text ;
                
                journeyMainContent.appendChild(journeyCard);
                journeyCard.appendChild(journeyImg);
                journeyCard.appendChild(journeyTitle);
                journeyCard.appendChild(journeyGroup);

                journeyCard.appendChild(journeyText);            
                journeyImg.appendChild(img);
                journeyImg.appendChild(journeyBtn);

                for(let i=0 ;i<tag.length;i++){
                   // console.log(tag[i])
                    journeyTag = document.createElement("div");
                    journeyTag.setAttribute("class","journey-tag");
                    journeyTag.textContent= tag[i];
                    journeyGroup.appendChild(journeyTag);
                }
            

        })

        //點擊愛心按鈕 刪除卡片
        let btn = document.querySelectorAll(".like-btn")  
        //console.log(btn) 
        for(let b = 0 ;b<btn.length ; b++){
            btn[b].addEventListener("click",function(e){
            e.preventDefault();
            //console.log(btn[b].id)
            list.where("id","==",btn[b].id).onSnapshot(function(snapshop){
            snapshop.docs.forEach(function(doc){
            // console.log(doc.data())
            // console.log(doc.id)
            list.doc(doc.id).delete();
            })
            })
            wishJourneyText();
            }) 
        };  

    })
    
})
}

//=======================================
//  切換 wishFood 按鈕 切換相對應的內容
//=======================================

let wishFood =document.querySelector("#wishFood");
wishFood.addEventListener("click",wishFoodText);
function wishFoodText(){
   
let Foodlist=[]
db.collection("user").get().then(function(snapshop){
        
        let docID
        //獲得 doc 的 id
        snapshop.docs.forEach(function(doc) {
            if(userEmail == doc.data().email){
            docID = doc.id
            } 
        });
        //將符合email的資料放入陣列
        let list = db.collection("user").doc(docID).collection("foodlist")    
        list.get().then(function(snapshop){
    
            snapshop.forEach(function(doc){
            Foodlist.push(doc.data())
            })
            let str=""
            if(Foodlist.length > 12){
                alert("收藏頁放不下太多願望")
                Foodlist.length = 12;
            }   
            Foodlist.forEach(function(item){
               // console.log(Foodlist)
                let name = item.title
                let tel = item.tel
                let photo = item.img
                let town = item.town
                let text = item.text                
                let city = item.country
                let id = item.id
                str += '<a href="foodPagination.html?id='+ id
                +'" class="food-card"><div class="food-card-left"><div class="food-img"><img src="'+ photo
                +'"><i class="far fa-heart like-btn food-likebtn fas"aria-hidden="true" id="'+ id 
                +'"></i></div></div><food-card-right class="food-card-right"><div class="food-title">'+name
                +'</div><div class="food-tel">'+ tel
                +'</div><div class="food-place"><div class="food-country">'+ city
                +'</div><div class="food-town">'+ town
                +'</div></div><div class="food-text">'+ text
                +'</div></food-card-right></a>'
            })
            let foodMainContent = document.querySelector('.wish-main-content');
            foodMainContent.innerHTML = str;
            

                    //點擊愛心按鈕 刪除卡片
            let btn = document.querySelectorAll(".like-btn")  
            //console.log(btn) 
            for(let b = 0 ;b<btn.length ; b++){
            btn[b].addEventListener("click",function(e){
            e.preventDefault();
            //console.log(btn[b].id)
            list.where("id","==",btn[b].id).onSnapshot(function(snapshop){
            snapshop.docs.forEach(function(doc){
            // console.log(doc.data())
            // console.log(doc.id)
            list.doc(doc.id).delete();
            })
            })
            wishFoodText();
            }) 
            };  

            
    
        })
        
})

}

