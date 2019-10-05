//抓到網址的query string    
let idstring = location.href;
//將字串轉成url
let url = new URL(idstring);
//找到id後方的字串
let urlString = url.searchParams.get('id');
    
ajax("https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvAttractions.aspx",function(response){
    travelpageRender(response)
});

function travelpageRender(data){
    let city
    let photo 
    let name

    data.forEach(function(item){  
        //渲染出id位置關資料  
        if(item.Name== "中崙漁業休閒農場" || item.Name == "淞濤田園休閒農場"  || item.Name =="梨之鄉休閒農業區" || item.Name =="清香休閒農場"||
        name=="春園休閒農場" ){
            item.Photo="https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
        }
       
        if(urlString===item.ID){
            city = item.City;    
            photo = item.Photo;
            name = item.Name;
            let tel = item.Tel;
            let town = item.Town;
            let introduction = item.Introduction;
            let coordinate = item.Coordinate;
            let travelpageLeft = document.querySelector(".travelpage-left");
            
            let travelpageImg = document.createElement("img");
            travelpageImg.setAttribute('class','travelpage-img');
            travelpageImg.setAttribute('src',photo);

            let travelpageContent = document.createElement("div");
            travelpageContent.setAttribute('class','travelpage-content');
            let travelpageName = document.createElement("div");
            travelpageName.setAttribute("class","travelpage-name");
            travelpageName.textContent = name;
            
            let travelpagePlace = document.createElement("div");     
            travelpagePlace.setAttribute("class","travelpage-place");
            
            let travelpageCity = document.createElement('div');
            travelpageCity.setAttribute('class','travelpage-city');
            travelpageCity.textContent = city;
            let travelpageTown = document.createElement('div');
            travelpageTown.setAttribute("class","travelpage-town");
            travelpageTown.textContent = town;

            let travelpageTel = document.createElement('div');
            travelpageTel.setAttribute("class","travelpage-tel");
            travelpageTel.textContent = tel;          

            let travelpageText = document.createElement('div');
            travelpageText.setAttribute("class","travelpage-text");
            travelpageText.textContent = introduction;
            
            

            //建立google map 標籤
            let travelpageMap = document.querySelector(".travelpage-map");
            let mapLink = document.createElement("iframe");
            mapLink.setAttribute("width","100%");
            mapLink.setAttribute("height","100%");
            mapLink.setAttribute("frameborder","0");
            mapLink.setAttribute("scrolling","no");
            mapLink.setAttribute("marginheight","0");
            mapLink.setAttribute("marginwidth","0");
            mapLink.setAttribute("src","https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q="+ coordinate +"&z=16&output=embed&t=");
                       
            travelpageLeft.appendChild(travelpageImg);
            travelpageLeft.appendChild(travelpageContent);

            travelpageContent.appendChild(travelpageName);
            travelpageContent.appendChild(travelpagePlace);

            travelpagePlace.appendChild(travelpageCity);
            travelpagePlace.appendChild(travelpageTown);

            travelpageContent.appendChild(travelpageTel);
            travelpageContent.appendChild(travelpageText);

            travelpageMap.appendChild(mapLink);

            //============================
            //  抓取firebase 資料
            //============================
      
            //抓取 相同id 的留言
            let MessageArr=[]
            //抓取遞減的資訊
            db.collection("comment").orderBy("time","asc").onSnapshot(function(snapshop){
                MessageArr=[]
                let travelpageMessage = document.querySelector(".travelpage-message");
                travelpageMessage.innerHTML='<div class="travelpage-message-text">留言評價</div>'
                snapshop.docs.forEach(function(doc){
                    if (doc.data().id == urlString ){
                        MessageArr.push(doc.data());
                    } 
                });    
                let len = MessageArr.length;
                if(len>8){
                    len = 8;
                }else{
                    len = len;
                }

                renderMessage();
                function renderMessage(){
                    for(let i = 0 ;i<len; i++){
                        let name = MessageArr[i].name;
                        let time = MessageArr[i].time;
                        let text = MessageArr[i].text;
                        let photo = MessageArr[i].photo;             
                        //============================
                        //留言板功能
                        let travelpageMessage = document.querySelector(".travelpage-message");
             
                        let travelpageMessageContent = document.createElement("div");
                        travelpageMessageContent.setAttribute("class","travelpage-message-content");

                        let travelpageMessageContentRight = document.createElement("div");
                        travelpageMessageContentRight.setAttribute("class","travelpage-message-content-right");

                        let leftImg= document.createElement("img");
                        leftImg.setAttribute("src",photo);

                        let travelpageMessageContentLeft = document.createElement("div");
                        travelpageMessageContentLeft.setAttribute("class","travelpage-message-content-left");

                        let travelpageMessageTitle = document.createElement("div");
                        travelpageMessageTitle.setAttribute("class","travelpage-message-title");

                        let travelpageMessageName = document.createElement("div");
                        travelpageMessageName.setAttribute("class","travelpage-message-name");
                        travelpageMessageName.textContent = name;

                        let travelpageMessageTime = document.createElement("div");
                        travelpageMessageTime.setAttribute("class","travelpage-message-time");
                        travelpageMessageTime.textContent = time;

                        let travelpageMessageMemo = document.createElement("div");
                        travelpageMessageMemo.setAttribute("class","travelpage-message-memo");
                        travelpageMessageMemo.textContent = text;

                        //留言版功能
                        travelpageMessage.appendChild(travelpageMessageContent);
                        travelpageMessageContent.appendChild(travelpageMessageContentLeft);
                        travelpageMessageContent.appendChild(travelpageMessageContentRight);
                        travelpageMessageContentLeft.appendChild(leftImg);


                        travelpageMessageContentRight.appendChild(travelpageMessageTitle);
               
                        travelpageMessageTitle.appendChild(travelpageMessageName);
                        travelpageMessageTitle.appendChild(travelpageMessageTime);
                        travelpageMessageContentRight.appendChild(travelpageMessageMemo);

                    };

                };

            });


        }
               
    });
    //找出相關的位置的景點
    //創新陣列 將塞選的資料放入
    let newPlace=[];
    data.forEach(function(item){
        if(city===item.City && urlString !== item.ID){
            newPlace.push(item);
        }
    });

    //隨機打亂 陣列中 物件順序
    newPlace.sort(function(){
        return Math.random() - 0.5;
    });
    
    //抓出前面5筆資訊
    newPlace.forEach(function(item,index){
        if(index<5){
            let travelpageOther = document.querySelector(".travelpage-other");
            let name =item.Name;
            let photo = item.Photo;
            let id = item.ID;
            let otherSpace = document.createElement("a");
            otherSpace.setAttribute("class","other-space");
            otherSpace.setAttribute("href","travelPagination.html?id=" + id);
            let otherImg = document.createElement("img");
            otherImg.setAttribute("class","other-img");
            otherImg.setAttribute("src", photo);
            let otherName = document.createElement("div");
            otherName.setAttribute("class","other-name");
            otherName.textContent = name;

            travelpageOther.appendChild(otherSpace);
            otherSpace.appendChild(otherImg);
            otherSpace.appendChild(otherName);

        }
        
    })
        
};


