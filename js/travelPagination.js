//抓到網址的query string    
let Idstring = location.href;
//console.log(Idstring);
//將字串轉成url
let url = new URL(Idstring);
//console.log(url)
//找到id後方的字串
let UrlString = url.searchParams.get('id');
console.log(UrlString)
    
ajax("https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvAttractions.aspx",function(response){
    travelpageRender(response)
});

function travelpageRender(data){
    data.forEach(function(item,index){
    
        //渲染出id位置關資料  
        if(UrlString===item.ID){

        let photo = item.Photo;
        let city = item.City;
        let name = item.Name;
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


            travelpageLeft.appendChild(travelpageImg);
            travelpageLeft.appendChild(travelpageContent);

            travelpageContent.appendChild(travelpageName);
            travelpageContent.appendChild(travelpagePlace);

            travelpagePlace.appendChild(travelpageCity);
            travelpagePlace.appendChild(travelpageTown);

            travelpageContent.appendChild(travelpageTel);
            travelpageContent.appendChild(travelpageText);


        }
    });
}