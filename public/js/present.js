
//特色伴手禮 資料
ajax("https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvAgriculturalProduce.aspx",function(response){
    presentRender(response)
});

function presentRender(data){

    //所有商品的總數
    let len = data.length;
    let perPage = 12;
    let id 
    let name 
    let photo 
    let place 
    let produceOrg
    let presentMainContent

    let loading = document.querySelector(".loading");
    loading.style.display="none";

    for( let i=0 ; i<12; i++){
        id = data[i].ID;
        name = data[i].Name;
        photo = data[i].Column1;
        place = data[i].SalePlace.substr(0,3);
        produceOrg = data[i].ProduceOrg;
        
        function renderCard(){
            presentMainContent = document.querySelector('.present-main-content');
            
            let presentCard = document.createElement('a');
            presentCard.setAttribute('href','presentPagination.html?id='+ id);
            presentCard.setAttribute('class','present-card');
        
            let presentImg = document.createElement('div');
            presentImg.setAttribute('class','present-img');
            let presentPhoto = document.createElement('img');
            presentPhoto.setAttribute('src',photo);

            let presentBtn = document.createElement("i");
            presentBtn.setAttribute("class","far fa-heart like-btn");
            presentBtn.setAttribute("id",id); 
            
            let presentTitle = document.createElement('div');
            presentTitle.setAttribute('class','present-title');
            presentTitle.textContent = name;
            
            let presentPlace = document.createElement('div');
            presentPlace.setAttribute('class','present-place');
                
            let presentCounty = document.createElement('div');
            presentCounty.setAttribute('class','present-country');
            presentCounty.textContent = place +" | ";

            let presentText = document.createElement('div');
            presentText.setAttribute('class','present-text');
            presentText.textContent = produceOrg;
        
        
            presentMainContent.appendChild(presentCard);
            presentCard.appendChild(presentImg);
            presentCard.appendChild(presentTitle);
            presentCard.appendChild(presentPlace);
           
            presentImg.appendChild(presentPhoto);
            presentImg.appendChild(presentBtn);
           
            presentPlace.appendChild(presentCounty);
            presentPlace.appendChild(presentText);

        };
        renderCard();   
    }
    //+++++++++++++++++++++++++++
    //      頁數判斷功能
    //+++++++++++++++++++++++++++

    //產品頁數
    let page = Math.ceil(len/perPage); 

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
        let max = nextpage+5;
        let min = nextpage-5;
        
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
            removeClass.classList.remove('btn-active'); 
            //2.再加入指定的按鈕css屬性
            if( nextpage == undefined){
                choseBtn = pageBtn[i].id; 
            }
            else{
                choseBtn = nextpage;
            }
            let clickBtn = document.getElementById(choseBtn);
            clickBtn.classList.add("btn-active");

            //重新定義 nextpage 將內容定義為 undefined   
            nextpage = undefined;    
        }; 

        //更換內容資料的函式
        pageBtn[i].addEventListener('click',renderPage);
        function renderPage(){
            //抓出每頁最大及最小的筆數編號  當前頁數 * 每頁需要的資料筆數
            let min =(choseBtn*perPage)- perPage +1;
            let max =(choseBtn*perPage);

            let newdata = []
            let pagedata
            if(searchdata!=""){
                pagedata = searchdata;
            }
            else{
                pagedata = data;
            }
            pagedata.forEach(function(item,index){
                //利用陣列索引 索引從0開始 所以要加1
                let num = index+1
                //當篩選 索引大於最小值 及 小於最大值時 將該筆資料放入陣列
                if(num>=min && num<=max ){
                    newdata.push(item);   
                }  
            });

            //將新的頁數資料重新放上網頁
            let str=""
            for(let p = 0 ; p<newdata.length ; p++){
                id = newdata[p].ID;
                name = newdata[p].Name;
                photo = newdata[p].Column1;
                place = newdata[p].SalePlace.substr(0,3);
                produceOrg = newdata[p].ProduceOrg;

                str += '<a href="presentPagination.html?id='+ id 
                +'" class="present-card"><div class="present-img"><img src="'+ photo 
                +'"><i class="far fa-heart like-btn" id= '+ id +
                '></i></div><div class="present-title">'+ name 
                +'</div><div class="present-place"><div class="present-country">'+ place
                +' | </div><div class="present-text">'+ produceOrg +'</div></div></a>';
       
            }          
            let presentMainContent = document.querySelector('.present-main-content');
            presentMainContent.innerHTML = str;
      
            //願望清單
            checkBtnStyle();
            checkBtn(); 


        }



 
    };
    
    //下一頁按鈕
    let addPageBtn = document.querySelector('.Add-page');
    addPageBtn.addEventListener("click",function(){
        if(choseBtn==undefined){
           choseBtn = 1;
        }
        if(choseBtn==page){

            let lestPageBox = document.querySelector(".lest-page-box");
            lestPageBox.classList.add('box-open');
            cover.style.display="block";
            body.classList.add("fixed");

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
    let lessPageBtn = document.querySelector('.Less-page');
    lessPageBtn.addEventListener("click",function(){
        if(choseBtn==undefined){
            choseBtn = 1;
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
        let searchBarCountry = document.querySelector(".searchBar-Country").value;

        //將資料庫文字與判斷做修改
        if(searchBarCountry=="臺北市"){
            searchBarCountry ="台北市";
        }
        else if(searchBarCountry=="臺中市"){
            searchBarCountry ="台中市"; 
        }
        else if(searchBarCountry=="臺南市"){
            searchBarCountry ="台南市"; 
        }
        else if(searchBarCountry=="臺東縣"){
            searchBarCountry ="台東縣"; 
        }

        //取得使用 者輸入的文字
        let searchInput = document.querySelector(".searchBar-Input-text").value;
        //console.log(searchInput)
        //清空資料 並重新放上資訊
        presentMainContent = document.querySelector('.present-main-content');
        presentMainContent.innerHTML="";
        let status = true;

        //建立新陣列
        searchdata=[];    
        //篩選相對應的資料 

        data.forEach(function(item,index){
        //如果選取對應的城市  
            if( searchInput === item.SalePlace.substr(0,3)){ 
                searchdata.push(item);
            }
            if(searchBarCountry === item.SalePlace.substr(0,3)){       
                searchdata.push(item);
            }

            if(searchBarArea==="all" || searchBarCountry==="all"){
                status=false;//如果沒有輸入的話
            }
        });

    
        //如果沒有得到輸入值
        if( status == false && searchInput==""){
 
            let searchBox = document.querySelector(".search-box");
            searchBox.classList.add('box-open');
            cover.style.display="block";
            body.classList.add("fixed");

        };

        let searchBoxBtn = document.querySelector(".search-box-btn");
        searchBoxBtn.addEventListener("click",function(){
            location.reload();
        })

        //將新的頁數資料重新放上網頁
        let str=""
        let len = searchdata.length
        for(let p = 0 ; p < len ; p++){  
            if(len>12){
                len=12;
            }
            let photo = searchdata[p].Column1; 
            let name = searchdata[p].Name;
            let place = searchdata[p].SalePlace.substr(0,3);
            let id = searchdata[p].ID;
            let produceOrg = searchdata[p].ProduceOrg;

            str += '<a href="presentPagination.html?id='+ id 
            +'" class="present-card"><div class="present-img"><img src="'+ photo 
            +'"><i class="far fa-heart like-btn" id= '+ id +
            '></i></div><div class="present-title">'+ name 
            +'</div><div class="present-place"><div class="present-country">'+ place
            +' | </div><div class="present-text">'+ produceOrg +'</div></div></a>';
            let presentMainContent = document.querySelector('.present-main-content');
            presentMainContent.innerHTML = str;
    
            //將搜尋列清空
            let InputClear = document.querySelector(".searchBar-Input-text");
            InputClear.value = "";

            //願望清單
            checkBtnStyle();
            checkBtn();    
   
        } 
     
        //算出頁數按鈕總數
        let pagelen = Math.ceil(searchdata.length/12);

        //重新寫出按鈕
        nextpage = 1
        page = pagelen    
        updateBtnlist();
        clickbtn();
    });



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
        let presentlist = db.collection("user").doc(docID).collection("presentlist"); 
            presentlist.get().then(function(snapshop){
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
                //alert("請登入會員")
                let pleaseLoginBox = document.querySelector(".please-login-box");
                pleaseLoginBox.classList.add('box-open');
                cover.style.display="block";
                body.classList.add("fixed");
                
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
                let presentlist = db.collection("user").doc(docID).collection("presentlist"); 
                presentlist.where("id","==",btnNum).get().then(function(snapshop){
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
                    let deleteDoc = db.collection("user").doc(docID).collection("presentlist").doc(deleteID)
                    deleteDoc.delete();
                    //檢查 firebase 的清單 重新放入樣式
                    checkBtnStyle();
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
              country = data[a].SalePlace.substr(0,3);
              id =data[a].ID;
              img = data[a].Column1;
              text = data[a].ProduceOrg;
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
        let presentlist = db.collection("user").doc(docID).collection("presentlist")
        presentlist.add({
        id:id,
        country:country,
        img:img,
        text:text,
        title:title,
        }); 
        });
        
    };
}
search(); 