//抓到網址的query string    
let Idstring = location.href;
//console.log(Idstring);
//將字串轉成url
let url = new URL(Idstring);
//console.log(url)
//找到id後方的字串
let UrlString = url.searchParams.get('id');
//console.log(UrlString)
    
ajax("https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvAttractions.aspx",function(response){
    travelpageRender(response)
});

function travelpageRender(data){
    let city
    let photo 
    let name

    data.forEach(function(item,index){  
        //渲染出id位置關資料  
        if(item.Name== "中崙漁業休閒農場" || item.Name == "淞濤田園休閒農場"  || item.Name =="梨之鄉休閒農業區" || item.Name =="清香休閒農場"||
        name=="春園休閒農場" ){
            // photo="https://ezgo.coa.gov.tw/Uploads/opendata/BuyItem/APPLY_D/20151026161106.jpg"
            item.Photo="https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
        }
       
        if(UrlString===item.ID){
 
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
        let maplink = document.createElement("iframe");
            maplink.setAttribute("width","100%");
            maplink.setAttribute("height","100%");
            maplink.setAttribute("frameborder","0");
            maplink.setAttribute("scrolling","no");
            maplink.setAttribute("marginheight","0");
            maplink.setAttribute("marginwidth","0");
            maplink.setAttribute("src","https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q="+ coordinate +"&z=16&output=embed&t=");
            //切換成空景模式
            //maplink.setAttribute("src","https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q="+ coordinate +"&z=16&output=embed&t=h");
            

            travelpageLeft.appendChild(travelpageImg);
            travelpageLeft.appendChild(travelpageContent);

            travelpageContent.appendChild(travelpageName);
            travelpageContent.appendChild(travelpagePlace);

            travelpagePlace.appendChild(travelpageCity);
            travelpagePlace.appendChild(travelpageTown);

            travelpageContent.appendChild(travelpageTel);
            travelpageContent.appendChild(travelpageText);

            travelpageMap.appendChild(maplink);



        }
        //console.log(item.ID)
        
        
               
    });
    //找出相關的位置的景點
    //創新陣列 將塞選的資料放入
    let newplace=[];
    data.forEach(function(item,index){
       if(city===item.City && UrlString !== item.ID){
        newplace.push(item);
       }
    });

    //隨機打亂 陣列中 物件順序
    newplace.sort(function(){
    return Math.random() - 0.5;
    });
    
    //抓出前面5筆資訊
    newplace.forEach(function(item,index){
        if(index<5){
        let travelpageOther = document.querySelector(".travelpage-other");
        let name =item.Name;
        let photo = item.Photo;
        let id = item.ID
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
    
    
}