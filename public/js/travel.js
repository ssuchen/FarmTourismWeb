//休閒農業區 資料
ajax(
  "https://cors-anywhere.herokuapp.com/https://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvAttractions.aspx",
  function (response) {
    travelRender(response);
  }
);

function travelRender(data) {
  console.log(data);
  let len = data.length;
  let perPage = 12;
  let travelMainContent;
  let photo;
  let name;
  let city;
  let town;

  for (let i = 0; i < 12; i++) {
    photo = data[i].Photo;
    name = data[i].Name;
    city = data[i].City;
    town = data[i].Town;

    let id = data[i].ID;

    function renderCard() {
      if (name == "梨之鄉休閒農業區") {
        photo =
          "https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80";
      } else {
        photo = photo;
      }

      travelMainContent = document.querySelector(".travel-main-content");

      let travelCard = document.createElement("a");
      travelCard.setAttribute("href", "travelPagination.html?id=" + id);
      travelCard.setAttribute("class", "travel-card");

      let travelImg = document.createElement("div");
      travelImg.setAttribute("class", "travel-img");
      let travelPhoto = document.createElement("img");
      travelPhoto.setAttribute("src", photo);

      let travellikeBtn = document.createElement("i");
      travellikeBtn.setAttribute(
        "class",
        "far fa-heart like-btn likebtnRemove"
      );
      travellikeBtn.setAttribute("data-tag", "travel");
      travellikeBtn.setAttribute("id", id);

      let travelTitle = document.createElement("div");
      travelTitle.setAttribute("class", "travel-title");
      travelTitle.textContent = name;

      let travelPlace = document.createElement("div");
      travelPlace.setAttribute("class", "travel-place");

      let travelCountry = document.createElement("div");
      travelCountry.setAttribute("class", "travel-country");
      travelCountry.textContent = city;

      let travelText = document.createElement("div");
      travelText.setAttribute("class", "travel-text");
      travelText.textContent = town;

      travelMainContent.appendChild(travelCard);
      travelCard.appendChild(travelImg);
      travelCard.appendChild(travelTitle);
      travelCard.appendChild(travelPlace);

      travelImg.appendChild(travelPhoto);
      travelImg.appendChild(travellikeBtn);
      travelPlace.appendChild(travelCountry);
      travelPlace.appendChild(travelText);
    }
    renderCard();

    let loading = document.querySelector(".loading");
    loading.style.display = "none";
  }

  //+++++++++++++++++++++++++++
  //      頁數判斷功能
  //+++++++++++++++++++++++++++

  //農場頁數
  let page = Math.ceil(len / perPage);

  //農場頁數 掛的 html 標籤
  let pageList = document.querySelector(".page-list");
  //第一次產出頁數按鈕
  for (let i = 0; i < 10; i++) {
    let pageBtn = document.createElement("div");
    pageBtn.setAttribute("class", "page-btn");
    pageBtn.setAttribute("id", i + 1);
    pageBtn.textContent = i + 1;
    pageList.appendChild(pageBtn);
  }
  let activeBtn = document.getElementById("1");
  activeBtn.classList.add("btn-active");

  // 頁數按鈕 監聽事件
  let pageBtn = document.querySelectorAll(".page-btn");
  let choseBtn;
  let nextPage;

  //---------------更新按鈕列---------------

  function updateBtnlist() {
    let btnStr = "";
    let max = nextPage + 5;
    let min = nextPage - 5;

    if (min < 0 || (min == 0 && page > 10)) {
      min = 1;
      max = 11;
    }
    if (max > page) {
      max = page + 1;
    }
    for (let i = min; max > i; i++) {
      btnStr += '<div class="page-btn" id="' + i + '">' + i + "</div>";
      pageList.innerHTML = btnStr;
    }
    let text = document.getElementById(nextPage);
    text.classList.add("btn-active");
  }

  function clickBtn() {
    //更新所點選的按鈕所對應的資料
    let pageBtn = document.querySelectorAll(".page-btn");
    for (let i = 0; i < pageBtn.length; i++) {
      pageBtn[i].addEventListener("click", function () {
        //重新定義點擊的按鈕數字
        nextPage = parseInt(pageBtn[i].innerHTML);
        //改變按鈕 樣式
        changeBtnStyle();
        //重新 更換內容資料的函式
        renderPage();
      });
    }
  }

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
    }

    //更換內容資料的函式
    pageBtn[i].addEventListener("click", renderPage);
    function renderPage() {
      //抓出每頁最大及最小的筆數編號  當前頁數 * 每頁需要的資料筆數
      let min = choseBtn * perPage - perPage + 1;
      let max = choseBtn * perPage;

      //建立新陣列
      let newData = [];
      let pageData;
      if (searchData != "") {
        pageData = searchData;
      } else {
        pageData = data;
      }
      pageData.forEach(function (item, index) {
        //利用陣列索引 索引從0開始 所以要加1
        let num = index + 1;
        //當篩選 索引大於最小值 及 小於最大值時 將該筆資料放入陣列
        if (num >= min && num <= max) {
          newData.push(item);
        }
      });

      //將新的頁數資料重新放上網頁
      let str = "";
      for (let p = 0; p < newData.length; p++) {
        let photo = newData[p].Photo;
        let name = newData[p].Name;
        let city = newData[p].City;
        let town = newData[p].Town;
        let id = newData[p].ID;

        if (
          name == "中崙漁業休閒農場" ||
          name == "淞濤田園休閒農場" ||
          name == "梨之鄉休閒農業區" ||
          name == "清香休閒農場" ||
          name == "春園休閒農場"
        ) {
          photo =
            "https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80";
        } else {
          photo = photo;
        }

        str +=
          '<a  href= " travelPagination.html?id=' +
          id +
          '"class="travel-card"><div class="travel-img"><img src=' +
          photo +
          '><i class="far fa-heart like-btn likebtnRemove" data-tag="travel" id = ' +
          id +
          '></i></div><div class="travel-title">' +
          name +
          '</div><div class="travel-place"><div class="travel-country">' +
          city +
          '</div> <div class="travel-text">' +
          town +
          "</div></div></a>";
      }

      let travelMainContent = document.querySelector(".travel-main-content");
      travelMainContent.innerHTML = str;

      //願望清單
      checkBtnStyle();
      checkBtn();
    }
  }

  //下一頁按鈕
  let addPageBtn = document.querySelector(".add-page");
  addPageBtn.addEventListener("click", function () {
    if (choseBtn == undefined) {
      choseBtn = 1;
    }
    if (choseBtn == page) {
      //alert('最後一頁了');

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
    clickBtn();
    //更改按鈕樣式
    changeBtnStyle();
    //更改內容資料
    renderPage();
  });

  //上一頁按鈕
  let lessPageBtn = document.querySelector(".less-page");
  lessPageBtn.addEventListener("click", function () {
    if (choseBtn == undefined) {
      choseBtn = 1;
    }
    if (choseBtn == 1) {
      return;
    }
    nextPage = parseInt(choseBtn) - 1;

    //更改按鈕列表
    updateBtnlist();
    clickBtn();
    //更改按鈕樣式
    changeBtnStyle();
    //更改內容資料
    renderPage();
  });

  //======================
  //      搜尋列 功能
  //======================
  let searchBtn = document.querySelector(".searchbar-btn");
  let searchData = [];
  searchBtn.addEventListener("click", function () {
    //取得使用者選取的 地方區域
    let searchBarArea = document.querySelector(".searchbar-area").value;
    //取得使用者選取的 縣市

    let searchBarCountry = document.querySelector(".searchbar-country").value;
    //取得使用 者輸入的文字
    let searchInput = document.querySelector(".searchbar-input-text").value;

    //清空資料 並重新放上資訊
    travelMainContent = document.querySelector(".travel-main-content");
    travelMainContent.innerHTML = "";
    let status = true;

    //建立新陣列
    searchData = [];
    //篩選相對應的資料

    data.forEach(function (item) {
      //如果選取對應的城市
      if (searchBarCountry === item.City) {
        searchData.push(item);
      }
      //如果搜尋列 輸入 鄉鎮或是縣市
      if (searchInput === item.City || searchInput === item.Town) {
        searchData.push(item);
      }
      if (searchBarArea === "all" || searchBarCountry === "all") {
        status = false; //如果沒有輸入的話
      }
    });
    //如果沒有得到輸入值
    if (status == false && searchInput == "") {
      //alert("請點選或輸入搜尋地");
      let searchBox = document.querySelector(".search-box");
      searchBox.classList.add("box-open");
      cover.style.display = "block";
      body.classList.add("fixed");
    }
    let searchBoxBtn = document.querySelector(".search-box-btn");
    searchBoxBtn.addEventListener("click", function () {
      location.reload();
    });

    //將新的頁數資料重新放上網頁
    let str = "";
    let btnlist = document.querySelector(".page-bar");
    let len = searchData.length;
    if (len === 0) {
      btnlist.style.display = "none";
    } else {
      btnlist.style.display = "flex";
    }
    if (len === 0) {
      str = "找不到相關資訊";
      let travelMainContentText = querySelector("div");
      travelMainContentText.setAttribute("class", "travel-main-content-text");
      travelMainContent.appendChild(travelMainContentText);
    }

    for (let p = 0; p < len; p++) {
      if (len > 12) {
        len = 12;
      }
      let photo = searchData[p].Photo;
      let name = searchData[p].Name;
      let city = searchData[p].City;
      let town = searchData[p].Town;
      let id = searchData[p].ID;

      if (
        name == "中崙漁業休閒農場" ||
        name == "淞濤田園休閒農場" ||
        name == "梨之鄉休閒農業區" ||
        name == "清香休閒農場" ||
        name == "春園休閒農場"
      ) {
        photo =
          "https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80";
      } else {
        photo = photo;
      }
      str +=
        '<a  href= " travelPagination.html?id=' +
        id +
        '"class="travel-card"><div class="travel-img"><img src=' +
        photo +
        '><i class="far fa-heart like-btn likebtnRemove" data-tag="travel" id = ' +
        id +
        '></i></div><div class="travel-title">' +
        name +
        '</div><div class="travel-place"><div class="travel-country">' +
        city +
        '</div> <div class="travel-text">' +
        town +
        "</div></div></a>";
      travelMainContent.innerHTML = str;

      //將搜尋列清空
      let inputClear = document.querySelector(".searchbar-input-text");
      inputClear.value = "";

      //願望清單
      checkBtnStyle();
      checkBtn();
    }

    //算出頁數按鈕總數
    let pageLen = Math.ceil(searchData.length / 12);

    //重新寫出按鈕
    nextPage = 1;
    page = pageLen;
    updateBtnlist();
    clickBtn();
  });

  //=========================================
  //  從 firebase得到願望清單 並改變愛心樣式
  //=========================================
  let btnNum;
  function checkBtnStyle() {
    let docID;
    let docIDArr = [];
    db.collection("user").onSnapshot(function (snapshop) {
      snapshop.docs.forEach(function (doc) {
        if (userEmail == doc.data().email) {
          docID = doc.id;
        }
      });
      let travelList = db
        .collection("user")
        .doc(docID)
        .collection("travellist");
      travelList.get().then(function (snapshop) {
        snapshop.docs.forEach(function (doc) {
          let clickId = doc.data().id;
          docIDArr.push(clickId);
        });
        let btn = document.querySelectorAll(".like-btn");
        for (let i = 0; i < btn.length; i++) {
          docIDArr.forEach(function (item) {
            if (btn[i].id == item) {
              btn[i].classList.add("fas");
            }
          });
        }
      });
    });
  }
  checkBtnStyle();

  //=========================================
  //  從 firebase得到願望清單 並監聽愛心樣式
  //=========================================
  function checkBtn() {
    let btn = document.querySelectorAll(".like-btn");
    for (let i = 0; i < btn.length; i++) {
      btn[i].addEventListener("click", function (e) {
        e.preventDefault();
        if (userEmail == undefined) {
          //alert("請登入會員");
          let pleaseLoginBox = document.querySelector(".please-login-box");
          pleaseLoginBox.classList.add("box-open");
          cover.style.display = "block";
          body.classList.add("fixed");
        }
        btnNum = btn[i].id;
        let docID;
        let clickID;
        let deleteID;
        db.collection("user").onSnapshot(function (snapshop) {
          snapshop.docs.forEach(function (doc) {
            if (userEmail == doc.data().email) {
              docID = doc.id;
            }
          });
          let travelList = db
            .collection("user")
            .doc(docID)
            .collection("travellist");
          travelList
            .where("id", "==", btnNum)
            .get()
            .then(function (snapshop) {
              snapshop.docs.forEach(function (doc) {
                if (doc.data().id != undefined) {
                  clickID = doc.data().id;
                  deleteID = doc.id;
                }
              });

              if (clickID === undefined) {
                btn[i].classList.add("fas");
                //將表單送入firebase
                likeBtnAdd();
                //檢查 firebase 的清單 重新放入樣式
                checkBtnStyle();
              } else {
                //將表單從firebase上移除
                btn[i].classList.remove("fas");
                let deleteDoc = db
                  .collection("user")
                  .doc(docID)
                  .collection("travellist")
                  .doc(deleteID);
                deleteDoc.delete();
                //檢查 firebase 的清單 重新放入樣式
                checkBtnStyle();
              }
            });
        });
      });
    }
  }
  checkBtn();

  //===================
  //將表單送到 firebase
  //===================
  function likeBtnAdd() {
    let btnID = btnNum;
    let country;
    let id;
    let img;
    let text;
    let title;

    for (let a = 0; a < data.length; a++) {
      if (data[a].ID == btnID) {
        country = data[a].City;
        id = data[a].ID;
        img = data[a].Photo;
        text = data[a].Town;
        title = data[a].Name;
      }
    }

    //將點取資訊放入firebase
    db.collection("user")
      .get()
      .then(function (snapshop) {
        let docID;
        snapshop.docs.forEach(function (doc) {
          //將符合email的資料放入陣列
          if (userEmail == doc.data().email) {
            docID = doc.id;
          }
        });
        let travelList = db
          .collection("user")
          .doc(docID)
          .collection("travellist");
        travelList.add({
          id: id,
          country: country,
          img: img,
          text: text,
          title: title,
        });
      });
  }
}

search();
