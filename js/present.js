//特色伴手禮 資料
ajax("https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvAgriculturalProduce.aspx",function(response){
    presentRender(response)
});

function presentRender(data){
    //console.log(data.length)
    let len = data.length;
    for( let i=0 ; i<12; i++){
        let id = data[i].ID;
        let name = data[i].Name;
        let photo = data[i].Column1;
        let Place = data[i].SalePlace.substring(0,3);
        //console.log(Place)
        let ProduceOrg = data[i].ProduceOrg;
        let presentMainContent
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
                //presentCounty.textContent = Place;

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
}
