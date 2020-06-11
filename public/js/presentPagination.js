//抓到網址的query string
let idstring = location.href;
//將字串轉成url
let url = new URL(idstring);
//找到id後方的字串
let urlString = url.searchParams.get("id");

ajax(
  "https://cors-anywhere.herokuapp.com/https://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvAgriculturalProduce.aspx",
  function (response) {
    presentpageRender(response);
  }
);

function presentpageRender(data) {
  //抓出此產品的地點
  let placeText;
  //畫出產品列表
  data.forEach(function (item) {
    if (item.ID == urlString) {
      let name = item.Name;
      let produceOrg = item.ProduceOrg;
      let tel = item.ContactTel;
      let img = item.Column1;
      let feature = item.Feature;
      let salePlace = item.SalePlace.substr(0, 3);
      placeText = salePlace.substr(0, 3);

      let presentPaginationContent = document.querySelector(
        ".presentpagination-content"
      );

      let otherImg = document.createElement("img");
      otherImg.setAttribute("class", "other-img");
      otherImg.setAttribute("src", img);

      let contentList = document.createElement("div");
      contentList.setAttribute("class", "content-list");

      let contentTitle = document.createElement("div");
      contentTitle.setAttribute("class", "content-title");
      contentTitle.textContent = name;

      let contentPlace = document.createElement("div");
      contentPlace.setAttribute("class", "content-place");
      contentPlace.textContent = placeText;

      let contentProduceOrg = document.createElement("div");
      contentProduceOrg.setAttribute("class", "content-produceOrg");
      contentProduceOrg.textContent = produceOrg;

      let contentTel = document.createElement("div");
      contentTel.setAttribute("class", "content-tel");
      contentTel.textContent = "連絡電話 | " + tel;

      let contentFeature = document.createElement("div");
      contentFeature.setAttribute("class", "content-feature");
      contentFeature.textContent = feature;

      let newspageName = document.createElement("div");
      newspageName.setAttribute("class", "newspage-name");
      newspageName.textContent = name;

      //line share btn
      LineIt.loadButton();
      let newspagelineBtn = document.createElement("div");
      let lineBtnLink = window.location.href;
      newspagelineBtn.setAttribute("class", "line-it-button");
      newspagelineBtn.classList.add("btn-padding");
      newspagelineBtn.setAttribute("data-lang", "zh_Hant");
      newspagelineBtn.setAttribute("data-type", "share-a");
      newspagelineBtn.setAttribute("data-ver", "3");
      newspagelineBtn.setAttribute("data-url", `${lineBtnLink}`);
      newspagelineBtn.setAttribute("data-color", "default");
      newspagelineBtn.setAttribute("data-size", "small");
      newspagelineBtn.setAttribute("data-count", "false");
      newspagelineBtn.setAttribute("style", "display: none;");

      //fb share btn
      let newspagefbBtn = document.createElement("div");
      let fbBtnLink = window.location.href;
      newspagefbBtn.setAttribute("class", "fb-share-button");
      newspagefbBtn.classList.add("btn-padding");
      newspagefbBtn.setAttribute("data-href", fbBtnLink);
      newspagefbBtn.setAttribute("data-layout", "button");
      newspagefbBtn.setAttribute("data-size", "small");

      let sharebtnPosition = document.createElement("div");
      sharebtnPosition.setAttribute("class", "link-btn-position");
      sharebtnPosition.appendChild(newspagelineBtn);
      sharebtnPosition.appendChild(newspagefbBtn);

      presentPaginationContent.appendChild(otherImg);
      presentPaginationContent.appendChild(contentList);

      contentList.appendChild(contentTitle);
      contentList.appendChild(contentProduceOrg);
      contentList.appendChild(contentPlace);
      contentTitle.appendChild(sharebtnPosition);
      contentList.appendChild(contentTel);
      contentList.appendChild(contentFeature);

      //載入line 按鈕
      LineIt.loadButton();
    }
    if (item.ID == urlString && urlString == "126") {
      let presentPaginationContent = document.querySelector(
        ".presentpagination-content"
      );

      str =
        '<div class="presentpagination-content"><img class="other-img" src="' +
        item.Column1 +
        '"><div class="content-list"><div class="content-title">' +
        item.Name +
        '</div><div class="content-produceOrg">' +
        item.ProduceOrg +
        '</div><div class="content-place">' +
        item.SalePlace.substr(0, 3) +
        '</div><div class="content-tel">連絡電話 | ' +
        item.ContactTel +
        '</div><div class="content-feature">' +
        item.Feature +
        "</div></div></div>";

      presentPaginationContent.innerHTML = str;
    }

    let loading = document.querySelector(".loading");
    loading.style.display = "none";
  });

  //判斷產地若相同且不是相同的產品
  let newObj = [];
  data.forEach(function (item) {
    let salePlace = item.SalePlace.substr(0, 3);
    text = salePlace.substr(0, 3);
    if (text === placeText && urlString !== item.ID) {
      newObj.push(item);
    }
  });

  //打亂陣列中的物件排序
  newObj.sort(function () {
    return Math.random() - 0.5;
  });

  //抓出前10筆資訊
  newObj.forEach(function (item, index) {
    if (index < 10) {
      let presentRight = document.querySelector(".present-right");
      presentRight.style.display = "block";

      let presentOther = document.querySelector(".present-other");
      let otherPresent = document.createElement("a");
      otherPresent.setAttribute("class", "other-present");
      otherPresent.setAttribute("href", "presentPagination.html?id=" + item.ID);
      let otherImg = document.createElement("img");
      otherImg.setAttribute("class", "other-img");
      otherImg.setAttribute("src", item.Column1);
      let otherName = document.createElement("div");
      otherName.setAttribute("class", "other-name");
      otherName.textContent = item.Name;

      presentOther.appendChild(otherPresent);
      otherPresent.appendChild(otherImg);
      otherPresent.appendChild(otherName);
    }
  });
}

//右移的按鈕

//let screenWidth = window.screen.width;
let rightBtn = document.querySelector(".present-right-btn");
rightBtn.addEventListener("click", function () {
  let scroll = document.querySelector(".present-other");
  let screenWidth = window.screen.width;
  scroll.scrollLeft += 200;
  if (screenWidth < 376) {
    scroll.scrollLeft += 303;
  }
});

//左移的按鈕
let leftBtn = document.querySelector(".present-left-btn");
leftBtn.addEventListener("click", function () {
  let scroll = document.querySelector(".present-other");
  let screenWidth = window.screen.width;
  scroll.scrollLeft -= 200;
  if (screenWidth < 376) {
    scroll.scrollLeft -= 303;
  }
});
