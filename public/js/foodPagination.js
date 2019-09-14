//抓到網址的query string    
let Idstring = location.href;
//console.log(Idstring);
//將字串轉成url
let url = new URL(Idstring);
//console.log(url)
//找到id後方的字串
let UrlString = url.searchParams.get('id');
//console.log(UrlString)
    
ajax("https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvTravelFood.aspx",function(response){
    foodpageRender(response)
});

function foodpageRender(data){
    let city
    let photo 
    let name

    data.forEach(function(item,index){  
        //渲染出id位置關資料  
        if(UrlString===item.ID){
         
        console.log(item)
        city = item.City;
        console.log(city)    
        photo = item.PicURL;
        console.log(photo)
        name = item.Name;
        console.log(name)

        let tel = item.Tel;
        console.log(tel)
        let town = item.Town;
        console.log(town)
        let introduction = item.HostWords;
        console.log(introduction)
        let coordinate = item.Coordinate;
        let foodpageLeft = document.querySelector(".foodpage-left");
            
        let foodpageImg = document.createElement("img");
        foodpageImg.setAttribute('class','foodpage-img');
        foodpageImg.setAttribute('src',photo);

        let foodpageContent = document.createElement("div");
        foodpageContent.setAttribute('class','foodpage-content');
        let foodpageName = document.createElement("div");
        foodpageName.setAttribute("class","foodpage-name");
        foodpageName.textContent = name;
            
        let foodpagePlace = document.createElement("div");     
        foodpagePlace.setAttribute("class","foodpage-place");
            
        let foodpageCity = document.createElement('div');
        foodpageCity.setAttribute('class','foodpage-city');
        foodpageCity.textContent = city;
        let foodpageTown = document.createElement('div');
        foodpageTown.setAttribute("class","foodpage-town");
        foodpageTown.textContent = town;

        let foodpageTel = document.createElement('div');
        foodpageTel.setAttribute("class","foodpage-tel");
        foodpageTel.textContent = tel;          

        let foodpageText = document.createElement('div');
            foodpageText.setAttribute("class","foodpage-text");
            foodpageText.textContent = introduction;
            
            

            //建立google map 標籤
        let foodpageMap = document.querySelector(".foodpage-map");
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
            

            foodpageLeft.appendChild(foodpageImg);
            foodpageLeft.appendChild(foodpageContent);

            foodpageContent.appendChild(foodpageName);
            foodpageContent.appendChild(foodpagePlace);

            foodpagePlace.appendChild(foodpageCity);
            foodpagePlace.appendChild(foodpageTown);

            foodpageContent.appendChild(foodpageTel);
            foodpageContent.appendChild(foodpageText);

            foodpageMap.appendChild(maplink);



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
        let foodpageOther = document.querySelector(".foodpage-other");
        let name =item.Name;
        let photo = item.PicURL;
        let id = item.ID
        let otherSpace = document.createElement("a");
            otherSpace.setAttribute("class","other-space");
            otherSpace.setAttribute("href","foodPagination.html?id=" + id);
        let otherImg = document.createElement("img");
            otherImg.setAttribute("class","other-img");
            otherImg.setAttribute("src", photo);
        let otherName = document.createElement("div");
            otherName.setAttribute("class","other-name");
            otherName.textContent = name;

            foodpageOther.appendChild(otherSpace);
            otherSpace.appendChild(otherImg);
            otherSpace.appendChild(otherName);

        }
        
    })
    
    
}