//最新消息 資料
ajax(
  "https://cors-anywhere.herokuapp.com/https://gis.taiwan.net.tw/XMLReleaseALL_public/activity_C_f.json",
  function(response) {
    newRender(response);
  }
);

function newRender(data) {
  //抓出2019的資訊
  let arr = [];
  let list = data.XML_Head.Infos.Info;
  for (let a = 0; a < list.length; a++) {
    let year = data.XML_Head.Infos.Info[a].Start.slice(0, 4);
    if (year == "2019") {
      arr.push(data.XML_Head.Infos.Info[a]);
    }
  }

  //抓出最新50筆
  let newArr = [];
  arr.forEach(function(item, index) {
    let max = arr.length;
    let min = max - 6;
    if (index < max && min < index) {
      newArr.push(item);
    }
  });

  for (let i = 0; i < 5; i++) {
    //最新消息 資料
    let id = newArr[i].Id;
    let title = newArr[i].Name;
    let text = newArr[i].Description.slice(0, 50) + "...";
    let time = newArr[i].Start.slice(0, 10);

    //最新消息DOM元素
    let indexMainCrad = document.createElement("div");
    indexMainCrad.setAttribute("class", "index-main-crad");
    let indexMainCradHref = document.createElement("a");
    indexMainCradHref.setAttribute("href", "newsPagination.html?id=" + id);
    indexMainCradHref.setAttribute("class", "index-main-crad-href");
    let cardTitle = document.createElement("div");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.textContent = title;
    let cardText = document.createElement("a");

    cardText.setAttribute("class", "card-Text");
    cardText.textContent = text;
    let cardTime = document.createElement("p");
    cardTime.setAttribute("class", "card-time");
    cardTime.textContent = time;

    let indexMainRight = document.querySelector(".index-main-content");
    indexMainRight.appendChild(indexMainCrad);

    indexMainCrad.appendChild(indexMainCradHref);
    indexMainCradHref.appendChild(cardTitle);
    indexMainCradHref.appendChild(cardText);
    indexMainCradHref.appendChild(cardTime);
  }
}

//右移的按鈕
let RightBtn = document.querySelector(".index-play-right-btn");
RightBtn.addEventListener("click", function() {
  let scroll = document.querySelector(".index-play-img");
  scroll.scrollLeft += 383;
});

//左移的按鈕
let LeftBtn = document.querySelector(".index-play-left-btn");
LeftBtn.addEventListener("click", function() {
  let scroll = document.querySelector(".index-play-img");
  scroll.scrollLeft -= 383;
});
