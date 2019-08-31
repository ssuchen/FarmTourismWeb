//休閒農業區 資料
ajax("https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvAttractions.aspx",function(response){
    farmRender(response)
});

function farmRender(data){

let len = data.length;
console.log(len)



for( let i = 0 ; i<12; i++){
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
let page = Math.ceil(len/12);
console.log(page)

//畫出 農場總頁數
for( let i=0 ; i<page+1 ; i++){
   let pageList = document.querySelector('.page-list');
   let pageBtn = document.createElement('div');
   pageBtn.setAttribute('class','page-Btn');
   pageBtn.textContent = i;
   pageList.appendChild(pageBtn);
}


}