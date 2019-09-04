//抓到網址的query string    
let Idstring = location.href;
//console.log(Idstring);
//將字串轉成url
let url = new URL(Idstring);
//console.log(url)
//找到id後方的字串
let UrlString = url.searchParams.get('id');
console.log(UrlString)
    
ajax("https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvAgriculturalProduce.aspx",function(response){
    presentpageRender(response)
});

function presentpageRender(data){

//畫出產品列表    
data.forEach(function(item,index){
if(item.ID==UrlString){
    let name = item.Name;
    let ProduceOrg = item.ProduceOrg;
    let Tel = item.ContactTel;
    let img = item.Column1;
    let feature = item.Feature;

    let presentPaginationContent =  document.querySelector('.presentPagination-content');
  
    let otherImg = document.createElement("img");
        otherImg.setAttribute("class","other-img");
        otherImg.setAttribute("src", img );

    let contentList = document.createElement("div");
        contentList.setAttribute("class","content-list");
        
        
    let contentTitle = document.createElement("div");
        contentTitle.setAttribute("class","content-title");
        contentTitle.textContent = name ;

    let contentProduceOrg = document.createElement("div");
        contentProduceOrg.setAttribute("class","content-produceOrg");
        contentProduceOrg.textContent = ProduceOrg;


    let contentTel = document.createElement("div");
        contentTel.setAttribute("class","content-tel");
        contentTel.textContent = "連絡電話 | "+ Tel;

    let contentFeature = document.createElement("div");
        contentFeature.setAttribute("class","content-feature");
        contentFeature.textContent = feature;

        presentPaginationContent.appendChild(otherImg);
        presentPaginationContent.appendChild(contentList);

        contentList.appendChild(contentTitle);
        contentList.appendChild(contentProduceOrg);
        contentList.appendChild(contentTel);
        contentList.appendChild(contentFeature);


       
    

}
}
);
}

