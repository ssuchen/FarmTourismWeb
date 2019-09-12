//最新消息 資料
ajax("https://cors-anywhere.herokuapp.com/https://gis.taiwan.net.tw/XMLReleaseALL_public/activity_C_f.json",function(response){
    newsRender(response)
});

function newsRender(data){
console.log(data.XML_Head.Infos.Info)

for (let i = 0; i <10; i++) {
    //最新消息 資料
    let id = data.XML_Head.Infos.Info[i].Id;  
    let title = data.XML_Head.Infos.Info[i].Name;
    let Org =  data.XML_Head.Infos.Info[i].Org;
    let text = data.XML_Head.Infos.Info[i].Description.slice(0,50)+"...";
    let time = data.XML_Head.Infos.Info[i].Start.slice(0,10);
    let photo = data.XML_Head.Infos.Info[i].Picture1;
    console.log(id)
    
    let newsMainCintent = document.querySelector(".news-main-content"); 

    let newscard = document.createElement("a");
    newscard.setAttribute("href","newsPagination.html?id="+id);
    newscard.setAttribute("class","news-card");

    let newsCardLeft = document.createElement("div");
    newsCardLeft.setAttribute("class","news-card-left");

    let newsImg = document.createElement("div");
    newsImg.setAttribute("class","news-img");
    let Img = document.createElement("img")
    Img.setAttribute("src",photo);

    let newsCardRight = document.createElement("div");
    newsCardRight.setAttribute("class","news-card-right");

    let newsTitle = document.createElement("div");
    newsTitle.setAttribute("class","news-title");
    newsTitle.textContent = title;

    let newsOrg = document.createElement("div");
    newsOrg.setAttribute("class","news-org");
    newsOrg.textContent = Org;
    
    let newsPlace = document.createElement("div");
    newsPlace.setAttribute("class","news-place");

    let newsDate = document.createElement("div");
    newsDate.setAttribute("class","news-date");
    newsDate.textContent = time;


    let newsText = document.createElement("div");
    newsText.setAttribute("class","news-text");
    newsText.textContent = text;

    newsMainCintent.appendChild(newscard);
    newscard.appendChild(newsCardLeft);
    newscard.appendChild(newsCardRight);

    newsCardLeft.appendChild(newsImg);
    newsImg.appendChild(Img);

    newsCardRight.appendChild(newsTitle);
    newsCardRight.appendChild(newsOrg);
    newsCardRight.appendChild(newsPlace);
    newsPlace.appendChild(newsDate);

    newsCardRight.appendChild(newsText);


}
}