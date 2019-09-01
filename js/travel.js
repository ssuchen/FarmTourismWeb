//休閒農業區 資料
ajax("https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvAttractions.aspx",function(response){
    farmRender(response)
});

function farmRender(data){
let len = data.length;
let perpage = 12
for( let i = 0 ; i<perpage; i++){
    let photo = data[i].Photo; 
    let name = data[i].Name;
    let city = data[i].City;
    let town = data[i].Town;

    let travelMainContent = document.querySelector('.travel-main-content');

    let travelCard = document.createElement('div');
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



    
}

//農場頁數
let page = Math.ceil(len/perpage);

//抓出當前頁數
//若是當前頁數 大於總頁數 則顯示 總頁數

//畫出 農場總頁數

//農場頁數 掛的 html 標籤
let pageList = document.querySelector('.page-list');
for( let i=0 ; i<5 ; i++){
    let pageBtn = document.createElement('div');
        pageBtn.setAttribute('class','page-Btn');
        pageBtn.textContent = i+1;
        pageList.appendChild(pageBtn);




    //增加頁數的按紐
    // let AddPageBtn = document.querySelector('.Add-page');
    // AddPageBtn.addEventListener('click',function(){
    // let pageNumber = parseInt(pageBtn.innerHTML)+5
    //     if(pageNumber>page){
    //         return
    //     }
    //     pageBtn.textContent = pageNumber;
    //     pageList.appendChild(pageBtn);       
    // });


    // //減少頁數的按紐
    // let LessPageBtn = document.querySelector('.Less-page');
    // LessPageBtn.addEventListener('click',function(){
    // let pageNumber = parseInt(pageBtn.innerHTML)-5
    //     if(pageNumber<1){
    //        return
    //     }
    //     pageBtn.textContent = pageNumber;
    //     pageList.appendChild(pageBtn);       
    // });
    

};







// 頁數按鈕 監聽事件
let pageBtn =  document.querySelectorAll('.page-Btn');
for(let i=0 ; i< page+1 ; i++){
    pageBtn[i].addEventListener('click',function(){

         let pageNumber = parseInt(pageBtn[i].innerHTML);

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

        str += '<div class="travel-card"><div class="travel-img"><img src=' + photo + '></div><div class="travel-title">' + name +'</div><div class="travel-place"><div class="travel-county">'+ city +'</div> <div class="travel-text">' + town + '</div></div></div>';
        let travelMainContent = document.querySelector('.travel-main-content');
        travelMainContent.innerHTML = str
        }

    })
}
    
}


//如果觸發增加按紐 頁碼數字會增加
    // let AddPageBtn = document.querySelector('.Add-page');
    //     AddPageBtn.addEventListener('click',function(){
    //     let pageNumber = parseInt(pageBtn.innerHTML)+10
    //         pageBtn.textContent = pageNumber;
    //         pageList.appendChild(pageBtn);
    //     // if(pageNumber === page )    
    //     })