//==========================
//       判斷有沒有登入
//==========================   
firebase.auth().onAuthStateChanged(function(user){
        if(user != null){
            //user = firebase.auth.currentUser;
            console.log(user)
            userName = user.displayName; 
            userEmail = user.email
            console.log(userName)
            
        }
        else{
          console.log("no")
        }
       
})
//==========================
//==========================

//休閒農業區 資料
ajax("https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvAttractions.aspx",function(response){
    travelRender(response)
});

function travelRender(data){
let len = data.length;
let perpage = 12;

let photo
let name 
let city
let town

for( let i = 0 ; i<12; i++){

    photo = data[i].Photo; 
    name = data[i].Name;
    city = data[i].City;
    town = data[i].Town;

    let id = data[i].ID;
    let travelMainContent

    function renderCard(){
       if(name=="梨之鄉休閒農業區"){
        photo="https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
       }else{
        photo = photo;   
       }

    travelMainContent = document.querySelector('.travel-main-content');

    let travelCard = document.createElement('a');
        travelCard.setAttribute('href','travelPagination.html?id='+ id );
        travelCard.setAttribute('class','travel-card');

    let travelImg = document.createElement('div');
        travelImg.setAttribute('class','travel-img');
    let travelPhoto = document.createElement('img');
        travelPhoto.setAttribute('src',photo);

    let travellikeBtn = document.createElement("i")
        travellikeBtn.setAttribute("class","far fa-heart like-btn likebtnRemove");
        travellikeBtn.setAttribute("data-tag","travel");  
        travellikeBtn.setAttribute("id",id);    
    
    let travelTitle = document.createElement('div');
        travelTitle.setAttribute('class','travel-title');
        travelTitle.textContent = name;
    
    let travelPlace = document.createElement('div');
        travelPlace.setAttribute('class','travel-place');
        
    let travelCounty = document.createElement('div');
        travelCounty.setAttribute('class','travel-country');
        travelCounty.textContent = city;

    let travelText = document.createElement('div');
        travelText.setAttribute('class','travel-text');
        travelText.textContent = town;


    travelMainContent.appendChild(travelCard);
    travelCard.appendChild(travelImg);
    travelCard.appendChild(travelTitle);
    travelCard.appendChild(travelPlace);

    travelImg.appendChild(travelPhoto);
    travelImg.appendChild(travellikeBtn);  
    travelPlace.appendChild(travelCounty);
    travelPlace.appendChild(travelText);
    };
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
    for( let i=0 ; i<10; i++){
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

//---------------更新按鈕列---------------

function updateBtnlist(){
    let Btnstr =""
    let max = nextpage+5;
    let min = nextpage-5; 

    if( min<0 || min==0 && page > 10 ){
    min=1;
    max=11;

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


function clickbtn(){
    //更新所點選的按鈕所對應的資料
    let pageBtn =  document.querySelectorAll('.page-Btn');
    for(let i=0 ; i<pageBtn.length; i++){
    pageBtn[i].addEventListener('click',function(){ 
 
    //重新定義點擊的按鈕數字
    nextpage = parseInt(pageBtn[i].innerHTML); 
                
    //改變按鈕 樣式
    changeBtnStyle();
         
    //重新 更換內容資料的函式
    renderPage();
    });
     
    };
};

//---------------觸發更換按鈕------------

    for(let i=0 ; i< pageBtn.length ; i++){ 

    pageBtn[i].addEventListener('click',changeBtnStyle);
    
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
    };
    
    //更換內容資料的函式
    pageBtn[i].addEventListener('click',renderPage);
    function renderPage(){
        //抓出每頁最大及最小的筆數編號  當前頁數 * 每頁需要的資料筆數
        let min =(choseBtn*perpage)- perpage +1;
        let max =(choseBtn*perpage);
        
        //建立新陣列
        let newdata = [];
        let pagedata
        if(searchdata!=""){
        pagedata = searchdata;
        }
        else{
        pagedata = data ;
        } 
        pagedata.forEach(function(item,index){  
        //利用陣列索引 索引從0開始 所以要加1
            let num = index+1
        //當篩選 索引大於最小值 及 小於最大值時 將該筆資料放入陣列
            if(num>=min && num<=max){
            newdata.push(item)    
            }  
    
        });

        //將新的頁數資料重新放上網頁
        let str=""
        for(let p = 0 ; p<newdata.length ; p++){
             let photo = newdata[p].Photo; 
             let name = newdata[p].Name;
             let city = newdata[p].City;
             let town = newdata[p].Town;
             let id = newdata[p].ID;
        
            if(name== "中崙漁業休閒農場" || name== "淞濤田園休閒農場"  || name=="梨之鄉休閒農業區" || name=="清香休閒農場"||
            name=="春園休閒農場"){
               // photo="https://ezgo.coa.gov.tw/Uploads/opendata/BuyItem/APPLY_D/20151026161106.jpg"
               photo="https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
            }else{
            photo = photo;   
            }
        
            str += '<a  href= " travelPagination.html?id=' + id +'"class="travel-card"><div class="travel-img"><img src=' + photo 
            + '><i class="far fa-heart like-btn likebtnRemove" data-tag="travel" id = '+ id
            + '></i></div><div class="travel-title">' + name 
            +'</div><div class="travel-place"><div class="travel-country">'
            + city +'</div> <div class="travel-text">' + town + '</div></div></a>';  
        };
        
        let travelMainContent = document.querySelector('.travel-main-content');
            travelMainContent.innerHTML = str;

        //願望清單
        checkBtnStyle();
        checkBtn();
        
    }; 
       
    };  
    
    //下一頁按鈕
    let AddPageBtn = document.querySelector('.Add-page');
        AddPageBtn.addEventListener("click",function(){
            //console.log(choseBtn)
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

   //======================
   //      搜尋列 功能
   //======================
    let searchBtn = document.querySelector(".searchBar-Btn");
    let searchdata=[] ; 
    searchBtn.addEventListener("click",function(){
    //取得使用者選取的 地方區域
    let searchBarArea = document.querySelector(".searchBar-Area").value;
    //取得使用者選取的 縣市
   
    let searchBarCountry = document.querySelector(".searchBar-Country").value;
    //取得使用 者輸入的文字
    let searchInput = document.querySelector(".searchBar-Input-text").value;
    
    //清空資料 並重新放上資訊
    travelMainContent = document.querySelector('.travel-main-content');
    travelMainContent.innerHTML="";
    let status = true ;
    
     //建立新陣列
     searchdata=[];    
    //篩選相對應的資料 
   // console.log(searchInput)
        data.forEach(function(item,index){
          //  console.log(data)
        //如果選取對應的城市    
        if(searchBarCountry === item.City){       
            searchdata.push(item);
        }
        //如果搜尋列 輸入 鄉鎮或是縣市
        if(searchInput === item.City ||  searchInput === item.Town){
            searchdata.push(item);
        }
        if(searchBarArea==="all" || searchBarCountry==="all"){
            status=false;//如果沒有輸入的話
        }
        });
        //如果沒有得到輸入值
        if( status == false && searchInput==""){
        alert("請點選或輸入搜尋地");
        location.reload();
        };
        //將新的頁數資料重新放上網頁
        let str=""
       
        let len = searchdata.length
        for(let p = 0 ; p < len ; p++){  
        if(len>12){
            len=12
        }
        let photo = searchdata[p].Photo; 
        let name = searchdata[p].Name;
        let city = searchdata[p].City;
        let town = searchdata[p].Town;
        let id = searchdata[p].ID;

        if(name== "中崙漁業休閒農場" || name== "淞濤田園休閒農場"  || name=="梨之鄉休閒農業區" || name=="清香休閒農場"||
        name=="春園休閒農場"){
        // photo="https://ezgo.coa.gov.tw/Uploads/opendata/BuyItem/APPLY_D/20151026161106.jpg"
        photo="https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
        }else{
        photo = photo;   
        }
        str += '<a  href= " travelPagination.html?id=' + id 
        +'"class="travel-card"><div class="travel-img"><img src=' + photo 
        + '><i class="far fa-heart like-btn likebtnRemove" data-tag="travel" id = '+ id
        + '></i></div><div class="travel-title">' + name 
        +'</div><div class="travel-place"><div class="travel-country">'
        + city +'</div> <div class="travel-text">' + town + '</div></div></a>';
        
        let travelMainContent = document.querySelector('.travel-main-content');
        travelMainContent.innerHTML = str;
        
        //將搜尋列清空
        let InputClear = document.querySelector(".searchBar-Input-text");
        InputClear.value = "";
        
        //願望清單
        checkBtnStyle();
        checkBtn();
        } 
        
        //算出頁數按鈕總數
        //console.log( "資料長度"+searchdata.length)
        let pagelen = Math.ceil(searchdata.length/12)
        //console.log("總頁數"+pagelen)

        //重新寫出按鈕
        nextpage = 1
        page = pagelen    
        updateBtnlist();
        clickbtn();
    })

    //======================
    //   偵測會員是否有登入
    //======================


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
        let travellist = db.collection("user").doc(docID).collection("travellist"); 
            travellist.get().then(function(snapshop){
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
                else{
                console.log("還沒有這個會員的資料")   
                }
            });
        let travellist = db.collection("user").doc(docID).collection("travellist"); 
        travellist.where("id","==",btnNum).get().then(function(snapshop){
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
                let deleteDoc = db.collection("user").doc(docID).collection("travellist").doc(deleteID)
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
          let country
          let id 
          let img 
          let text 
          let title     
          
          for(let a=0;a<data.length;a++){
            if(data[a].ID == btnID){
              country = data[a].City;
              id =data[a].ID;
              img = data[a].Photo;
              text = data[a].Town;
              title = data[a].Name;

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
            let travellist = db.collection("user").doc(docID).collection("travellist")
            travellist.add({
            id:id,
            country:country,
            img:img,
            text:text,
            title:title,
            }); 
          })
        
    };
      
}



search(); 