travelpageMessageBtn = document.querySelector(".travelpage-message-btn");
// 有登入時 留言按鈕出現
firebase.auth().onAuthStateChanged(function(user){
    if(user == null){
        travelpageMessageBtn.style.display="none";
    } 
});


let travelpageMessageComment = document.querySelector(".travelpage-message-comment");    
//按下留言按鈕 留言視窗出現
travelpageMessageBtn.addEventListener("click",function(){
    travelpageMessageComment.style.display="block";
    travelpageMessageBtn.style.display="none";
});

//按下取消評論 視窗關閉 
let commentCancelBtn = document.querySelector(".comment-cancel-btn");
commentCancelBtn.addEventListener("click",function(){
    travelpageMessageComment.style.display="none";
    travelpageMessageBtn.style.display="block";
});

//按下送出評論 評論送出
let commentInput = document.querySelector(".comment-input");
let commentInputValue
let formMessage = document.querySelector("#formMessage");
formMessage.addEventListener("submit",function(e){
    e.preventDefault();
    commentInputValue = commentInput.value;
    if(commentInputValue==""){
        alert("請輸入訊息");
    }else{
        pushMessage();
        //清空表單資訊
        commentInput.value="";
    }
    

})

function pushMessage(){
    let Today=new Date();
    let messageDoc = db.collection("comment").doc();    
    messageDoc.set({
        id:urlString,
        name:userName,
        photo:userPhoto,
        text:commentInputValue,
        time:Today.getFullYear()+"."+ (Today.getMonth()+1 )+"." + Today.getDate() 
    });
}
