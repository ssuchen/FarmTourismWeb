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
    //    if(name== "中崙漁業休閒農場"){
    //     photo="https://ezgo.coa.gov.tw/Uploads/opendata/BuyItem/APPLY_D/20151026161106.jpg"
    //    }else{
    //     photo = photo;   
    //    }

    travelMainContent = document.querySelector('.travel-main-content');

    let travelCard = document.createElement('a');
        travelCard.setAttribute('href','travelPagination.html?id='+ id );
        travelCard.setAttribute('class','travel-card');

    let travelImg = document.createElement('div');
        travelImg.setAttribute('class','travel-img');
    let travelPhoto = document.createElement('img');
        travelPhoto.setAttribute('src',photo);
    
    let travelTitle = document.createElement('div');
        travelTitle.setAttribute('class','travel-title');
        travelTitle.textContent = name;
    
    let travelPlace = document.createElement('div');
        travelPlace.setAttribute('class','travel-place');
        
    let travelCounty = document.createElement('div');
        travelCounty.setAttribute('class','travelCounty');
        travelCounty.textContent = city;

    let travelText = document.createElement('div');
        travelText.setAttribute('class','travel-text');
        travelText.textContent = town;


    travelMainContent.appendChild(travelCard);
    travelCard.appendChild(travelImg);
    travelCard.appendChild(travelTitle);
    travelCard.appendChild(travelPlace);

    travelImg.appendChild(travelPhoto);
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

