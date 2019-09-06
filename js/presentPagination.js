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

//抓出此產品的地點    
let Placetext 
//畫出產品列表    
data.forEach(function(item,index){ 
if(item.ID==UrlString){
    let name = item.Name;
    let ProduceOrg = item.ProduceOrg;
    let Tel = item.ContactTel;
    let img = item.Column1;
    let feature = item.Feature;
    let Saleplace = item.SalePlace.substr(0,3);
        Placetext = Saleplace.substr(0,3);

    let presentPaginationContent =  document.querySelector('.presentPagination-content');
  
    let otherImg = document.createElement("img");
        otherImg.setAttribute("class","other-img");
        otherImg.setAttribute("src", img );

    let contentList = document.createElement("div");
        contentList.setAttribute("class","content-list");
        
        
    let contentTitle = document.createElement("div");
        contentTitle.setAttribute("class","content-title");
        contentTitle.textContent = name ;

    let contentPlace = document.createElement("div");
        contentPlace.setAttribute("class","content-place");
        contentPlace.textContent = Placetext;

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
        contentList.appendChild(contentPlace);
        contentList.appendChild(contentTel);
        contentList.appendChild(contentFeature);
}
}
);

//判斷產地若相同且不是相同的產品

let newobj = []
data.forEach(function(item,index){
    let Saleplace = item.SalePlace.substr(0,3);
        text = Saleplace.substr(0,3);
    if(text === Placetext && UrlString !== item.ID){
        newobj.push(item);
    }
})

//打亂陣列中的物件排序
newobj.sort(function(){
    return Math.random() - 0.5;
})

//抓出前10筆資訊
newobj.forEach(function(item,index){
    if(index<10){
       
        let presentOther = document.querySelector('.present-other');

        let otherPresent = document.createElement("a");
            otherPresent.setAttribute("class","other-present");
            otherPresent.setAttribute("href","presentPagination.html?id="+item.ID );
        let otherImg = document.createElement("img");
            otherImg.setAttribute("class","other-img");
            otherImg.setAttribute("src",item.Column1);
        let otherName = document.createElement("div");
            otherName.setAttribute("class","other-name");
            otherName.textContent = item.Name;

            presentOther.appendChild(otherPresent);
            //presentOther.appendChild(otherPresent);
            otherPresent.appendChild(otherImg);
            otherPresent.appendChild(otherName);

    }
})

}

//右移的按鈕
let RightBtn = document.querySelector(".present-right-btn");
    RightBtn.addEventListener("click",function(){
    let scroll = document.querySelector(".present-other")
        scroll.scrollLeft += 300 ; 
})

//左移的按鈕
let LeftBtn = document.querySelector(".present-left-btn");
    LeftBtn.addEventListener("click",function(){
        let scroll = document.querySelector(".present-other")
            scroll.scrollLeft -= 300 ; 
    })