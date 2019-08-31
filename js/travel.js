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

// if( 當前頁數 > page){
//     當前頁數 == page;
// }

//畫出 農場總頁數
for( let i=0 ; i<page ; i++){
    let pageList = document.querySelector('.page-list');
    let pageBtn = document.createElement('div');
        pageBtn.setAttribute('class','page-Btn');
        pageBtn.textContent = i+1;
        pageList.appendChild(pageBtn);
};

// 頁面按鈕監聽事件
let pageBtn =  document.querySelectorAll('.page-Btn');
for(let i=0 ; i< page+1 ; i++){
    pageBtn[i].addEventListener('click',function(){

         let pageNumber = parseInt(pageBtn[i].innerHTML);
        // if( pageNumber > page){
        //     pageNumber == page
        // };

        //抓出每頁最大及最小的筆數編號
        let min =(pageNumber*perpage)- perpage +1;
        let max =(pageNumber*perpage);

        //建立新陣列
        let newdata = [];
        data.forEach(function(item,index){
            let num = index+1
            if(num>=min && num<=max){
                newdata.push(item)    
            }  
        })
        
        //

        let str

        for(let p = 0 ; p<newdata.length ; p++){

        let photo = newdata[p].Photo; 
        let name = newdata[p].Name;
        let city = newdata[p].City;
        let town = newdata[p].Town;
        str+=name
    
        
        console.log(str)
        let travelMainContent = document.querySelector('.travel-main-content');
        travelMainContent.innerHTML = str
        }
       //'<div class="travel-card"><div class="travel-img"><img src=' + photo + 'alt=""></div><div class="travel-title">' + name +'</div><div class="travel-place"><div class="travel-county">'+ city +'</div> <div class="travel-text">' + town + '</div></div></div>'
        // function aa(newdata){
        //     console.log(newdata)
        // }
        //console.log(aa)
        //console.log(newdata)
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