//============================
//  判斷是否有登入會員 
//============================

travelpageMessageBtn = document.querySelector(".travelpage-message-btn");
// 有登入時 留言按鈕出現
 userName
 userEmail
 userPhoto
 user
console.log(user)
 firebase.auth().onAuthStateChanged(function(user){
    if(user != null){
        //user = firebase.auth.currentUser;
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


    }
    else{
    console.log("no")
    }
   
})


ajax("https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/RuralTravelData.aspx",function(response){
    journeyRender(response)
});
function journeyRender(data){

let len = data.length;
let perpage = 12;

for(let i =0 ;i<12 ;i++){
        let journeyTag
        let id = data[i].TravelSeq;
        let name = data[i].Title;
        let photo = data[i].PhotoUrl;
        let text = data[i].Contents.substr(0,38)+"...";
        let tag = data[i].TravelType;
        
        //將tag 字串分開成陣列
        let arr=[]
        for(t=0 ;t<tag.length;t++){
            let gettag = tag.substr(t*9,4);
            if(gettag!==""){
            arr.push(gettag)    
            }  
        };

        function renderCard(){

            let journeyMainContent = document.querySelector(".journey-main-content");
            let journeyCard = document.createElement("a");
                journeyCard.setAttribute("class","journey-card")
                journeyCard.setAttribute("href","journeyPagination.html?id="+id)
            let journeyImg = document.createElement("div");
                journeyImg.setAttribute("class","journey-img");
            let img = document.createElement("img");
                img.setAttribute("src",photo);
            let journeyBtn = document.createElement("i");
                journeyBtn.setAttribute("class","far fa-heart like-btn");
                journeyBtn.setAttribute("id",id); 

            let journeyTitle = document.createElement("div");
                journeyTitle.setAttribute("class","journey-title");
                journeyTitle.textContent = name;
                //console.log( journeyTitle)

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

      

                //將 tag 放入 journey-group的迴圈
                arr.forEach(function(item,index){
                    journeyTag = document.createElement("div");
                    journeyTag.setAttribute("class","journey-tag");
                    tag = item;
                    journeyTag.textContent = tag;
                    journeyGroup.appendChild(journeyTag);
                });




        }
        renderCard();
};

//+++++++++++++++++++++++++++
//      頁數判斷功能
//+++++++++++++++++++++++++++

//農場頁數
let page = Math.ceil(len/perpage);

//農場頁數 掛的 html 標籤
let pageList = document.querySelector('.page-list');
    //第一次產出頁數按鈕
    for( let i=0 ; i<5; i++){
    let pageBtn = document.createElement('div');
        pageBtn.setAttribute('class','page-Btn');
        pageBtn.setAttribute('id',i+1);
        pageBtn.textContent = i+1;
        pageList.appendChild(pageBtn);

    };
    let activebtn = document.getElementById("1");
        activebtn.classList.add("btn-active");
   
    // 頁數按鈕 監聽事件    
    let pageBtn =  document.querySelectorAll('.page-Btn');
    let choseBtn
    let nextpage    
    let searchdata=[]

    //---------------更新按鈕列---------------
    //重新更新按鈕列表
    function updateBtnlist(){
    let Btnstr =""
    let max = nextpage+3;
    let min = nextpage-2; 

    if( min<0 || min==0 && page > 5 ){
    min=1;
    max=6;

    }
    if(max > page){
    max = page+1;

    }
    for( let i= min; max > i; i++){
    Btnstr += '<div class="page-Btn" id="'+i+ '">'+i+'</div>';
    pageList.innerHTML = Btnstr;   
    };
    let text =document.getElementById(nextpage);
    text.classList.add('btn-active'); 
    };

    //更新點擊按鈕事件
    function clickbtn() {
    //重新定義點擊的按鈕
        let pageBtn = document.querySelectorAll(".page-Btn");
            for( let i=0;i<pageBtn.length ;i++){
              pageBtn[i].addEventListener("click",function(){
                  nextpage = parseInt(pageBtn[i].innerHTML);
  
                 //改變按鈕 樣式
                 changeBtnStyle();
                 //重新 更換內容資料的函式
                 renderPage();
              })
            }
    };
  
   //---------------觸發更換按鈕------------
    
    for( let i=0 ; i<pageBtn.length ; i++){
       pageBtn[i].addEventListener("click",changeBtnStyle); 

       //更換按鈕樣式的函式
       function changeBtnStyle(){
        //1.先移除原有
        let removeClass = document.querySelector('.btn-active');
        removeClass.classList.remove('btn-active'); 
        //2.再加入指定的按鈕css屬性
        if( nextpage == undefined){
        choseBtn = pageBtn[i].id 
        }
        else{
        choseBtn = nextpage
        }
        let clickBtn = document.getElementById(choseBtn);
           clickBtn.classList.add("btn-active");

        //重新定義 nextpage 將內容定義為 undefined   
        nextpage = undefined;    
        };
    
        //更換內容資料的函式
        pageBtn[i].addEventListener("click",renderPage);

        function renderPage(){
       
        //抓出每頁最大及最小筆數編號 當前頁數 * 每頁需要的資料筆數
        let min =(choseBtn*perpage)-perpage +1;
        let max = (choseBtn*perpage);
        let pagedata
        let newdata=[];
        if(searchdata!=""){
       pagedata = searchdata;

        }
        else{
        pagedata = data ;     
        }
        //console.log(data)
        pagedata.forEach(function(item,index){
        //利用陣列索引 索引從0開始 所以要加1
        let num = index+1
        //當篩選 索引大於最小值 及 小於最大值時 將該筆資料放入陣列
        if(num>=min && num<=max){
        newdata.push(item)   
        }
        })
        
        //將新的頁數資料重新放上網頁
        let journeyMainContent = document.querySelector(".journey-main-content");
            journeyMainContent.innerHTML=""; 
  
        for (let p = 0; p < newdata.length; p++){
            let id = newdata[p].TravelSeq;
            let name = newdata[p].Title;
            let photo = newdata[p].PhotoUrl;
            let text = newdata[p].Contents.substr(0,38)+"...";
            let tag = newdata[p].TravelType;

            //將tag 字串分開成陣列
            let arr=[]
            for(t=0 ;t<tag.length;t++){
            let gettag = tag.substr(t*9,4);
            if(gettag!==""){
            arr.push(gettag)    
            }  
            };

            let journeyCard = document.createElement("a");
                journeyCard.setAttribute("class","journey-card")
                journeyCard.setAttribute("href","journeyPagination.html?id="+id)
            let journeyImg = document.createElement("div");
                journeyImg.setAttribute("class","journey-img");
            let img = document.createElement("img");
                img.setAttribute("src",photo);
            
            let journeyBtn = document.createElement("i");
                journeyBtn.setAttribute("class","far fa-heart like-btn");
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
      

                //將 tag 放入 journey-group的迴圈
                arr.forEach(function(item,index){
                    journeyTag = document.createElement("div");
                    journeyTag.setAttribute("class","journey-tag");
                    tag = item;
                    journeyTag.textContent = tag;
                    journeyGroup.appendChild(journeyTag);
                });
   
         } 
        //願望清單
        checkBtnStyle();
        checkBtn();
        }
 
                
    }

    //下一頁按鈕
    let AddPageBtn = document.querySelector('.Add-page');
        AddPageBtn.addEventListener("click",function(){
        if(choseBtn==undefined){
        choseBtn = 1 ;
        }
        if(choseBtn==page){
        alert('最後一頁了');
        return;
        }
        if(choseBtn == 1 && page == 1 ){
        return;
        }    
        nextpage = parseInt(choseBtn) + 1; 

        //更改按鈕列表
        updateBtnlist();
        clickbtn();
        //更改按鈕樣式   
        changeBtnStyle();
        //更改內容資料
        renderPage();
        });

    //上一頁按鈕
    let LessPageBtn = document.querySelector('.Less-page');
        LessPageBtn.addEventListener("click",function(){
        if(choseBtn==undefined){
            choseBtn = 1 ;
        }
        if(choseBtn == 1){
            return;
        }    
        nextpage = parseInt(choseBtn) - 1; 


        //更改按鈕列表
        updateBtnlist();
        clickbtn();
        //更改按鈕樣式   
        changeBtnStyle();
        //更改內容資料
        renderPage();           
        });





//+++++++++++++++++++++++++++
//      搜尋列 功能
//+++++++++++++++++++++++++++

let tagBtn = document.querySelectorAll(".tag-Btn");

for(let b=0 ; b<tagBtn.length ; b++){
    tagBtn[b].addEventListener("click",tagClick);
    function tagClick(){

    //為點選的按鈕加上樣式
    let removeClass = document.querySelector('.tag-active');
    if( removeClass == null){
        removeClass = null
    }else{
      removeClass.classList.remove('tag-active');
    }
    tagBtn[b].classList.add('tag-active');
    //選取點選樣式的數值
    let btnValue = tagBtn[b].innerHTML; 
    searchdata=[];  
    data.forEach(function(item,index){
        let tag = item.TravelType
        //將tag 字串分開成陣列
        let arr=[]
        for(t=0 ;t<tag.length;t++){
            let gettag = tag.substr(t*9,4);
            let id = item.TravelSeq
            if(gettag!==""){
            arr.push(gettag)   
            }  
        };
        //比對選取的 tag 與 資料相符的放入searchdata
        for(let a=0; a<arr.length ;a++){
            if(arr[a]==btnValue){
            searchdata.push(item)
            }
        };  
    });
    let len = searchdata.length;
    //console.log(len)
    if(len>12){
        len=12
    }
    let journeyMainContent = document.querySelector(".journey-main-content");
    journeyMainContent.innerHTML=""; 
    for (let l = 0; l < len; l++) {
        let journeyTag
        let id = searchdata[l].TravelSeq;
        let name = searchdata[l].Title;
        let photo = searchdata[l].PhotoUrl;
        let text = searchdata[l].Contents.substr(0,38)+"...";
        let tag = searchdata[l].TravelType;
        
        //console.log("test")
        //將tag 字串分開成陣列
        let arr=[]
        for(t=0 ;t<tag.length;t++){   
        let gettag = tag.substr(t*9,4);
        if(gettag!==""){
        arr.push(gettag)    
        }  
        };

        let journeyCard = document.createElement("a");
            journeyCard.setAttribute("class","journey-card")
            journeyCard.setAttribute("href","journeyPagination.html?id="+id)
        let journeyImg = document.createElement("div");
            journeyImg.setAttribute("class","journey-img");
        let img = document.createElement("img");
            img.setAttribute("src",photo);

        let journeyBtn = document.createElement("i");
            journeyBtn.setAttribute("class","far fa-heart like-btn");
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
  

            //將 tag 放入 journey-group的迴圈
            arr.forEach(function(item,index){
                journeyTag = document.createElement("div");
                journeyTag.setAttribute("class","journey-tag");
                tag = item;
                journeyTag.textContent = tag;
                journeyGroup.appendChild(journeyTag);
            });
   

    }
    
    //算出頁數按鈕總數   
    let pagelen = Math.ceil(searchdata.length/12);
    //重新寫出按鈕
    nextpage = 1
    page = pagelen    
    updateBtnlist();
    clickbtn();

    //願望清單
    checkBtnStyle();
    checkBtn(); 
            

    

    }

}


   //=========================================
   //  從 firebase得到願望清單 並改變愛心樣式
   //=========================================
    let btnNum  
    function checkBtnStyle(){
        let docID 
        let docIDArr=[]
        db.collection("user").onSnapshot(function(snapshop){
            snapshop.docs.forEach(function(doc){
                if(userEmail == doc.data().email){
                    docID = doc.id;
                }
            });
        let journeylist = db.collection("user").doc(docID).collection("journeylist"); 
            journeylist.get().then(function(snapshop){
            snapshop.docs.forEach(function(doc){
                let clickId = doc.data().id
                docIDArr.push(clickId)
            })
            let btn =document.querySelectorAll(".like-btn");
            for(let i= 0 ; i<btn.length ;i++){
            docIDArr.forEach(function(item){
                if(btn[i].id==item){
                  btn[i].classList.add("fas");
                }
                
            })
            }
        
        })   
        });
      
    };
    checkBtnStyle();

   //=========================================
   //  從 firebase得到願望清單 並監聽愛心樣式
   //=========================================
    function checkBtn(){
    let btn = document.querySelectorAll(".like-btn");
    //console.log(btn)
    for(let i = 0 ;i<btn.length ; i++){
        btn[i].addEventListener("click",function(e){
        e.preventDefault();
        if(userEmail == undefined){
            alert("請登入會員")
        }
        btnNum = btn[i].id ; 
        let docID 
        let clickID
        let deleteID
        db.collection("user").onSnapshot(function(snapshop){
            snapshop.docs.forEach(function(doc){ 
                if(userEmail == doc.data().email){
                    docID = doc.id;
                }
            });  
        let journeylist = db.collection("user").doc(docID).collection("journeylist"); 
        journeylist.where("id","==",btnNum).get().then(function(snapshop){
            snapshop.docs.forEach(function(doc){
            if(doc.data().id != undefined){
               clickID = doc.data().id
               deleteID = doc.id  
            }
            });
            if(clickID === undefined){
                btn[i].classList.add("fas");
                //將表單送入firebase
                likebtnAdd()
                //檢查 firebase 的清單 重新放入樣式
                checkBtnStyle()
          

            }else{
                //將表單從firebase上移除
                btn[i].classList.remove("fas");
                let deleteDoc = db.collection("user").doc(docID).collection("journeylist").doc(deleteID)
                deleteDoc.delete()
                //檢查 firebase 的清單 重新放入樣式
                checkBtnStyle()
            }   
        }
        )
        });

        })
    }
    
    };
    checkBtn();

    //===================
    //將表單送到 firebase
    //===================
    function likebtnAdd(){
          let btnID = btnNum
          let tag
          let id 
          let img 
          let text 
          let title     
          for(let a=0;a<data.length;a++){
             // console.log(data[a].TravelSeq)
             // console.log(btnID)
            if(data[a].TravelSeq == btnID){
              console.log(data[a])  
              //console.log(tag)
              tag = data[a].TravelType;            
              id = data[a].TravelSeq;        
              img = data[a].PhotoUrl;         
              text = data[a].Contents.substr(0,38)+"...";             
              title = data[a].Title;
              
            }
          }
          //將點取資訊放入firebase 
          db.collection("user").get().then(function(snapshop){
            let docID         
            snapshop.docs.forEach(function(doc) {
                //將符合email的資料放入陣列           
                if(userEmail == doc.data().email){
                    docID = doc.id
                }; 
            });
            let journeylist = db.collection("user").doc(docID).collection("journeylist")
            console.log(tag)

              //將tag 字串分開成陣列
            let arr=[]
            for(t=0 ;t<tag.length;t++){
            let gettag = tag.substr(t*9,4);
            if(gettag!==""){
            arr.push(gettag)    
            }  
            };
            journeylist.add({
            id:id,
            img:img,
            tag:arr,
            text:text,
            title:title,
            }); 
          })
        
    };



}