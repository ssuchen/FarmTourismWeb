//特色小吃 資料
ajax("https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvTravelFood.aspx",function(response){
    foodRender(response)
});

function foodRender(data){
    // console.log(data)

     //所有食物的總數
     let len = data.length;
     let perpage = 12;
     let id 
     let name 
     let photo 
     let Address 
     let Text
     let place 
     //所有頁數
     let page = Math.ceil(len/perpage); 
     

     let foodMainContent = document.querySelector(".food-main-content");


     //載入第一筆資料
     for (let i = 0; i <12; i++) {
      
        id = data[i].ID
        name = data[i].Name
        photo = data[i].PicURL
        address = data[i].Address
        text = data[i].HostWords.substr(0,35)
        console.log(text)
        country = data[i].City
        town = data[i].Town
        tel = data[i].Tel

        let foodCard = document.createElement("a");
        foodCard.setAttribute("href","index.html?id="+ id);
            foodCard.setAttribute("class","food-card");
        let foodCardLeft = document.createElement("div");
            foodCardLeft.setAttribute("class","food-card-left");
        let foodCardRight = document.createElement("food-card-right");
            foodCardRight.setAttribute("class","food-card-right");
        let foodImg = document.createElement("div");
            foodImg.setAttribute("class","food-img");
        let Img = document.createElement("img");
            Img.setAttribute("src",photo);
        
        let foodTitle = document.createElement("div");
            foodTitle.setAttribute("class","food-title");
            foodTitle.textContent = name;

        let foodTel =document.createElement("div");
            foodTel.setAttribute("class","food-tel");
            foodTel.textContent = tel;

        let foodPlace = document.createElement("div");
            foodPlace.setAttribute("class","food-place");
            
        let foodCountry = document.createElement("div");
            foodCountry.setAttribute("class","food-country");
            foodCountry.textContent = country;

        let foodTown = document.createElement("div");
            foodTown.setAttribute("class","food-town");
            foodTown.textContent = town;

        let foodText = document.createElement("div");
            foodText.setAttribute("class","food-text");
            foodText.textContent = text +" ...";



        foodMainContent.appendChild(foodCard);
        foodCard.appendChild(foodCardLeft);
        foodCard.appendChild(foodCardRight);

        foodCardLeft.appendChild(foodImg);
        foodImg.appendChild(Img);
        
        foodCardRight.appendChild(foodTitle);
        foodCardRight.appendChild(foodTel);
        foodCardRight.appendChild(foodPlace);
        foodCardRight.appendChild(foodText);

        foodPlace.appendChild(foodCountry);
        foodPlace.appendChild(foodTown);


       
     }

    
}