//更新按鈕列        
    function updateBtnlist(){
        let str =""
        let max = nextpage+5
        let min = nextpage-5 
 
        if( min<0 || min==0 ){
            min=1;
            max=11;
        }
        if(max > page){
            max = page+1;
        }
        for( let i= min; max > i; i++){
        str += '<div class="page-Btn" id="'+i+ '">'+i+'</div>';
        pageList.innerHTML = str;   
        };
        let text =document.getElementById(nextpage);
        text.classList.add('btn-active'); 
        
        //更新所點選的按鈕所對應的資料
        let pageBtn =  document.querySelectorAll('.page-Btn');
        for(let b=0 ;b<pageBtn.length;b++){
        pageBtn[b].addEventListener('click',function(){ 
        let clickid = pageBtn[b].id
        let removeClass = document.querySelector('.btn-active');
            removeClass.classList.remove('btn-active');
        let clickBtn = document.getElementById(clickid); 
            clickBtn.classList.add("btn-active");
     
        //抓出每頁最大及最小的筆數編號  當前頁數 * 每頁需要的資料筆數
    
        let clickpage = parseInt(clickid);
        let minpage =(clickpage*perpage)- perpage +1;
        let maxpage =(clickpage*perpage);
    
        //建立新陣列
        let newdata = [];
        data.forEach(function(item,index){
        //利用陣列索引 索引從0開始 所以要加1
        let num = index+1
        //當篩選 索引大於最小值 及 小於最大值時 將該筆資料放入陣列
        if(num>=minpage && num<=maxpage){
         newdata.push(item)    
        } 
        //console.log(newdata)
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
    console.log("test")
    str += '<a  href= " travelPagination.html?id=' + id +'"class="travel-card"><div class="travel-img"><img src=' + photo 
    + '></div><div class="travel-title">' + name 
    +'</div><div class="travel-place"><div class="travel-county">'
    + city +'</div> <div class="travel-text">' + town + '</div></div></a>';
    let travelMainContent = document.querySelector('.travel-main-content');
    travelMainContent.innerHTML = str;

        }    


    })
        
    }
    }

// 頁數按鈕 監聽事件
    let pageBtn =  document.querySelectorAll('.page-Btn');
    let pageNumber = 1 ;
    let nextpage
    for(let i=0 ; i< page; i++){
        
    function renderPage(){
     pageNumber = parseInt(pageBtn[i].innerHTML);
     //為點取的按鈕增加CSS屬性
     //1.先移除原有
     let removeClass = document.querySelector('.btn-active');
     removeClass.classList.remove('btn-active');
     //2.再加入指定的按鈕css屬性      
     let clickBtn = document.getElementById(pageNumber);
         clickBtn.classList.add("btn-active");      
     //抓出每頁最大及最小的筆數編號  當前頁數 * 每頁需要的資料筆數
     let min =(pageNumber*perpage)- perpage +1;
     let max =(pageNumber*perpage);

     //建立新陣列
     let newdata = [];
     data.forEach(function(item,index){
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
    + '></div><div class="travel-title">' + name 
    +'</div><div class="travel-place"><div class="travel-county">'
    + city +'</div> <div class="travel-text">' + town + '</div></div></a>';
    let travelMainContent = document.querySelector('.travel-main-content');
    travelMainContent.innerHTML = str;

     }
    
    };
    if(pageBtn[i]==undefined){
    pageBtn[i]==undefined
    }
    else{
    pageBtn[i].addEventListener('click',renderPage);    
    };
    };    
//上下頁 按鈕觸發 撈取資訊
    function Pageloading(){
    let removeClass = document.querySelector('.btn-active');
        removeClass.classList.remove('btn-active');
        
    //2.再加入指定的按鈕css屬性
    let clickBtn = document.getElementById(pageNumber); 
        clickBtn.classList.add("btn-active");

    //抓出每頁最大及最小的筆數編號  當前頁數 * 每頁需要的資料筆數
    let min =(pageNumber*perpage)- perpage +1;
    let max =(pageNumber*perpage);

 //建立新陣列
    let newdata = [];
    data.forEach(function(item,index){
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
 }
 else{
 photo = photo;   
 }


 str += '<a  href= " travelPagination.html?id=' + id +'"class="travel-card"><div class="travel-img"><img src=' + photo 
 + '></div><div class="travel-title">' + name 
 +'</div><div class="travel-place"><div class="travel-county">'
 + city +'</div> <div class="travel-text">' + town + '</div></div></a>';
 let travelMainContent = document.querySelector('.travel-main-content');
 travelMainContent.innerHTML = str;
    }
    };

//下一頁的按鈕
    let AddPageBtn = document.querySelector('.Add-page');
    AddPageBtn.addEventListener("click",function(){
    if(pageNumber == undefined){
    nextpage = 1 ;
    pageNumber = nextpage;
    }
    if(pageNumber==page){
    alert('最後一頁了');
    return;
    } 
    if(pageNumber== 1 && page == 1 ){
    return;
    }       
    nextpage = pageNumber + 1;
    pageNumber = nextpage;
    Pageloading();
    updateBtnlist();
    });

//上一頁的按鈕        
    let LessPageBtn = document.querySelector('.Less-page');
    LessPageBtn.addEventListener("click",function(){
    //console.log(pageNumber)
    if(pageNumber== 1){
    return;
    } 
    nextpage = pageNumber - 1;
    pageNumber = nextpage;
    updateBtnlist();
    Pageloading(); 

    });  

//+++++++++++++++++++++++++++
//      搜尋列 功能
//+++++++++++++++++++++++++++
    let searchBtn = document.querySelector(".searchBar-Btn");
    searchBtn.addEventListener("click",function(){
    //取得使用者選取的 地方區域
    let searchBarArea = document.querySelector(".searchBar-Area").value;
    //取得使用者選取的 縣市
    let searchBarCounty = document.querySelector(".searchBar-County").value;
    //console.log(searchBarCounty)

    //取得使用 者輸入的文字
    let searchInput = document.querySelector(".searchBar-Input-text").value;
    
    //清空資料 並重新放上資訊
    travelMainContent = document.querySelector('.travel-main-content');
    travelMainContent.innerHTML="";
        let status = true ;
        let searchdata=[] ;  
        data.forEach(function(item,index){
        //如果選取對應的城市    
        if(searchBarCounty === item.City){       
            searchdata.push(item);
        }
        //如果搜尋列 輸入 鄉鎮或是縣市
        if(searchInput === item.City ||  searchInput === item.Town){
            searchdata.push(item);
        }
        if(searchBarArea==="all" || searchBarCounty==="all"){
            status=false;//如果沒有輸入的話
        }
        else{
            word = false; //如果輸入沒有找到
        } 
        });
        if( status == false){
        alert("請點選或輸入搜尋地");
        location.reload();
        }

        //將新的頁數資料重新放上網頁
        let str=""
        for(let p = 0 ; p<searchdata.length ; p++){
        
        if(searchdata.length >12 ){
            searchdata.length = 12  //如果長度超出12筆 只顯示12筆
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
        str += '<a  href= " travelPagination.html?id=' + id +'"class="travel-card"><div class="travel-img"><img src=' + photo 
        + '></div><div class="travel-title">' + name 
        +'</div><div class="travel-place"><div class="travel-county">'
        + city +'</div> <div class="travel-text">' + town + '</div></div></a>';
        let travelMainContent = document.querySelector('.travel-main-content');
        travelMainContent.innerHTML = str;
        } 
        //算出頁數按鈕總數
        let pagelen = Math.ceil(searchdata.length/12)
        //console.log(pagelen)
        if(pagelen = 1){
            page=1; 
        }
        //console.log(page)
        //console.log(searchdata.length)
        //重新寫出按鈕
        let pageList = document.querySelector('.page-list');
         pageList.innerHTML=""; //清空原先按鈕列
        for( let i=0 ; i< pagelen; i++){
            let pageBtn = document.createElement('div');
                pageBtn.setAttribute('class','page-Btn');
                pageBtn.setAttribute('id',i+1);
                pageBtn.textContent = i+1;
                pageList.appendChild(pageBtn);
        
        };
        let activebtn = document.getElementById("1");
            activebtn.classList.add("btn-active");
    })

}
search(); 


