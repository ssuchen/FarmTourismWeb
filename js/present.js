//特色伴手禮 資料
ajax("https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvAgriculturalProduce.aspx",function(response){
    presentRender(response)
});

function presentRender(data){

    //所有商品的總數
    let len = data.length;
    let perpage = 12;
    let id 
    let name 
    let photo 
    let Place 
    let ProduceOrg
    let presentMainContent

    for( let i=0 ; i<12; i++){
        id = data[i].ID;
        name = data[i].Name;
        photo = data[i].Column1;
        Place = data[i].SalePlace.substr(0,3);
        ProduceOrg = data[i].ProduceOrg;
        
        function renderCard(){
            presentMainContent = document.querySelector('.present-main-content');
            
            let presentCard = document.createElement('a');
                presentCard.setAttribute('href','presentPagination.html?id='+ id);
                presentCard.setAttribute('class','present-card');
        
            let presentImg = document.createElement('div');
                presentImg.setAttribute('class','present-img');
            let presentPhoto = document.createElement('img');
                presentPhoto.setAttribute('src',photo);
            
            let presentTitle = document.createElement('div');
                presentTitle.setAttribute('class','present-title');
                presentTitle.textContent = name;
            
            let presentPlace = document.createElement('div');
                presentPlace.setAttribute('class','present-place');
                
            let presentCounty = document.createElement('div');
                presentCounty.setAttribute('class','presentCounty');
                presentCounty.textContent = Place +" | ";

            let presentText = document.createElement('div');
            presentText.setAttribute('class','present-text');
            presentText.textContent = ProduceOrg;
        
        
            presentMainContent.appendChild(presentCard);
            presentCard.appendChild(presentImg);
            presentCard.appendChild(presentTitle);
            presentCard.appendChild(presentPlace);
           
            presentImg.appendChild(presentPhoto);
            presentPlace.appendChild(presentCounty);
            presentPlace.appendChild(presentText);
            }
            renderCard();

       
    }
    //+++++++++++++++++++++++++++
    //      頁數判斷功能
    //+++++++++++++++++++++++++++

    //產品頁數
    let page = Math.ceil(len/perpage); 

    //產品頁數 掛的 html 標籤
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
    let nextpage
    let choseBtn
    
    //---------------更新按鈕列---------------
    
    //重新更新按鈕列表
    function updateBtnlist (){
        let Btnstr = "";
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
        Btnstr += '<div class="page-Btn" id="'+i+ '">'+i+'</div>';
        pageList.innerHTML = Btnstr;   
        };
        let text =document.getElementById(nextpage);
        text.classList.add('btn-active');

        
    };

    //更新點擊按鈕事件
    function clickbtn(){
        //重新定義監聽的按鈕
        let pageBtn =  document.querySelectorAll('.page-Btn');
        for(let i =0 ; i<pageBtn.length ; i++){
            pageBtn[i].addEventListener("click",function(){
                //重新定義點擊的按鈕數字
                nextpage = parseInt(pageBtn[i].innerHTML); 
                
                //改變按鈕 樣式
                changeBtnStyle();

                //重新 更換內容資料的函式
                renderPage();
            })
           
        }
    }; 

    //---------------觸發更換按鈕------------

    for(let i=0 ; i<pageBtn.length ; i++){

        pageBtn[i].addEventListener('click',changeBtnStyle);
        //更換按鈕樣式的函式
        function changeBtnStyle(){
            //1.先移除原有
            let removeClass = document.querySelector('.btn-active');
            //console.log(removeClass)
                removeClass.classList.remove('btn-active'); 
            //2.再加入指定的按鈕css屬性
            if( nextpage == undefined){
                choseBtn = pageBtn[i].id 
               // console.log(choseBtn)
            }
            else{
                choseBtn = nextpage
            }
           // console.log(choseBtn)
            let clickBtn = document.getElementById(choseBtn);
                clickBtn.classList.add("btn-active");

            //重新定義 nextpage 將內容定義為 undefined   
            nextpage = undefined;    
        }; 

        //更換內容資料的函式
        pageBtn[i].addEventListener('click',renderPage);
        function renderPage(){
        //console.log(choseBtn)
        //抓出每頁最大及最小的筆數編號  當前頁數 * 每頁需要的資料筆數
        let min =(choseBtn*perpage)- perpage +1;
        let max =(choseBtn*perpage);


        let newdata = [];
        if(searchdata!=""){
        pagedata = searchdata;
        }
        else{
        pagedata = data ;
        }
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
            id = data[p].ID;
            name = newdata[p].Name;
            photo = newdata[p].Column1;
            Place = newdata[p].SalePlace.substr(0,3);
            ProduceOrg = newdata[p].ProduceOrg;

            str += '<a href="presentPagination.html?id='+ id 
            +'" class="present-card"><div class="present-img"><img src="'+ photo 
            +'"></div><div class="present-title">'+ name 
            +'</div><div class="present-place"><div class="presentCounty">'+ Place
            +' | </div><div class="present-text">'+ ProduceOrg +'</div></div></a>';
       
        }          
        let presentMainContent = document.querySelector('.present-main-content');
            presentMainContent.innerHTML = str;
        }

 
    };
    
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
 
let searchBtn = document.querySelector(".searchBar-Btn");
let searchdata=[] ; 
searchBtn.addEventListener("click",function(){

//取得使用者選取的 地方區域
let searchBarArea = document.querySelector(".searchBar-Area").value;
//取得使用者選取的 縣市
let searchBarCounty = document.querySelector(".searchBar-County").value;

//將資料庫文字與判斷做修改
if(searchBarCounty=="臺北市"){
   searchBarCounty ="台北市" 
}
else if(searchBarCounty=="臺中市"){
    searchBarCounty ="台中市" 
}
else if(searchBarCounty=="臺南市"){
    searchBarCounty ="台南市" 
}
else if(searchBarCounty=="臺東縣"){
    searchBarCounty ="台東縣" 
}

//console.log(searchBarCounty)
//取得使用 者輸入的文字
let searchInput = document.querySelector(".searchBar-Input-text").value;

//清空資料 並重新放上資訊
presentMainContent = document.querySelector('.present-main-content');
presentMainContent.innerHTML="";
let status = true ;

//建立新陣列
 searchdata=[];    
//篩選相對應的資料 

    data.forEach(function(item,index){
    //如果選取對應的城市    
    //console.log(item.SalePlace.substr(0,3))
    if(searchBarCounty === item.SalePlace.substr(0,3)){       
        searchdata.push(item);
    }
    if(searchBarArea==="all" || searchBarCounty==="all"){
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
    let photo = searchdata[p].Column1; 
    let name = searchdata[p].Name;
    let Place = searchdata[p].SalePlace.substr(0,3);
    let id = searchdata[p].ID;
    let ProduceOrg = searchdata[p].ProduceOrg;

    str += '<a href="presentPagination.html?id='+ id 
        +'" class="present-card"><div class="present-img"><img src="'+ photo 
        +'"></div><div class="present-title">'+ name 
        +'</div><div class="present-place"><div class="presentCounty">'+ Place
        +' | </div><div class="present-text">'+ ProduceOrg +'</div></div></a>';
    let presentMainContent = document.querySelector('.present-main-content');
        presentMainContent.innerHTML = str;
    
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
}
search(); 