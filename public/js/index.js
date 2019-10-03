//============================
//  留言按鈕 判斷是否有登入會員 
//============================
// 有登入時 留言按鈕出現
userName
userEmail
userPhoto
user
travelpageMessageBtn = document.querySelector(".travelpage-message-btn");

firebase.auth().onAuthStateChanged(function(user){

    let navname = document.querySelector(".user-name");
    let navphoto = document.querySelector(".user-photo");

    if(user != null){
        console.log(user)
        userName = user.displayName; 
        console.log(userName)
        userEmail = user.email
        console.log(userEmail)
        userPhoto = user.photoURL;   
        console.log(userPhoto)

        //設定一個user欄位 給他
        db.collection("user").where("email","==",userEmail).get().then(function(snapshop){
                if(snapshop.docs==""){
                    db.collection("user").doc().set({
                    email: userEmail,
                    photo: userPhoto 
                    })
                }
        })    
        
        //將大頭照放入 navbar
        let navimg = document.createElement("img");
        navimg.setAttribute("src",userPhoto);
        navphoto.appendChild(navimg)

        //將名子放入 navbar
        let navnameDiv = document.createElement("div");
        navnameDiv.textContent = userName +"  你好!";
        console.log(userName)
        navname.appendChild(navnameDiv);

        navphoto.style.display="block"
        navname.style.display="block"
            
    }
    else{

    }
   
})


//最新消息 資料
 ajax("https://cors-anywhere.herokuapp.com/https://gis.taiwan.net.tw/XMLReleaseALL_public/activity_C_f.json",function(response){
     newRender(response)
});

function newRender(data){
//抓出2019的資訊
let arr=[]
let list = data.XML_Head.Infos.Info
for(let a= 0;a< list.length ;a++){
    let year = data.XML_Head.Infos.Info[a].Start.slice(0,4);
    if( year=="2019"){
    arr.push(data.XML_Head.Infos.Info[a]);
    }
}

//抓出最新50筆
let newarr=[]
arr.forEach(function(item,index){
let max = arr.length
let min = max-6
if(index<max && min<index){
 newarr.push(item)
}
})

for( let i=0; i<5 ;i++ ){
   //最新消息 資料
    let id = newarr[i].Id;  
    let title = newarr[i].Name;
    let text = newarr[i].Description.slice(0,50)+"...";
    let time = newarr[i].Start.slice(0,10);
    
    //最新消息DOM元素
    let indexMainCrad = document.createElement('div');
        indexMainCrad.setAttribute('class','index-main-crad');
    let cardTitle = document.createElement('div');
        cardTitle.setAttribute('class','card-title');
        cardTitle.textContent = title;
    let cardText = document.createElement('a');
        cardText.setAttribute('href',"newsPagination.html?id="+id);
        cardText.setAttribute('class','card-Text');
        cardText.textContent = text ;
    let cardTime = document.createElement('p');
        cardTime.setAttribute('class','card-time');
        cardTime.textContent = time ;



    let indexMainRight = document.querySelector('.index-main-content');
        indexMainRight.appendChild(indexMainCrad);
        indexMainCrad.appendChild(cardTitle);
        indexMainCrad.appendChild(cardText);
        indexMainCrad.appendChild(cardTime);



}
 

}


//右移的按鈕
let RightBtn = document.querySelector(".index-play-right-btn");
    RightBtn.addEventListener("click",function(){
    let scroll = document.querySelector(".index-play-img")
        scroll.scrollLeft += 300 ; 
})

//左移的按鈕
let LeftBtn = document.querySelector(".index-play-left-btn");
    LeftBtn.addEventListener("click",function(){
        let scroll = document.querySelector(".index-play-img")
            scroll.scrollLeft -= 300 ; 
    })





