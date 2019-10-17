//最新消息 資料
ajax(
  "https://cors-anywhere.herokuapp.com/https://gis.taiwan.net.tw/XMLReleaseALL_public/activity_C_f.json",
  function(response) {
    newsRender(response)
  }
);

function newsRender(data) {
  let loading = document.querySelector(".loading");
  loading.style.display = "none";

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
    let min = max - 49;
    if (index < max && min < index) {
      newArr.push(item);
    }
  });

  //第一次算出頁面
  for (let i = 0; i < 6; i++) {
    //最新消息 資料
    let id = newArr[i].Id;
    let title = newArr[i].Name;
    let org = newArr[i].Org;
    let text = newArr[i].Description.slice(0, 50) + "...";
    let time = newArr[i].Start.slice(0, 10);
    let photo = newArr[i].Picture1;

    if (photo == "" || photo == undefined) {
      photo = "img/lossimg.jpg";
    }

    let newsMainCintent = document.querySelector(".news-main-content");
    let newsCard = document.createElement("a");
    newsCard.setAttribute("href", "newsPagination.html?id=" + id);
    newsCard.setAttribute("class", "news-card");

    let newsCardLeft = document.createElement("div");
    newsCardLeft.setAttribute("class", "news-card-left");

    let newsImg = document.createElement("div");
    newsImg.setAttribute("class", "news-img");
    let img = document.createElement("img");
    img.setAttribute("src", photo);

    let newsCardRight = document.createElement("div");
    newsCardRight.setAttribute("class", "news-card-right");

    let newsTitle = document.createElement("div");
    newsTitle.setAttribute("class", "news-title");
    newsTitle.textContent = title;

    let newsOrg = document.createElement("div");
    newsOrg.setAttribute("class", "news-org");
    newsOrg.textContent = org;

    let newsPlace = document.createElement("div");
    newsPlace.setAttribute("class", "news-place");

    let newsDate = document.createElement("div");
    newsDate.setAttribute("class", "news-date");
    newsDate.textContent = time;

    let newsText = document.createElement("div");
    newsText.setAttribute("class", "news-text");
    newsText.textContent = text;

    newsMainCintent.appendChild(newsCard);
    newsCard.appendChild(newsCardLeft);
    newsCard.appendChild(newsCardRight);

    newsCardLeft.appendChild(newsImg);
    newsImg.appendChild(img);

    newsCardRight.appendChild(newsTitle);
    newsCardRight.appendChild(newsOrg);
    newsCardRight.appendChild(newsPlace);
    newsPlace.appendChild(newsDate);

    newsCardRight.appendChild(newsText);
  }

  //+++++++++++++++++++++++++++
  //      頁數判斷功能
  //+++++++++++++++++++++++++++

  //產品頁數
  let len = newArr.length;
  let perpage = 6;
  let page = Math.ceil(len / perpage);

  //產品頁數 掛的 html 標籤
  let pageList = document.querySelector(".page-list");
  //第一次產出頁數按鈕
  for (let i = 0; i < 5; i++) {
    let pageBtn = document.createElement("div");
    pageBtn.setAttribute("class", "page-Btn");
    pageBtn.setAttribute("id", i + 1);
    pageBtn.textContent = i + 1;
    pageList.appendChild(pageBtn);
  }
  let activeBtn = document.getElementById("1");
  activeBtn.classList.add("btn-active");

  // 頁數按鈕 監聽事件
  let pageBtn = document.querySelectorAll(".page-Btn");
  let nextPage;
  let choseBtn;

  //---------------更新按鈕列---------------

  //重新更新按鈕列表
  function updateBtnlist() {
    let Btnstr = "";
    let max = nextPage + 3;
    let min = nextPage - 2;

    if (min < 0 || min == 0) {
      min = 1;
      max = 6;
    }
    if (max > page) {
      max = page + 1;
    }
    for (let i = min; max > i; i++) {
      Btnstr += '<div class="page-Btn" id="' + i + '">' + i + "</div>";
      pageList.innerHTML = Btnstr;
    }
    let text = document.getElementById(nextPage);
    text.classList.add("btn-active");
  }
  //更新點擊按鈕事件
  function clickbtn() {
    //重新定義監聽的按鈕
    let pageBtn = document.querySelectorAll(".page-Btn");
    for (let i = 0; i < pageBtn.length; i++) {
      pageBtn[i].addEventListener("click", function() {
        //重新定義點擊的按鈕數字
        nextPage = parseInt(pageBtn[i].innerHTML);
        //改變按鈕 樣式
        changeBtnStyle();
        //重新 更換內容資料的函式
        renderPage();
      });
    }
  };

  //---------------觸發更換按鈕------------

  for (let i = 0; i < pageBtn.length; i++) {
    pageBtn[i].addEventListener("click", changeBtnStyle);
    //更換按鈕樣式的函式
    function changeBtnStyle() {
      //1.先移除原有
      let removeClass = document.querySelector(".btn-active");
      removeClass.classList.remove("btn-active");
      //2.再加入指定的按鈕css屬性
      if (nextPage == undefined) {
        choseBtn = pageBtn[i].id;
      } else {
        choseBtn = nextPage;
      }
      let clickBtn = document.getElementById(choseBtn);
      clickBtn.classList.add("btn-active");

      //重新定義 nextPage 將內容定義為 undefined
      nextPage = undefined;
    }

    //更換內容資料的函式
    pageBtn[i].addEventListener("click", renderPage);
    function renderPage() {
      //抓出每頁最大及最小的筆數編號  當前頁數 * 每頁需要的資料筆數
      let min = choseBtn * perpage - perpage + 1;
      let max = choseBtn * perpage;

      let newdata = [];

      newArr.forEach(function(item, index) {
        //利用陣列索引 索引從0開始 所以要加1
        let num = index + 1;
        //當篩選 索引大於最小值 及 小於最大值時 將該筆資料放入陣列
        if (num >= min && num <= max) {
          newdata.push(item);
        }
      });

      //將新的頁數資料重新放上網頁
      let str = "";
      for (let p = 0; p < newdata.length; p++) {
        let id = newdata[p].Id;
        let title = newdata[p].Name;
        let org = newdata[p].Org;
        let text = newdata[p].Description.slice(0, 50) + "...";
        let time = newdata[p].Start.slice(0, 10);
        let photo = newdata[p].Picture1;

        if (photo == "" || photo == undefined) {
          photo = "img/lossimg.jpg";
        }

        str +=
          '<a href="newsPagination.html?id=' +
          id +
          '"class="news-card"><div class="news-card-left"><div class="news-img"><img src="' +
          photo +
          '"></div></div><div class="news-card-right"><div class="news-title">' +
          title +
          '</div><div class="news-org">' +
          org +
          '</div><div class="news-place"><div class="news-date">' +
          time +
          '</div></div><div class="news-text">' +
          text +
          "...</div></div></a>";
      }
      let presentMainContent = document.querySelector(".news-main-content");
      presentMainContent.innerHTML = str;
    }
  }

  //下一頁按鈕
  let addPageBtn = document.querySelector(".Add-page");
  addPageBtn.addEventListener("click", function() {
    if (choseBtn == undefined) {
      choseBtn = 1;
    }
    if (choseBtn == page) {
      let lestPageBox = document.querySelector(".lest-page-box");
      lestPageBox.classList.add("box-open");
      cover.style.display = "block";
      body.classList.add("fixed");

      return;
    }
    if (choseBtn == 1 && page == 1) {
      return;
    }
    nextPage = parseInt(choseBtn) + 1;

    //更改按鈕列表
    updateBtnlist();
    clickbtn();
    //更改按鈕樣式
    changeBtnStyle();
    //更改內容資料
    renderPage();
  });

  //上一頁按鈕
  let lessPageBtn = document.querySelector(".Less-page");
  lessPageBtn.addEventListener("click", function() {
    if (choseBtn == undefined) {
      choseBtn = 1;
    }
    if (choseBtn == 1) {
      return;
    }
    nextPage = parseInt(choseBtn) - 1;
    //更改按鈕列表
    updateBtnlist();
    clickbtn();
    //更改按鈕樣式
    changeBtnStyle();
    //更改內容資料
    renderPage();
  });
};
