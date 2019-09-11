ajax("https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/RuralTravelData.aspx",function(response){
    journeyRender(response)
});
function journeyRender(data){

    for(let i =0 ;i<12 ;i++){
        let journeyTag
        let len = data[i].length;
        let id = data[i].TravelSeq;
        let name = data[i].Title;
        let photo = data[i].PhotoUrl;
        let text = data[i].Contents.substr(0,38)+"...";
        let tag = data[i].TravelType;
        
        //將tag 字串分開成陣列
        let arr=[]
        for(t=0 ;t<tag.length;t++){
            let gettag = tag.substr(t*9,4);
            if(gettag!==""){
            arr.push(gettag)    
            }  
        };

        function renderCard(){

            let journeyMainContent = document.querySelector(".journey-main-content");
            let journeyCard = document.createElement("a");
                journeyCard.setAttribute("class","journey-card")
                journeyCard.setAttribute("href","journey.html"+id)
            let journeyImg = document.createElement("div");
                journeyImg.setAttribute("class","journey-img");
            let img = document.createElement("img");
                img.setAttribute("src",photo);
            let journeyTitle = document.createElement("div");
                journeyTitle.setAttribute("class","journey-title");
                journeyTitle.textContent = name;

            let journeyGroup = document.createElement("div");
                journeyGroup.setAttribute("class","journey-group");
                 

            let journeyText = document.createElement("div");
                journeyText.setAttribute("class","journey-text");
                journeyText.textContent = text ;
                
                journeyMainContent.appendChild(journeyCard);
                journeyCard.appendChild(journeyImg);
                journeyCard.appendChild(journeyTitle);
                journeyCard.appendChild(journeyGroup);

                journeyCard.appendChild(journeyText);            
                journeyImg.appendChild(img);
      

                //將 tag 放入 journey-group的迴圈
                arr.forEach(function(item,index){
                    journeyTag = document.createElement("div");
                    journeyTag.setAttribute("class","journey-tag");
                    tag = item;
                    journeyTag.textContent = tag;
                    journeyGroup.appendChild(journeyTag);
                });




        }
        renderCard();
    }




   




  }